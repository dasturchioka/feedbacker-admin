import { AxiosError } from 'axios'

type HTTPError = { status: number; message: string }

export const customError = (error: unknown): HTTPError => {
	if (error instanceof AxiosError) {
		console.log(error)
		return {
			status: error.response ? error.response.status : Number(error.status),
			message: error.response
				? error.response.data.msg || error.response.data.error
				: error.message,
		}
	} else if (typeof error === 'object' && error !== null) {
		const errorObj = error as { status?: number; message?: string }
		return {
			status: errorObj.status || 500,
			message: errorObj.message || 'Unknown error',
		}
	} else {
		return {
			status: 500,
			message: 'Unknown error',
		}
	}
}
