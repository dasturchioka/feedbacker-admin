import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { feedbackerInstance } from '@/shared/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import useLoadingStore from '@/shared/stores/loading'

const LATIN_NUMBER_REGEX = /^[A-Za-z0-9]+$/
const PASSWORD_REGEX = /^[^\sА-Яа-яЁё]+$/

const FormSchema = z.object({
	username: z
		.string()
		.min(3, {
			message: "Username kamida 3 ta belgidan iborat bo'lishi kerak",
		})
		.max(20, { message: "Username maximum 20 ta belgidan iborat bo'lishi kerak" })
		.regex(LATIN_NUMBER_REGEX, {
			message: "Username faqat lotin harflaridan va raqamlardan iborat bo'lishi kerak",
		}),
	password: z
		.string()
		.min(8, {
			message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
		})
		.max(20, { message: "Parol maximum 20 ta belgidan iborat bo'lishi kerak" })
		.regex(PASSWORD_REGEX, {
			message: 'Parolda kirill harflari yoki bo‘sh joy bo‘lishi mumkin emas.',
		}),
})

export function LoginForm({}: React.ComponentPropsWithoutRef<'form'>) {
	const setLoading = useLoadingStore(state => state.setLoading)
	const nav = useNavigate()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	async function submit({ password, username }: { username: string; password: string }) {
		try {
			await setLoading(true)
			const response = await feedbackerInstance.post('/auth', { username, password })

			if (response.status === 200) {
				const data = await response.data
				Cookies.set('token', data.token, { secure: true })
				toast.success(data.msg)
				nav('/')
				await setLoading(false)
				return
			}
		} catch (error) {
			await setLoading(false)
			console.log(error)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input className='w-full' placeholder='sardor0703' {...field} />
							</FormControl>
							<FormDescription>Bu sizning loginingiz</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input className='w-full' type='password' placeholder='********' {...field} />
							</FormControl>
							<FormDescription>Parolingizni eslab qoling</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full' type='submit'>
					Submit
				</Button>
			</form>
		</Form>
	)
}
