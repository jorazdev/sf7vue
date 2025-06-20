import { TSigninForm, TSignupForm, TUseUserReturn } from "@app/types/user.type"
import useAxios from "./axios"
import { reactive, ref } from "vue"
import useUserErrors from "./userErrors"
import { useRoute, useRouter } from "vue-router"

export default function useUser(): TUseUserReturn{
    const router = useRouter()
    const route = useRoute()

    const { post } = useAxios()
    const {signinErrors, signupErrors, onValidationSigninSchema, onValidationSignupSchema } = useUserErrors()

    const token = ref<string>()
    const signinForm = reactive<TSigninForm>({
        email: '',
        password: ''
    })
    const signupForm = reactive<TSignupForm>({
        lastName: 'RAKOTONDRASOA',
        firstName: 'Onjamalala',
        email: 'malala@gmail.com',
        password: '123'
    })
    const onSignin = async () => {
       if (!onValidationSigninSchema(signinForm)) {
            return
        }
        const response = await post('/api/login_check', {
            ...signinForm
          })
        if(response?.data.token){
            localStorage.setItem('token', response?.data.token)
            token.value = response?.data.token
            const lastRoute = localStorage.getItem('lastRoute') || '/dashboard'
            window.location.href = lastRoute;
        }
    }
    const onSignup = async () => {
        if (!onValidationSignupSchema(signupForm)) {
            return
        }
        const response = await post('/api/user/signup', {
            ...signupForm
          })
        if(!response.data.success){
            for (const property in response.data.data) {
                signupErrors.value[property] = [response.data.data[property]]
            }
        }
    }
    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.setItem('lastRoute', route.path)
        token.value = ''
        router.push('/')
    }
    return {
        signinForm,
        signupForm,
        token,
        signinErrors,
        signupErrors,
        onSignin,
        onSignup,
        onLogout
    }
}