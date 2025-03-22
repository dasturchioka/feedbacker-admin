import { LoginForm } from '..'
import AuthLayout from '@/layouts/auth-layout'

export function AuthPage() {
	return (
		<AuthLayout>
			<div className='h-screen max-h-screen flex items-center justify-center'>
				<div className='w-full max-w-xs'>
					<a href='#' className='flex flex-col items-center gap-2 font-medium mb-4'>
						<div className='flex size-14 items-center justify-center rounded-md bg-primary text-primary-foreground'>
							<svg
								width='82'
								height='82'
								className='size-10'
								viewBox='0 0 82 82'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									className='stroke-primary-foreground'
									d='M26.9917 68.3333C33.5127 71.6784 41.014 72.5845 48.1439 70.8882C55.2738 69.192 61.5634 65.0049 65.8794 59.0816C70.1953 53.1583 72.2537 45.8883 71.6837 38.5815C71.1137 31.2748 67.9527 24.412 62.7704 19.2297C57.5881 14.0473 50.7252 10.8864 43.4185 10.3163C36.1118 9.74632 28.8417 11.8047 22.9184 16.1207C16.9951 20.4366 12.8081 26.7262 11.1118 33.8561C9.41553 40.986 10.3216 48.4874 13.6667 55.0083L6.83337 75.1667L26.9917 68.3333Z'
									strokeWidth='6.83333'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M40.2857 26L32 40.4999H38.2143L32 55L50.6428 36.3572H44.4285L50.6428 26H40.2857Z'
									className='fill-primary-foreground'
								/>
							</svg>
						</div>
					</a>
					<LoginForm />
				</div>
			</div>
		</AuthLayout>
	)
}
