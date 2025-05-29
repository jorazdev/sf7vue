<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

class CustomAuthenticationFailureHandler implements AuthenticationFailureHandlerInterface
{
    private EventDispatcherInterface $dispatcher;

    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse
    {
        $event = new AuthenticationFailureEvent(
            $exception,
            new JWTAuthenticationFailureResponse('Authentication Failed')
        );

        $this->dispatcher->dispatch($event, Events::AUTHENTICATION_FAILURE);

        // Message personnalisé
        $customMessage = match ($exception->getMessageKey()) {
            'Invalid credentials.' => 'Identifiants invalides. Veuillez vérifier votre email et mot de passe.',
            'Username could not be found.' => 'Utilisateur non trouvé.',
            default => 'Erreur d\'authentification.'
        };

        return new JsonResponse([
            'code' => 401,
            'message' => $customMessage
        ], 401);
    }
}
