<template>
    <FormAuthContainer 
        title="Symfony 7 & VueJS 3" 
        :subTitle="authStore.auth.componentSelected.title">
        <Input id="firstName" 
            label="First Name" 
            :errors="signupErrors" 
            v-model="signupForm.firstName"/>
        <Input id="lastName" 
            label="Last Name"
            :errors="signupErrors" 
            v-model="signupForm.lastName"/>
        <Input id="email" 
            type="email" 
            label="Email"
            :errors="signupErrors" 
            v-model="signupForm.email"/>
        <Input id="password" 
            type="password" 
            label="Password" 
            :errors="signupErrors" 
            v-model="signupForm.password" />
        <div class="space-y-2 w-full">
            <Button class="w-full cursor-pointer" 
                @click="onSignup">
                Sign up
            </Button>
            <Button variant="info" 
                class="w-full cursor-pointer" 
                @click="authStore.onSelectComponent('Sign in')">
                Sign in
            </Button>
        </div>
    </FormAuthContainer>
</template>

<script setup lang="ts">
import { Button } from '@components/ui/button'
import { Input } from '@/components/ui/input'
import FormAuthContainer from './FormAuthContainer.vue';
import useUser from '@/vue/composables/user';
import {useAuthStore} from '@app/pinia/auth.store'

const {signupForm, signupErrors, onSignup } = useUser()
const authStore = useAuthStore()

</script>