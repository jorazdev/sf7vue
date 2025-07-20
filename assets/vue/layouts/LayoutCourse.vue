<template>
    <div class="bg-slate-100 h-screen w-full">
        <nav class="bg-sky-50 py-2 px-5 flex items-center justify-between">
            <h1 class="text-2xl">Course Full Stack</h1>
            <div>
                <button @click="onLogout" class="cursor-pointer">
                    <span class="material-symbols-outlined">
                        exit_to_app
                    </span>
                </button>
            </div>
        </nav>
        <section class="bg-sky-700 flex px-5 items-center justify-between">
            <ul class="flex items-center">
                <li v-for="(course, k) in courses"
                    :key="k" 
                    :class="[course.id == courseSelected ? 'bg-lime-300 text-gray-600' : 'text-white']" 
                    class="py-2 px-5 hover:bg-lime-300 hover:text-gray-600 cursor-pointer" 
                    @click="onSelected(course)">
                    <div class="flex items-center justify-between gap-2">
                        <h1>{{ course.title }}</h1>
                        <button @click.stop="onActionCourse(course)" 
                            class="cursor-pointer">
                            <span class="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                </li>
            </ul>
            
            <button @click="onActionCourse(null)"
                class="bg-lime-300 text-gray-600 rounded-full size-7 flex items-center justify-center
                hover:bg-lime-300 hover:text-gray-600 cursor-pointer">
                <span class="material-symbols-outlined">
                    add
                </span>
            </button>
        </section>
        <!-- Popup with slide animation -->
        <SlideRight 
            title="Add course"
            :show="showPopup" 
            @close="showPopup = false">
            <CourseForm :courseForm="courseForm"
                :action
                @onCourse="onSave" 
                @onDelete="onDelete"/>
        </SlideRight>
        <ContentApp/>
    </div>
</template>

<script setup lang="ts">
import useUser from "@app/composables/user";
import useCoure from "@app/composables/course";
import ContentApp from "../layouts/ContentApp.vue"
import SlideRight from "@app/components/SlideRight.vue";
import CourseForm from "@app/views/course/home/Components/CourseForm.vue";
import { onMounted } from "vue";

const { onLogout } = useUser()
let { showPopup, action, courses, courseSelected, courseForm, 
    onSelected, onSave, onDelete, onActionCourse, onAll } = useCoure()

onMounted(() => {
    onAll()
})
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