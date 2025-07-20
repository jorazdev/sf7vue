<template>
    <form @submit.prevent="emit('onCourse')">
        <div class="mb-4">
            <Input id="course" 
                label="Course Name"
                v-model="courseForm.title"/>
        </div>
        <div class="flex justify-end gap-2">
            <button type="submit"
                    class="bg-lime-300 hover:bg-lime-400 text-gray-600 font-bold py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline cursor-pointer">
                {{ action }}
            </button>
            <button type="button"
                    v-if="action != 'Add'"
                    @click="emit('onDelete')"
                    class="bg-red-300 hover:bg-red-400 text-gray-600 font-bold py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline cursor-pointer">
                Remove
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { TCourse } from '@/vue/types/course.type';
import { Input } from '@/components/ui/input'

type props = {
    courseForm: TCourse
    action: string
}

defineProps<props>()
const emit = defineEmits(['onCourse','onDelete'])
</script>

