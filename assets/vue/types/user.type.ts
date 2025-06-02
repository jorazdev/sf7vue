import { Ref } from "vue";
import { email, z } from "zod/v4"; 

export type TUseUserReturn = {
  signinForm: TSigninForm
  token: Ref<string | undefined>
  signinErrors: Ref<Record<string, string[]>>
  onSignin: () => Promise<void>
  onLogout: () => void
}

export type TUser = {
    id: number
    email: string
    firstName: string
    lastName: string
    roles: string[]
}

export type TSigninForm = {
    email: string
    password: string
}

export const signinSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" }),
  })