<?php

namespace App\Manager;

use App\Entity\Course;
use App\Repository\CourseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CourseManager extends BaseManager
{

    public function __construct(
        EntityManagerInterface $entityManager,
        RequestStack $request,
        Security $security,
        NormalizerInterface $normalizer,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        private readonly CourseRepository $courseRepository
    ) {
        parent::__construct($entityManager, $request, $security, $normalizer, $serializer, $validator);
    }

    public function update()
    {
        if ($this->data->id == 0) {
            $course = new Course();
        } else {
            $course = $this->courseRepository->find($this->data->id);
        }

        $course->setTitle($this->data->title);
        $this->save($course);

        return $this->success(['update' => $this->normalize($course, ['groups' => ['show_course']])]);
    }

    public function all()
    {
        $courses = $this->courseRepository->findAll();
        return $this->success(['courses' => $this->normalize($courses, ['groups' => ['show_course']])]);
    }
}
