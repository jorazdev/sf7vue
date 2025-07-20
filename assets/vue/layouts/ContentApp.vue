<template>
    <main>
        <router-view v-slot="{ Component }">
            <transition>
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<script setup>

</script>
