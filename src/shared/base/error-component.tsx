interface ErrorComponentProps {
	error: Error
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
	console.log(error)
	return (
		<div className='bg-background text-foreground rounded-md p-6 max-w-md mx-auto'>
			<div className='flex items-start gap-4'>
				<div className='bg-destructive rounded-md p-3 flex items-center justify-center'>
					<div className='w-6 h-6 text-destructive-foreground' />
				</div>
				<div className='space-y-2'>
					<h3 className='text-xl font-semibold'>Oops, something went wrong!</h3>
					<p className='text-muted-foreground'>
						We're sorry, but an unexpected error has occurred. Please try again later or contact
						support if the issue persists.
					</p>
				</div>
			</div>
		</div>
	)
}
