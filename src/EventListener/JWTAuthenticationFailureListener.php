<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class JWTAuthenticationFailureListener
{
    public function onAuthenticationFailure(AuthenticationFailureEvent $event): void
    {
        $exception = $event->getException();

        $customMessage = match ($exception->getMessageKey()) {
            'Invalid credentials.' => 'Identifiants invalides. Veuillez vérifier votre email et mot de passe.',
            'Username could not be found.' => 'Utilisateur non trouvé.',
            default => 'Erreur d\'authentification.'
        };

        $response = new JsonResponse([
            'code' => 401,
            'message' => $customMessage
        ], 401);

        $event->setResponse($response);
    }
}
