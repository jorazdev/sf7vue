<template>
    <div class="w-full bg-white flex items-center justify-center">
        <div class="container min-h-screen relative 
            flex flex-col items-center justify-center bg-gray-50 p-10">
            <div class="relative w-full h-[800px] bg-gray-100 rounded-2xl 
                shadow-md md:grid lg:grid-cols-2 overflow-hidden">
               <ImageAuth/>
                <div v-if="authStore.auth.componentSelected" 
                    class="flex flex-col items-center justify-center">
                    <component :is="authStore.auth.componentSelected.component"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {useAuthStore} from '@app/pinia/auth.store'
import ImageAuth from './components/ImageAuth.vue'

const authStore = useAuthStore()

onMounted(() => {
    authStore.auth.componentSelected = authStore.auth.components[0]
})

</script>