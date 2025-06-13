import { TSigninForm, TUseUserReturn } from "../types/user.type"
import useAxios from "./axios"
import { reactive, ref } from "vue"
import useUserErrors from "./userErrors"
import { useRoute, useRouter } from "vue-router"

export default function useUser(): TUseUserReturn{
    const router = useRouter()
    const route = useRoute()

    const { post } = useAxios()
    const {signinErrors, onValidationSigninSchema} = useUserErrors()

    const token = ref<string>()
    const signinForm = reactive<TSigninForm>({
        email: '',
        password: ''
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

    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.setItem('lastRoute', route.path)
        token.value = ''
        router.push('/')
    }

    return {
        signinForm,
        token,
        signinErrors,
        onSignin,
        onLogout
    }
}