import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	if (Cookies.get('token')) {
		return <Navigate to={'/'} />
	}

	return <div className='auth-layout'>{children}</div>
}
