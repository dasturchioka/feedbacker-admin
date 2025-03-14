import { AppSidebar } from '@/components/base/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Cookie from 'js-cookie'
import { routes } from '@/App'

export default function DefaultLayout({ children }: React.PropsWithChildren<{}>) {
	const defaultOpen = Cookie.get('sidebar_state') === 'true'
	const currentUrl = window.location.pathname

	const currentRouteName = routes.find((route) => route.path === currentUrl)?.name || "Dashboard"
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
				<main className='main-content px-4'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
