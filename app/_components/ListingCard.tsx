import Image from 'next/image'
import Link from 'next/link'

import { addToFavorite, deleteFromFavorite } from '../actions'
import { useCountries } from '@/lib/getCountries'
import { AddToFavoriteButton, DeleteFromFavoriteButton } from './SubmitButtons'

interface iAppProps {
	imagePath: string
	description: string
	location: string
	price: number
	userId: string | undefined
	favoriteId: string
	isInFavoriteList: boolean
	homeId: string
	pathName: string
}

export function ListingCard({
	imagePath,
	description,
	location,
	price,
	userId,
	favoriteId,
	isInFavoriteList,
	homeId,
	pathName,
}: iAppProps) {
	const { getCountryByValue } = useCountries()
	const country = getCountryByValue(location)

	return (
		<div className='flex flex-col'>
			<div className='relative h-72'>
				<Image
					src={`https://hyvjqhdymernikwghmot.supabase.co/storage/v1/object/public/images/${imagePath}`}
					alt='Image of House'
					fill
					className='rounded-lg h-full object-cover'
				/>

				{userId && (
					<div className='z-10 absolute top-2 right-2'>
						{isInFavoriteList ? (
							<form action={deleteFromFavorite}>
								<input type='hidden' name='favoriteId' value={favoriteId} />
								<input type='hidden' name='userId' value={userId} />
								<input type='hidden' name='pathName' value={pathName} />
								<DeleteFromFavoriteButton />
							</form>
						) : (
							<form action={addToFavorite}>
								<input type='hidden' name='homeId' value={homeId} />
								<input type='hidden' name='userId' value={userId} />
								<input type='hidden' name='pathName' value={pathName} />
								<AddToFavoriteButton />
							</form>
						)}
					</div>
				)}
			</div>

			<Link href={`my-homes/${homeId}/my-home-details`} className='mt-2'>
				<h3 className='font-medium text-base'>
					{country?.flag} {country?.label} / {country?.region}
				</h3>
				<p className='text-muted-foreground text-sm line-clamp-2'>
					{description}
				</p>
				<p className='pt-2 text-muted-foreground'>
					<span className='font-medium text-black'>${price}</span> per night
				</p>
			</Link>
		</div>
	)
}
