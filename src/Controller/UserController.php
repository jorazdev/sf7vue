<?php

namespace App\Controller;

use App\Manager\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    public function __construct(private UserManager $userManager) {}

    #[Route('/api/user/signup', name: 'user_signup', methods: ['POST'])]
    public function signup(): Response
    {
        return $this->userManager->signup();
    }
}
