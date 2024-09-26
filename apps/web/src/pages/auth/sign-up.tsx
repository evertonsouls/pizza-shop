import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  restaurantName: z.string().min(3),
  managerName: z.string().min(3),
  phone: z.string().min(3),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('We sent you a magic link to your email', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <Helmet title="Sign Up" />

      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-in">Sign in</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Make partner account to access the panel
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant name</Label>
              <Input id="restaurantName" {...register('restaurantName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Manager name</Label>
              <Input id="managerName" {...register('managerName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Create account
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              After creating account you will be able to access the panel
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
