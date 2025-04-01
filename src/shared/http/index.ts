import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

const token = Cookies.get('token')

export const feedbackerInstance = axios.create({
	baseURL: 'http://localhost:3000/api/feedbacker',
	headers: {
		Authorization: `Bearer ${token ? token : ''}`,
	},
})

feedbackerInstance.interceptors.request.use(
	async config => {
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	async error => {
		return Promise.reject(error)
	}
)

console.log(token)

// Response interceptor to handle errors globally
feedbackerInstance.interceptors.response.use(
	async response => {
		const token = Cookies.get('token')
		feedbackerInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
		return response
	},
	async error => {
		if (error.response) {
			// Handle 401 (Unauthorized)
			if (error.response.status === 401) {
				console.error('Unauthorized! Redirecting to login...')
				// You can redirect to login or remove the token
				Cookies.remove('token')
				console.log(error)
			}

			if (error.response.status !== 404) {
				toast.error(error.response.data.msg || error.response.data.error)
				return
			}
		} else {
			console.error('Network Error:', error.msg)
		}

		return Promise.reject(error)
	}
)
