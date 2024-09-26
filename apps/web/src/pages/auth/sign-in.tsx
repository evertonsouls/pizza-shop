import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({
        email: data.email,
      })

      toast.success('We sent you a magic link to your email', {
        action: {
          label: 'Resend',
          onClick: () => handleSignIn(data),
        },
      })
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <Helmet title="Sign In" />

      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-up">New partner</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Panel Access
            </h1>
            <p className="text-sm text-muted-foreground">
              Follow your sells and get access to the panel
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Panel Access
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
