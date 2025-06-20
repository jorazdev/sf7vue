<template>
    <div class="border-gray-300 border-[1px] min-h-[600px] flex flex-col">
        <div class="h-16 border-b-[1px] border-gray-300">
            <slot name="header"></slot>
        </div>
        <div class="flex-1 ">
           <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

