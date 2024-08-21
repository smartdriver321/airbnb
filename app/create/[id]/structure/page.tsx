import { SelectedCategory } from '@/app/_components/SelectedCategory'

export default function Structure({ params }: { params: { id: string } }) {
	return (
		<>
			<div className='w-3/5 mx-auto'>
				<h2 className='text-3xl font-semibold tracking-tight transition-colors'>
					Which of these best describe your home?
				</h2>
			</div>

			<form action=''>
				<input type='hidden' name='homeId' value={params.id} />
				<SelectedCategory />
			</form>
		</>
	)
}
