<template>
    <div class="flex items-center justify-around bg-black/15 rounded-tl-2xl rounded-tb-2xl">
        <div class="flex flex-col items-center space-y-2">
            <img :src="Symfony" alt="">
            <h1>Symfony 7</h1>
        </div>
        <div class="absolute bottom-40">
            <div class="w-20 h-20 rounded-full overflow-hidden bg-black">
                <img :src="Tailwind" alt="" class="w-full h-full">
            </div>
            <h1 class="text-center text-sm mt-1">Tailwind 4</h1>
        </div>
        <div class="flex flex-col items-center space-y-2">
            <div class="w-56 h-56 rounded-full overflow-hidden">
                <img :src="Vue" alt="" class="w-full h-full">
            </div>
            <h1>VueJS 3</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import Symfony from '@images/sf.webp'
import Vue from '@images/Vue3.png'
import Tailwind from '@images/tailwind.svg'
</script>