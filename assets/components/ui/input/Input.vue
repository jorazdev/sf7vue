<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { computed } from 'vue'

type TInputProps = {
  label: string
  id: string
  type?: string
  errors?: any
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TInputProps>(), {
  label: '',
  id: '',
  type: 'text'
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const hasValue = computed(() => {
  return modelValue.value !== null && modelValue.value !== undefined && String(modelValue.value).trim() !== ''
})
</script>

<template>
  <div class="w-full relative mb-6">
    <div class="relative">
      <input 
        :type="type"
        :id="id"
        v-model="modelValue"
        data-slot="input"
        :class="cn(
          'peer w-full rounded-lg p-3 pt-4 pb-2 transition-all duration-200 outline-none',
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'border bg-transparent text-base shadow-xs min-w-0',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          // États normaux
          'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
          // États d'erreur
          errors && errors[id].length > 0 ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : '',
          // Mode sombre
          'dark:bg-input/30 dark:border-input',
          props.class,
        )"
        placeholder=""
      >
      <label 
        :for="id" 
        :class="cn(
          'absolute text-gray-500 transition-all duration-200 ease-in-out pointer-events-none',
          'peer-focus:left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-gray-100 peer-focus:px-1',
          // État avec valeur
          hasValue 
            ? 'left-3 top-0 -translate-y-1/2 text-xs text-blue-500 bg-gray-100 px-1' 
            : 'left-3 top-1/2 -translate-y-1/2 text-sm',
          // État d'erreur
          errors && errors[id].length > 0 && hasValue ? 'text-destructive' : '',
          errors && errors[id].length > 0 && !hasValue ? 'peer-focus:text-destructive' : ''
        )"
      >
        {{ label }}
      </label>
    </div>
    <p 
      class="text-destructive text-sm mt-1" 
      v-if="errors && errors[id]"
    >
      {{ errors[id][0] }}
    </p>
  </div>
</template>