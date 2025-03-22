import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

export const authInstance = axios.create({
	baseURL: 'http://localhost:3000/api/feedbacker',
})

authInstance.interceptors.request.use(
	config => {
		const token = Cookies.get('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// Response interceptor to handle errors globally
authInstance.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error.response) {
			// Handle 401 (Unauthorized)
			if (error.response.status === 401) {
				console.error('Unauthorized! Redirecting to login...')
				// You can redirect to login or remove the token
				Cookies.remove('token')
				window.location.href = '/auth'
			}

			toast.error(error.response.data.message || error.response.data.error)
		} else {
			console.error('Network Error:', error.message)
		}

		return Promise.reject(error)
	}
)
