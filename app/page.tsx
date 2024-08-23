import { Suspense } from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import prisma from '@/lib/db'
import { NoItems } from './_components/NoItem'
import { ListingCard } from './_components/ListingCard'
import { MapFilterItems } from './_components/MapFilterItems'
import { SkeletonCard } from './_components/SkeletonCard'

async function getData({
	userId,
	searchParams,
}: {
	userId: string | undefined
	searchParams?: {
		filter?: string
		country?: string
		guest?: string
		room?: string
		bathroom?: string
	}
}) {
	const data = await prisma.home.findMany({
		where: {
			addedCategory: true,
			addedLocation: true,
			addedDescription: true,
			categoryName: searchParams?.filter ?? undefined,
			country: searchParams?.country ?? undefined,
			guests: searchParams?.guest ?? undefined,
			bedrooms: searchParams?.room ?? undefined,
			bathrooms: searchParams?.bathroom ?? undefined,
		},
		select: {
			id: true,
			photo: true,
			description: true,
			country: true,
			price: true,
			Favorite: {
				where: {
					userId: userId ?? undefined,
				},
			},
		},
	})

	return data
}

async function ShowItems({
	searchParams,
}: {
	searchParams?: {
		filter?: string
		country?: string
		guest?: string
		room?: string
		bathroom?: string
	}
}) {
	const { getUser } = getKindeServerSession()
	const user = await getUser()
	const data = await getData({ searchParams: searchParams, userId: user?.id })

	return (
		<>
			{data.length === 0 ? (
				<NoItems
					description='Please check another category or create your own listing!'
					title='Sorry no listings found for this category...'
				/>
			) : (
				<div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
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
							pathName='/'
						/>
					))}
				</div>
			)}
		</>
	)
}

function SkeletonLoading() {
	return (
		<div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	)
}

export default function Home({
	searchParams,
}: {
	searchParams?: {
		filter?: string
		country?: string
		guest?: string
		room?: string
		bathroom?: string
	}
}) {
	return (
		<div className='container mx-auto px-5 lg:px-10'>
			<MapFilterItems />

			<Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
				<ShowItems searchParams={searchParams} />
			</Suspense>
		</div>
	)
}
