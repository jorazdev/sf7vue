<template>
    <div class="w-3/4 p-5 flex flex-col items-center justify-center space-y-3">
        <h1 class="text-4xl font-bold">{{ title }}</h1>
        <h1 class="text-xl font-bold mb-10">{{ subTitle }}</h1>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
type TProps = {
    title: string
    subTitle: string
}
withDefaults(defineProps<TProps>(), {
    title: '',
    subTitle: ''
})
</script>

