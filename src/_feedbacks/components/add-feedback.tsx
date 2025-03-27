import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useQuery } from '@tanstack/react-query'
import { fetchTeachers } from '../calls'
import React, { useRef, useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import useDate from '@/shared/hooks/use-date'
import { Rating } from 'react-simple-star-rating'
import { Textarea } from '@/shared/ui/textarea'

export default function AddFeedback() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['fetch-teachers'],
		queryFn: fetchTeachers,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
	const { formattedDate } = useDate()
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [selectedTeacher, setSelectedTeacher] = useState(() => ({
		fullname: '',
		id: '',
		rating: 0,
	}))

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='cursor-pointer fixed bottom-6 right-6'>
					<svg
						width='82'
						height='82'
						className='size-5'
						viewBox='0 0 82 82'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							className='stroke-primary-foreground'
							d='M26.9917 68.3333C33.5127 71.6784 41.014 72.5845 48.1439 70.8882C55.2738 69.192 61.5634 65.0049 65.8794 59.0816C70.1953 53.1583 72.2537 45.8883 71.6837 38.5815C71.1137 31.2748 67.9527 24.412 62.7704 19.2297C57.5881 14.0473 50.7252 10.8864 43.4185 10.3163C36.1118 9.74632 28.8417 11.8047 22.9184 16.1207C16.9951 20.4366 12.8081 26.7262 11.1118 33.8561C9.41553 40.986 10.3216 48.4874 13.6667 55.0083L6.83337 75.1667L26.9917 68.3333Z'
							strokeWidth='6.83333'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M40.2857 26L32 40.4999H38.2143L32 55L50.6428 36.3572H44.4285L50.6428 26H40.2857Z'
							className='fill-primary-foreground'
						/>
					</svg>
					Feedback yozish
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Feedback yozish</DialogTitle>
				</DialogHeader>
				<Select onValueChange={value => setSelectedTeacher(state => ({ ...state, id: value }))}>
					<div className='form-group space-y-2'>
						<Label>Qaysi o'qituvchiga?</Label>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={selectedTeacher.fullname || 'Tanlang'} />
						</SelectTrigger>
					</div>
					<SelectContent>
						{isError ? (
							<p>Ustozlar topilmadi</p>
						) : isLoading ? (
							<p>Yuklanmoqda...</p>
						) : (
							<React.Fragment>
								{data.map((t: any) => (
									<SelectItem key={t.id} value={t.id}>
										{t.fullname}
									</SelectItem>
								))}
							</React.Fragment>
						)}
					</SelectContent>
				</Select>
				<div className='form-group space-y-2'>
					<Label>Qaysi sanadagi va vaqtdagi darsiga?</Label>
					<Input
						defaultValue={formattedDate}
						onChange={e => console.log(e.target.value)}
						ref={inputRef}
						type='datetime-local'
					/>
				</div>
				<div className='form-group space-y-2'>
					<Label>Nechi baho qo'yamiz?</Label>
					<Rating
						className='flex'
						style={{ display: 'flex', flexDirection: 'row' }}
						fillColorArray={['#f14f45', '#f16c45', '#f18845', '#f1c245', '#f1d000']}
						iconsCount={5}
						onClick={rating => setSelectedTeacher(state => ({ ...state, rating }))}
						tooltipDefaultText='Bahoingiz'
						showTooltip
						tooltipStyle={{ fontSize: 12, padding: '5px 14px', margin: 0, marginTop: 10 }}
						tooltipArray={['Qoniqarsiz', 'Qoniqarli', 'Yomonmas', 'Yaxshi', 'Super']}
						transition
					/>
				</div>
				<div className='form-group space-y-2'>
					<Label>Izoh</Label>
					<Textarea className='max-h-[200px]' />
				</div>
				<Button type='submit'>Jo'natish</Button>
			</DialogContent>
		</Dialog>
	)
}
