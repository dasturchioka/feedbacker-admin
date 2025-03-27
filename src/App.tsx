import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeIcon, LockIcon, UserIcon } from 'lucide-react'
import { FeedPage } from './_feedbacks'
import { AuthPage } from './_auth'
import { Toaster } from '@/shared/ui/sonner'
import ProfilePage from './_profile/pages/profile-page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
export const routes = [
	{
		path: '/',
		component: <FeedPage />,
		name: 'Feedbacklar',
		icon: HomeIcon,
		layout: 'default',
	},
	{
		path: '/profile',
		component: <ProfilePage />,
		name: 'Profile',
		icon: UserIcon,
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
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Toaster position='top-center' />
				<Routes>
					{routes.map((route, index) => {
						return <Route key={index} path={route.path} element={route.component} />
					})}
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
