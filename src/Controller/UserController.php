<?php

namespace App\Controller;

use App\Manager\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    public function __construct(private UserManager $userManager) {}

    #[Route('/api/user', name: 'app_user', methods: ['POST'])]
    public function index(): Response
    {
        return $this->userManager->userInfo();
    }
}
