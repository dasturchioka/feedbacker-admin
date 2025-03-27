export default function useDate() {
	const date = new Date()

	const formattedDate = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23', // Ensures 24-hour format
		timeZone: 'Asia/Tashkent',
	})
		.format(date)
		.replace(',', '') // Remove comma between date and time
		.replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3') // Ensure YYYY-MM-DD format
		.replace(' ', 'T') // Replace space with 'T' for ISO format

	return { formattedDate }
}
