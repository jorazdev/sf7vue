<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RootController extends AbstractController
{
	public function __construct(
		private readonly RequestStack $requestStack)
	{

	}

    #[Route('/{vueRouting}', name: 'vue_routing', requirements: ['vueRouting' => '^(?!api|_(profiler|wdt)).*'])]
	public function index(): Response
	{
        $request = $this->requestStack->getCurrentRequest();
		$host =$request ->getScheme().'://'.$request->getHost();

		return $this->render('base.html.twig',
			[
				'host' => $host
			]);
	}
}
