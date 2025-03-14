import * as React from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { routes } from '@/App'
import { LogOutIcon, UserIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<SidebarMenu className='relative'>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip={'/profile'}
							className='transition-all py-5 cursor-pointer data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground'
							asChild
							isActive={window.location.pathname === '/profile'}
						>
							<NavLink to='/profile'>
								<UserIcon />
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>Sardor Aminov</span>
									<span className='truncate text-xs'>Feedbacker</span>
								</div>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{routes.map(
								(item, index) =>
									item.layout === 'default' &&
									item.path !== '/profile' && (
										<SidebarMenuItem key={index}>
											<SidebarMenuButton
												className='transition-all data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground'
												tooltip={item.path}
												asChild
												isActive={item.path === window.location.pathname}
											>
												<NavLink to={item.path}>
													<item.icon />
													<span>{item.name}</span>
												</NavLink>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip={'Chiqish'}
							className='py-5 cursor-pointer  font-semibold transition-all'
						>
							<LogOutIcon />
							<span>Chiqish</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
