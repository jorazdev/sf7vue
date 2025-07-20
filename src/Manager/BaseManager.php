<?php

namespace App\Manager;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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

    protected SerializerInterface $serializer;

    protected ValidatorInterface $validator;
    public function __construct(
        EntityManagerInterface $em,
        RequestStack $request,
        Security $security,
        NormalizerInterface $normalizer,
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ) {
        $this->em = $em;
        $this->request = $request->getCurrentRequest() ?? throw new \LogicException('No current request available');
        $this->data = $this->getData();
        $this->dataArray = $this->request != null ? json_decode($this->request->getContent(), true) : null;
        $this->formData = $this->request->request->all();
        $this->files = $this->request->files->all();
        $this->security = $security;
        $this->normalizer = $normalizer;
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    private function getData()
    {
        return $this->request != null ? json_decode($this->request->getContent()) : null;
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
        $response = new JsonResponse(['code' => 200, 'success' => true, 'result' => $data], 200);
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

    private function deserialize(string $class)
    {
        try {
            return $this->serializer->deserialize(
                $this->request->getContent(),
                $class,
                'json'
            );
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Données invalides'], 400);
        }
    }

    public function validateForm(string $class)
    {
        $form = $this->deserialize($class);
        $errors = $this->validator->validate($form);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return [
                'isError' => true,
                'value' => $errorMessages
            ];
        } else {
            return [
                'isError' => false,
                'value' => $form
            ];
        }
    }
}
