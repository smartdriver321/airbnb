/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
	RegisterLink,
	LoginLink,
	LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export async function UserNav() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className='rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3'>
					<MenuIcon className='w-6 h-6 lg:w-5 lg:h-5' />
					<img
						src={
							user?.picture ??
							'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
						}
						alt='Image of the user'
						className='rounded-full h-8 w-8 hidden lg:block'
					/>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w[1200px]' align='end'>
				{user ? (
					<>
						<DropdownMenuItem>
							<form action='' className='w-full'>
								<button type='submit' className='w-full text-start'>
									AirBnB your Home
								</button>
							</form>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/my-homes' className='w-full'>
								My Listings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/favorites' className='w-full'>
								My Favorites
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/reservations' className='w-full'>
								My Reservations
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogoutLink className='w-full'>Logout</LogoutLink>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem>
							<RegisterLink className='w-full'>Register</RegisterLink>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LoginLink className='w-full'>Login</LoginLink>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
