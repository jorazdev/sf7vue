import { Reactive, ref, watch } from "vue";
import { signinSchema, TSigninForm } from "../types/user.type";

export default function useUserErrors (){
    const signinErrors = ref<Record<string, string[]>>({ email: [], password: [] })

    const onValidationSigninSchema = (signinForm: Reactive<TSigninForm>) => {
        watch(signinForm, (form) => {
            signinErrors.value = {email: [], password: []}
        })
        const validation = signinSchema.safeParse(signinForm)
        if (!validation.success) {
            validation.error.issues.forEach((issue) => {
              const field = issue.path[0] as keyof typeof signinErrors.value
              signinErrors.value[field] = [...(signinErrors.value[field] || []), issue.message]
            })
            return false
        }
        return true
    }

    

    return {
        signinErrors,
        onValidationSigninSchema
    }
}