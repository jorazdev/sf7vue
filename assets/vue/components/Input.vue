<template>
    <div class="w-full relative mb-6">
        <div class="relative">
            <input 
                :type
                :id
                class="peer w-full border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="" 
                v-model="model">
            <label 
                :for="id" 
                :class="[
                    'absolute text-gray-500 transition-all duration-200 ease-in-out pointer-events-none',
                    'peer-focus:left-5 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-2',
                    hasValue ? 'left-3 top-0 -translate-y-1/2 text-sm text-blue-500 bg-white px-2' : 'left-5 top-1/2 -translate-y-1/2 peer-focus:left-5 peer-focus:top-0'
                ]">
                {{ label }}
            </label>
        </div>
        <p class="text-red-500 text-sm mt-1" v-if="errors && errors[id]">{{ errors[id][0] }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TInput = {
    label: string
    id: string
    type: string
    errors?: any
}

withDefaults(defineProps<TInput>(), {
    label: '',
    id: '',
    type: 'text'
})

const model = defineModel()

const hasValue = computed(() => {
    return model.value !== null && model.value !== undefined && String(model.value).trim() !== ''
})
</script>