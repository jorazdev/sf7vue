import { defineStore } from "pinia"
import { ref } from "vue"
import { TUser } from "../types/user.type"
export const useUserStore = defineStore('user', () => {
   
    let user = ref<TUser | null>(null)

    return {
        user
    }
})