import { Suspense } from 'react'

import prisma from '@/lib/db'
import { ListingCard } from './_components/ListingCard'
import { MapFilterItems } from './_components/MapFilterItems'
import { SkeletonCard } from './_components/SkeletonCard'

async function getData({
	searchParams,
}: {
	searchParams?: {
		filter?: string
	}
}) {
	const data = await prisma.home.findMany({
		where: {
			addedCategory: true,
			addedLocation: true,
			addedDescription: true,
			categoryName: searchParams?.filter ?? undefined,
		},
		select: {
			id: true,
			photo: true,
			description: true,
			country: true,
			price: true,
		},
	})

	return data
}

async function ShowItems({
	searchParams,
}: {
	searchParams?: {
		filter?: string
	}
}) {
	const data = await getData({ searchParams: searchParams })

	return (
		<>
			<div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
				{data.map((item) => (
					<ListingCard
						key={item.id}
						imagePath={item.photo as string}
						description={item.description as string}
						location={item.country as string}
						price={item.price as number}
					/>
				))}
			</div>
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
