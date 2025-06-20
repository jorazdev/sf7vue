import { defineStore } from "pinia";
import { reactive } from "vue";
import Signin from "@app/views/authentication/components/Signin.vue";
import Signup from "@app/views/authentication/components/Signup.vue";
import { TAuth } from "@app/types/auth.type";

export const useAuthStore = defineStore('auth', () => {
    const auth = reactive<TAuth>({
        componentSelected: null,
        components: [
            { title: "Sign in", component: Signin},
            { title: "Sign up", component: Signup}
        ]
    })

    const onSelectComponent = (title: string) => {
        auth.componentSelected = auth.components.find(c => c.title == title)
    }
    
    return {
        auth,
        onSelectComponent
    }
})