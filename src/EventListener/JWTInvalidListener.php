<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class JWTInvalidListener
{
    public function onJWTInvalid(JWTInvalidEvent $event): void
    {
        $response = new JsonResponse([
            'code' => 401,
            'message' => 'Token JWT invalide.'
        ], 401);

        $event->setResponse($response);
    }

    public function onJWTNotFound(JWTNotFoundEvent $event): void
    {
        $response = new JsonResponse([
            'code' => 401,
            'message' => 'Token JWT manquant.'
        ], 401);

        $event->setResponse($response);
    }

    public function onJWTExpired(JWTExpiredEvent $event): void
    {
        $response = new JsonResponse([
            'code' => 401,
            'message' => 'Token JWT expiré.'
        ], 401);

        $event->setResponse($response);
    }
}
