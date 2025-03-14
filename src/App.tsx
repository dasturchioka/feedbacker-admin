import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeIcon, InfoIcon, LockIcon, UserIcon } from 'lucide-react'
import HomePage from './pages/home-page'
import AuthPage from './pages/auth-page'
import AboutPage from './pages/about-page'
import ProfilePage from './pages/profile-page'

export const routes = [
	{
		path: '/',
		component: <HomePage />,
		name: 'Bosh sahifa',
		icon: HomeIcon,
		layout: 'default',
	},
	{
		path: '/about',
		component: <AboutPage />,
		name: 'About',
		icon: InfoIcon,
		layout: 'default',
	},
	{
		path: '/profile',
		component: <ProfilePage />,
		name: 'Profil',
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
		<BrowserRouter>
			<Routes>
				{routes.map((route, index) => {
					return <Route key={index} path={route.path} element={route.component} />
				})}
			</Routes>
		</BrowserRouter>
	)
}
