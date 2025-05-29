<?php

namespace App\Manager;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class UserManager extends BaseManager
{
    public function __construct(
        EntityManagerInterface $entityManager,
        RequestStack $request,
        Security $security,
        NormalizerInterface $normalizer
    ) {
        parent::__construct($entityManager, $request, $security, $normalizer);
    }
    public function userInfo()
    {
        return $this->success(['message' => [
            'firstName' => $this->data->firstName,
            'lastName' => $this->data->lastName
        ]]);
    }
}
