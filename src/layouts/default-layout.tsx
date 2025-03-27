import { AppSidebar } from '@/shared/base/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import Cookie from 'js-cookie'
import { routes } from '@/App'
import { Navigate } from 'react-router-dom'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { getProfile } from '@/_profile'
import AddFeedback from '@/_feedbacks/components/add-feedback'

const queryClient = new QueryClient()

export default function DefaultLayout({ children }: React.PropsWithChildren<{}>) {
	if (!Cookie.get('token')) {
		return <Navigate to={'/auth'} />
	}

	const cachedData = queryClient.getQueryData(['profile'])

	const { isError, error } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		initialData: cachedData,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})

	const isNetworkError =
		isError && (error.message.includes('Failed to fetch') || error.name === 'TypeError')

	if (isNetworkError) {
		return <p style={{ color: 'red' }}>No internet connection. Please check your network.</p>
	}

	if (isError) return <Navigate to={'/auth'} />

	const defaultOpen = Cookie.get('sidebar_state') === 'true'
	const currentUrl = window.location.pathname

	const currentRouteName = routes.find(route => route.path === currentUrl)?.name || 'Dashboard'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1 cursor-pointer' />
						<h1>{currentRouteName}</h1>
					</div>
				</header>
				<main className='main-content px-4'>
					<AddFeedback />
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
