<?php

namespace App\Manager;

use App\Dto\SignupFormDto;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserManager extends BaseManager
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        RequestStack $request,
        Security $security,
        NormalizerInterface $normalizer,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct($entityManager, $request, $security, $normalizer, $serializer, $validator);
        $this->passwordHasher = $passwordHasher;
    }

    public function signup()
    {
        $result = $this->validateForm(SignupFormDto::class);
        if ($result['isError']) {
            return $this->failure($result['value']);
        }
        $user = new User();
        $user->setLastName($this->data->lastName);
        $user->setFirstName($this->data->firstName);
        $user->setEmail($this->data->email);
        $user->setPassword($this->passwordHasher->hashPassword($user, $this->data->password));
        $user->setRoles(['ROLE_USER']);
        $this->save($user);
        return $this->success($this->data);
    }
}
