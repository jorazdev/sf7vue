<script setup lang="ts">
// Ajoutez au moins une importation ou une déclaration
import { ref } from 'vue'

const message = ref('Hello World')

console.log(message.value)
</script>

<template>
 <router-view />
</template>

