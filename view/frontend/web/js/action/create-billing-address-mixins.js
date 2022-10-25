/* eslint-disable */
define([
  'mage/utils/wrapper',
  'mage/storage',
  'Magento_Checkout/js/model/payment/renderer-list',
  'Magento_Checkout/js/model/quote',
  'Gr4vy_Magento/js/model/config',
  'jquery'
], function (wrapper, storage, renderer, quote, config, $) {
  'use strict';

  var last_shipping_country_id = '';
  var last_billing_country_id = '';
  var last_shipping_company = '';
  var last_billing_company = '';

  return function (overriddenFunction) {
    return wrapper.wrap(overriddenFunction, function (originalAction, addressData) {
      var originalResult = originalAction(addressData);

      if (typeof originalResult === 'object') {
        if (quote.billingAddress() !== null) {
          originalResult['countryId'] = quote.billingAddress().countryId;
          originalResult['company'] = quote.billingAddress().company;
        }
      }

      var recalculate_params = false;
      var ajax_params = {};

      if (quote.isVirtual() && originalResult !== undefined && 'countryId' in originalResult) {
        ajax_params = {
          billing_country_id: originalResult['countryId'],
          billing_company: originalResult['company']
        };

        if (last_billing_country_id !== ajax_params['billing_country_id']) {
          recalculate_params = true;
        }
        if (last_billing_company !== ajax_params['billing_company']) {
          recalculate_params = true;
        }

        last_billing_company = ajax_params['billing_company'];
        last_billing_country_id = ajax_params['billing_country_id'];
      } else {
        if (quote.shippingAddress() === null) {
          return originalResult;
        }

        ajax_params = {
          shipping_country_id: quote.shippingAddress().countryId,
          shipping_company: quote.shippingAddress().company
        };

        if (last_shipping_country_id !== ajax_params['shipping_country_id']) {
          recalculate_params = true;
        }
        if (last_shipping_company !== ajax_params['shipping_company']) {
          recalculate_params = true;
        }

        last_shipping_company = ajax_params['shipping_company'];
        last_shipping_country_id = ajax_params['shipping_country_id'];
      }

      if (recalculate_params) {
        storage.post(config.reloadConfigUrl, JSON.stringify(ajax_params), false, 'application/json')
          .done(function (result) {
            var removeEntries = [];

            // Removing Gr4vy
            renderer.each(function (value, index) {
              if (value.type.startsWith('gr4vy')) {
                removeEntries.push(value);
              }
            });

            $.each(removeEntries, function (index, entry) {
              renderer.remove(entry);
            })

            // Adding new Gr4vy Payment
            $.each(result['payment'], function (index, entry) {
              if (index.startsWith('gr4vy')) {
                window.checkoutConfig.payment.gr4vy = entry;
                config.token(entry.token);
                config.amount(entry.total_amount);
                config.cartItems(entry.items);
                config.intent(entry.intent);

                renderer.push({
                  type: index,
                  component: 'Gr4vy_Magento/js/view/payment/method-renderer/gr4vy-method'
                });
              }
            });
          });
      }

      return originalResult;
    });
  };
});
