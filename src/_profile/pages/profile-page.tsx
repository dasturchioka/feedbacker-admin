import DefaultLayout from '@/layouts/default-layout'
import { useQuery, QueryClient } from '@tanstack/react-query'
import { getProfile } from '../calls/profile-call'
import ErrorComponent from '@/shared/base/error-component'

const queryClient = new QueryClient()

export default function ProfilePage() {
	const cachedData = queryClient.getQueryData(['profile'])

	const { isLoading, data, isError, error } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		initialData: cachedData,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})

	if (isError) return <ErrorComponent error={error} />

	return (
		<DefaultLayout>
			<div className='w-full'>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<pre className='break-words'>
						<code>{JSON.stringify(data.feedbacker, null, 2)}</code>
					</pre>
				)}
			</div>
		</DefaultLayout>
	)
}
