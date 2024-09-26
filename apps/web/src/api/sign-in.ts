import { api } from "@/lib/ky";

export interface SignInRequest {
  email: string
}

export async function signIn({email}: SignInRequest) {
  await api.post("authenticate", {
    json: { email }
  })
}