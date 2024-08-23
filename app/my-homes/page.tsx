import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import prisma from '@/lib/db'
import { NoItems } from '../_components/NoItem'
import { ListingCard } from '../_components/ListingCard'

async function getData(userId: string) {
	noStore()
	const data = await prisma.home.findMany({
		where: {
			userId: userId,
			addedCategory: true,
			addedDescription: true,
			addedLocation: true,
		},
		select: {
			id: true,
			photo: true,
			description: true,
			country: true,
			price: true,
			Favorite: {
				where: {
					userId: userId,
				},
			},
		},
		orderBy: {
			createdAT: 'desc',
		},
	})

	return data
}

export default async function MyHomes() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user) {
		return redirect('/')
	}

	const data = await getData(user.id)

	return (
		<section className='container mx-auto px-5 lg:px-10 mt-10'>
			<h2 className='text-3xl font-semibold tracking-tight'>Your Homes</h2>

			{data.length === 0 ? (
				<NoItems
					description='Please list a home on airbnb so that you can see it right here'
					title='Your dont have any homes listed'
				/>
			) : (
				<div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8'>
					{data.map((item) => (
						<ListingCard
							key={item.id}
							imagePath={item.photo as string}
							description={item.description as string}
							location={item.country as string}
							price={item.price as number}
							userId={user?.id}
							favoriteId={item.Favorite[0]?.id}
							homeId={item.id}
							isInFavoriteList={item.Favorite.length > 0 ? true : false}
							pathName='/my-home'
						/>
					))}
				</div>
			)}
		</section>
	)
}
