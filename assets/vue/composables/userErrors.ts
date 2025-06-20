import { Reactive, ref, watch } from "vue";
import { signinSchema, signupSchema, TSigninForm, TSignupForm } from "@app/types/user.type";

export default function useUserErrors (){
    const signinErrors = ref<Record<string, string[]>>({ email: [], password: [] })
    const signupErrors = ref<Record<string, string[]>>({firstName: [], lastName: [], email: [], password: [] })

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

    const onValidationSignupSchema = (signupForm: Reactive<TSignupForm>) => {
        watch(signupForm, (form) => {
            signupErrors.value = {firstName: [], lastName: [], email: [], password: []}
        })
        const validation = signupSchema.safeParse(signupForm)
        if (!validation.success) {
            validation.error.issues.forEach((issue) => {
              const field = issue.path[0] as keyof typeof signupErrors.value
              signupErrors.value[field] = [...(signupErrors.value[field] || []), issue.message]
            })
            return false
        }
        return true
    }

    return {
        signinErrors,
        signupErrors,
        onValidationSigninSchema,
        onValidationSignupSchema
    }
}