<template>
    <div class="bg-amber-100 w-full h-screen flex flex-col items-center justify-center">
        <h1 class="text-4xl text-gray-700 py-5"> Applications Lists</h1>
        <section class="bg-amber-300 w-1/2 h-[560px] rounded-2xl p-5 
            flex items-center gap-5 flex-wrap overflow-y-auto">
            <router-link v-for="(app, index) in apps" 
                :key="index"
                :to="app.link" 
                class="w-40 h-40 bg-amber-50/35 rounded-sm 
                    flex flex-col items-center justify-center
                shadow-lg text-gray-500 font-bold cursor-pointer">
                <span v-if="app.icon" 
                    class="material-symbols-outlined" 
                        style="font-size: 40px;">
                    {{ app.icon }}
                </span>
                <h1>{{ app.label }}</h1>
            </router-link>
        </section>
    </div>
</template>

<script setup lang="ts">
import useApps from '@/vue/composables/apps';


const { apps } = useApps()
</script>
