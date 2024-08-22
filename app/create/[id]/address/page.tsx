'use client'

import { useState } from 'react'

import { useCountries } from '@/lib/getCountries'
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

	return (
		<>
			<div className='w-3/5 mx-auto'>
				<h2 className='text-3xl font-semibold tracking-tight transition-colors mb-10'>
					Where is your home located?
				</h2>
			</div>

			<form action=''>
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
				</div>
			</form>
		</>
	)
}
