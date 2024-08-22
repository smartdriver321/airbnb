'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import { createLocation } from '@/app/actions'
import { useCountries } from '@/lib/getCountries'
import { CreationBottomBar } from '@/app/_components/CreationBottomBar'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function Address({ params }: { params: { id: string } }) {
	const [locationValue, setLocationValue] = useState('')

	const { getAllCountries } = useCountries()

	const LazyMap = dynamic(() => import('@/app/_components/Map'), {
		ssr: false,
		loading: () => <Skeleton className='h-[50vh] w-full' />,
	})

	return (
		<>
			<div className='w-3/5 mx-auto'>
				<h2 className='text-3xl font-semibold tracking-tight transition-colors mb-10'>
					Where is your home located?
				</h2>
			</div>

			<form action={createLocation}>
				<input type='hidden' name='homeId' value={params.id} />
				<input type='hidden' name='countryValue' value={locationValue} />
				<div className='w-3/5 mx-auto mb-36'>
					<div className='mb-5'>
						<Select required onValueChange={(value) => setLocationValue(value)}>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select a Country' />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									<SelectLabel>Countries</SelectLabel>
									{getAllCountries().map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.flag} {item.label} / {item.region}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<LazyMap locationValue={locationValue} />
				</div>
				<CreationBottomBar />
			</form>
		</>
	)
}
