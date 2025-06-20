<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

final class SignupFormDto
{
    #[Assert\NotBlank(message: "Le nom est requis.")]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: "Le nom doit contenir au moins {{ limit }} caractères.",
        maxMessage: "Le nom ne peut pas dépasser {{ limit }} caractères."
    )]
    public string $lastName;

    #[Assert\NotBlank(message: "Le prénom est requis.")]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: "Le prénom doit contenir au moins {{ limit }} caractères.",
        maxMessage: "Le prénom ne peut pas dépasser {{ limit }} caractères."
    )]
    public string $firstName;

    #[Assert\NotBlank(message: "L'email est requis.")]
    #[Assert\Email(message: "L'email n'est pas valide.")]
    public string $email;

    #[Assert\NotBlank(message: "Le mot de passe est requis.")]
    #[Assert\Length(
        min: 8,
        minMessage: "Le mot de passe doit contenir au moins {{ limit }} caractères."
    )]
    public string $password;
}
