import { TSigninForm, TUseUserReturn } from "../types/user.type"
import useAxios from "./axios"
import { reactive, ref } from "vue"
import useUserErrors from "./userErrors"

export default function useUser(): TUseUserReturn{
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
        token.value = response?.data.token
    }
    return {
        signinForm,
        token,
        signinErrors,
        onSignin
    }
}