<?php
/**
 * Copyright ©  All rights reserved.
 * See LICENSE for license details.
 */
declare(strict_types=1);

namespace Gr4vy\Payment\Model\Client;

class Embed extends Base
{
    /**
     * retrieve embed token for frotend checkout form
     *
     * @param string
     * @param string
     * @param string
     *
     * @return string
     */
    public function getEmbedToken($amount, $currency, $buyer_id)
    {
        try {
            $embed_params = array(
                "amount" => intval($amount*100), // amount must be integer , so we multiply float by 100 and cast type to integer
                "currency" => $currency,
                "buyer_id" => $buyer_id
            );
            $token = $this->getGr4vyConfig()->getEmbedToken($embed_params);
            $this->gr4vy_logger->logMixed($embed_params);
            $this->gr4vy_logger->logMixed($token->toString());
            return $token->toString();
        }
        catch (\Exception $e) {
            $this->gr4vy_logger->logException($e);
        }
    }
}