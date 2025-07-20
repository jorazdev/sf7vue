<?php

namespace App\Controller;

use App\Manager\CourseManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CourseController extends AbstractController
{
    public function __construct(private CourseManager $courseManager) {}

    #[Route('/api/course/update', name: 'app_course_update', methods: ['POST'])]
    public function update(): Response
    {
        return $this->courseManager->update();
    }

    #[Route('/api/course/all', name: 'app_course_all', methods: ['GET'])]
    public function all(): Response
    {
        return $this->courseManager->all();
    }
}
