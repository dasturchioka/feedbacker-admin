import DefaultLayout from '@/layouts/default-layout'
import { useQuery } from '@tanstack/react-query'
import { fetchFeedbacks } from '../calls'
import { customError } from '@/shared/lib/error-handler'

export function FeedPage() {
	const { data, isError, error, isFetching } = useQuery({
		queryKey: ['feedbacks'],
		queryFn: fetchFeedbacks,
		retry: false,
	})

	if (isError) {
		const errorMessage = customError(error)

		return (
			<DefaultLayout>
				<div>{errorMessage.message}</div>
			</DefaultLayout>
		)
	}

	if (isFetching) {
		return (
			<DefaultLayout>
				<div>Loading...</div>
			</DefaultLayout>
		)
	}

	return (
		<DefaultLayout>
			<div>
				{data.map((feedback: any) => (
					<div key={feedback.id}>
						<h2>{feedback.title}</h2>
					</div>
				))}
			</div>
		</DefaultLayout>
	)
}
