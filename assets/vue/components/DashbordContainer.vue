<template>
    <div class="flex flex-col items-center justify-center h-screen p-20">
        <div class="bg-slate-200/35 rounded-2xl w-full h-full">
            <div class="flex justify-between items-center bg-amber-100 rounded-tl-2xl rounded-tr-2xl p-5">
                <ul class="flex gap-2">
                    <li v-for="item in dashboards" 
                        :key="item.name" 
                        class="p-2 cursor-pointer transition-all duration-150 delay-150" 
                        :class="dashboard == item ? 'font-bold border-b-4 border-amber-600': ''" 
                        @click="onDashboard(item)">
                        {{ item.label }}
                    </li>
                </ul>
                <button class="p-2 cursor-pointer" 
                    @click="onLogout">
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                </button>
            </div>
            <main class="p-5">
                <ContentApp/>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import useUser from "@/vue/composables/user"
import useDashboard from "@/vue/composables/dashboard"
import ContentApp from "../layouts/ContentApp.vue"

const { onLogout } = useUser()
const { dashboards, dashboard, onDashboard } = useDashboard()  


</script>