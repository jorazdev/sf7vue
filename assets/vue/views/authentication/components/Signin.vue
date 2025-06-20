<template>
    <FormAuthContainer 
        title="Symfony 7 & VueJS 3" 
        :subTitle="authStore.auth.componentSelected.title">
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
        <div class="space-y-2 w-full">
            <Button class="w-full cursor-pointer" 
                @click="onSignin">Sign in</Button>
            <Button variant="info" class="w-full cursor-pointer" 
                @click="authStore.onSelectComponent('Sign up')">Sign up</Button>
        </div>
    </FormAuthContainer>
</template>

<script setup lang="ts">
import useUser from '@/vue/composables/user';
import { Button } from '@components/ui/button'
import { Input } from '@/components/ui/input'
import FormAuthContainer from './FormAuthContainer.vue';
import {useAuthStore} from '@app/pinia/auth.store'

const {signinForm, signinErrors, onSignin } = useUser()
const authStore = useAuthStore()

</script>

