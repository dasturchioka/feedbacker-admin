import { feedbackerInstance } from '@/shared/http'
import Cookies from 'js-cookie'

export async function getProfile() {
	const response = await feedbackerInstance.get('/check', {
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	})
	const data = await response.data

	if (data) {
		Cookies.set('token', data.token)
	}
	return data
}
