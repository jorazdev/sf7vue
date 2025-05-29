<?php

namespace App\Manager;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;


abstract class BaseManager
{
    private EntityManagerInterface $em;

    public $request;

    public $data;

    public $dataArray;

    public array $formData;

    public array $files;

    public Security $security;

    protected NormalizerInterface $normalizer;

    public function __construct(
        EntityManagerInterface $em,
        RequestStack $request,
        Security $security,
        NormalizerInterface $normalizer
    ) {
        $this->em = $em;
        $this->request = $request->getCurrentRequest();
        $this->data = $this->request != null ? json_decode($this->request->getContent()) : null;
        $this->dataArray = $this->request != null ? json_decode($this->request->getContent(), true) : null;
        $this->formData = $this->request->request->all();
        $this->files = $this->request->files->all();
        $this->security = $security;
        $this->normalizer = $normalizer;
    }

    /**
     * Save the entity
     *
     * @param $entity
     */
    public function save(&$entity)
    {
        $this->em->persist($entity);
        $this->em->flush();
    }

    /**
     * remove the entity
     *
     * @param $entity
     */
    public function remove($entity)
    {
        $this->em->remove($entity);
        $this->em->flush();
    }

    protected function getUser()
    {
        return $this->security->getUser();
    }

    /**
     * return result to json
     *
     * @param $data
     * @return JsonResponse
     */
    public function success($data = null, ?string $key = null, ?string $headers = null)
    {
        $response = new JsonResponse(['code' => 200, 'success' => true, 'data' => $data], 200);
        if ($headers != null) {
            $response->headers->set($key, $headers);
        }
        //        return new JsonResponse(['code' => 200, 'success' => true, 'data' => $data], 200);
        return $response;
    }

    /**
     * return result to json
     *
     * @param $data
     * @return JsonResponse
     */
    public function failure($data = null)
    {
        return new JsonResponse(['code' => 200, 'success' => false, 'data' => $data], 200);
    }

    /**
     * return JSON error message
     *
     * @param $message
     * @return JsonResponse
     */
    public function error($message)
    {
        return new JsonResponse(['code' => 500, 'success' => false, 'message' => $message], 500);
    }

    /**
     * @param $message
     * @return JsonResponse
     */
    public function unauthorized($message)
    {
        return new JsonResponse(['code' => 401, 'success' => false, 'message' => $message], 401);
    }

    /**
     * @param $message
     * @return JsonResponse
     */
    public function badRequest($message)
    {
        return new JsonResponse(['code' => 400, 'success' => false, 'message' => $message], 400);
    }

    /**
     * @param $message
     * @return JsonResponse
     */
    public function notFound($message)
    {
        return new JsonResponse(['code' => 404, 'success' => false, 'message' => $message], 404);
    }

    public function normalize($object, $context)
    {
        return $this->normalizer->normalize($object, null, $context);
    }
}
