<template>
    <transition name="slide">
        <div v-if="show" 
            class="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-5">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">{{ title }}</h2>
                <button @click="emit('close')" 
                        class="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <!-- Slot pour le contenu du formulaire -->
            <slot></slot>
        </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    show: boolean
}>();

const emit = defineEmits(['close'])

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}
</style>