<?php
/**
 * Copyright ©  All rights reserved.
 * See LICENSE for license details.
 */
declare(strict_types=1);

namespace Gr4vy\Payment\Model\Data;

use Gr4vy\Payment\Api\Data\BuyerInterface;

class Buyer extends \Magento\Framework\Api\AbstractExtensibleObject implements BuyerInterface
{

    /**
     * Get buyer_id
     * @return string|null
     */
    public function getBuyerId()
    {
        return $this->_get(self::BUYER_ID);
    }

    /**
     * Set buyer_id
     * @param string $buyerId
     * @return \Gr4vy\Payment\Api\Data\BuyerInterface
     */
    public function setBuyerId($buyerId)
    {
        return $this->setData(self::BUYER_ID, $buyerId);
    }

    /**
     * Get external_identifier
     * @return string|null
     */
    public function getExternalIdentifier()
    {
        return $this->_get(self::EXTERNAL_IDENTIFIER);
    }

    /**
     * Set external_identifier
     * @param string $external_identifier
     * @return \Gr4vy\Payment\Api\Data\BuyerInterface
     */
    public function setExternalIdentifier($external_identifier)
    {
        return $this->setData(self::EXTERNAL_IDENTIFIER, $external_identifier);
    }

    /**
     * Retrieve existing extension attributes object or create a new one.
     * @return \Gr4vy\Payment\Api\Data\BuyerExtensionInterface|null
     */
    public function getExtensionAttributes()
    {
        return $this->_getExtensionAttributes();
    }

    /**
     * Set an extension attributes object.
     * @param \Gr4vy\Payment\Api\Data\BuyerExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Gr4vy\Payment\Api\Data\BuyerExtensionInterface $extensionAttributes
    ) {
        return $this->_setExtensionAttributes($extensionAttributes);
    }
}
