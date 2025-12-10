import type { Metadata } from 'next'
import { FlagsGameClient } from './flags-client'

export const metadata: Metadata = {
	title: 'Flags Guessing Game',
	description: 'Guess the country based on the flag, track your streak, and improve your geography skills.',
}

const FlagsGamePage = (): React.ReactNode => {
	return (
		<main className='min-h-dvh bg-charcoal-blue-100 text-charcoal-blue-700'>
			<FlagsGameClient />
		</main>
	)
}

export default FlagsGamePage
