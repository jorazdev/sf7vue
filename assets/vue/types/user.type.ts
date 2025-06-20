import { Ref } from "vue";
import { email, z } from "zod/v4"; 

export type TUseUserReturn = {
  signinForm: TSigninForm
  signupForm: TSignupForm
  token: Ref<string | undefined>
  signinErrors: Ref<Record<string, string[]>>
  signupErrors: Ref<Record<string, string[]>>
  onSignin: () => Promise<void>
  onSignup: () => Promise<void>
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

export type TSignupForm = {
  firstName: string
  lastName: string
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

  export const signupSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" }),
  })