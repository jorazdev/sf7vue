<template>
    <Mail :accounts="accounts" :mails="mails" :nav-collapsed-size="4"/>
</template>

<script setup lang="ts">
import Mail from '@/vue/components/mail/Mail.vue';
import { refDebounced } from '@vueuse/core'
import { ref, watch } from 'vue';
import {accounts, mails } from '@app/data/mail'


const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

watch(debouncedSearch, deb => {
    console.log(deb)
})


</script>