import { feedbackerInstance } from '@/shared/http'
import Cookies from 'js-cookie'

export async function fetchTeachers() {
	const response = await feedbackerInstance.get('/fetch-teachers', {
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	})

	const data = await response.data.teachers

	return data
}
