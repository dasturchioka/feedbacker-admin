import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeIcon, LockIcon } from 'lucide-react'
import { FeedPage } from './_feedbacks'
import { AuthPage } from './_auth'
import { Toaster } from '@/shared/ui/sonner'

export const routes = [
	{
		path: '/',
		component: <FeedPage />,
		name: 'Feedbacklar',
		icon: HomeIcon,
		layout: 'default',
	},
	{
		path: '/auth',
		component: <AuthPage />,
		name: 'Kirish',
		icon: LockIcon,
		layout: 'auth',
	},
]

export default function App() {
	return (
		<BrowserRouter>
			<Toaster position='top-center' />
			<Routes>
				{routes.map((route, index) => {
					return <Route key={index} path={route.path} element={route.component} />
				})}
			</Routes>
		</BrowserRouter>
	)
}
