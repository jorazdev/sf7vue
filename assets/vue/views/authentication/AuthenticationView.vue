<template>
    <div class="w-full bg-white flex items-center justify-center">
        <div class="container min-h-screen relative 
            flex flex-col items-center justify-center bg-gray-50 p-10">
            <div class="relative w-full h-[800px] bg-gray-100 rounded-2xl shadow-md md:grid lg:grid-cols-2 overflow-hidden">
                <div class="flex items-center justify-around bg-black/15 rounded-tl-2xl rounded-tb-2xl">
                    <div class="flex flex-col items-center space-y-2">
                        <img :src="Symfony" alt="">
                        <h1>Symfony 7</h1>
                    </div>
                    <div class="absolute bottom-40">
                        <div class="w-20 h-20 rounded-full overflow-hidden bg-black">
                            <img :src="Tailwind" alt="" class="w-full h-full">
                        </div>
                        <h1 class="text-center text-sm mt-1">Tailwind 4</h1>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="w-56 h-56 rounded-full overflow-hidden">
                            <img :src="Vue" alt="" class="w-full h-full">
                        </div>
                        <h1>VueJS 3</h1>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center p-20">
                    <h1 class="mb-10 text-4xl font-bold">Symfony 7 & VueJS 3</h1>
                    <Input id="email" 
                        type="email" 
                        label="Email" 
                        v-model="signinForm.email" 
                        :errors="signinErrors"/>
                    <Input id="password" 
                        type="password" 
                        label="Password" 
                        v-model="signinForm.password" 
                        :errors="signinErrors"/>
                    <Button class="w-full" @click="onSignin">Sign in</Button>
                    <div class="w-full h-auto bg-green-200 break-words p-2" 
                        v-if="token">{{ token }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Symfony from '@images/sf.webp'
import Vue from '@images/Vue3.png'
import Tailwind from '@images/tailwind.svg'
import { Button } from '@components/ui/button'
import { Input } from '@/components/ui/input'
import useUser from '@/vue/composables/user'

const {token, signinForm, signinErrors, onSignin } = useUser()
</script>