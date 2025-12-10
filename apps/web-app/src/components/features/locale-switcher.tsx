'use client'

import { useChangeLocale, useCurrentLocale } from '_/i18n/config-client'
import { locales } from '_/i18n/dictionaries/locales'
import type { Locale } from '_/i18n/dictionaries/types'

const localeLabels: Record<Locale, string> = {
	en: 'EN',
	'pt-br': 'PT',
}

export const LocaleSwitcher = () => {
	const currentLocale = useCurrentLocale()
	const changeLocale = useChangeLocale()
	const targetLocale: Locale | undefined = locales.find(locale => locale !== currentLocale)

	if (!targetLocale) {
		return null
	}

	return (
		<div className='pointer-events-auto fixed right-4 bottom-4 z-50'>
			<div className='flex items-center overflow-hidden rounded-full border border-inkwell/10 bg-white/80 font-semibold text-xs uppercase shadow-inkwell/10 shadow-lg backdrop-blur dark:border-porcelain/20 dark:bg-inkwell/80 dark:text-porcelain dark:shadow-black/30'>
				<button
					type='button'
					onClick={() => {
						if (targetLocale && targetLocale !== currentLocale) {
							changeLocale(targetLocale)
						}
					}}
					className='px-3 py-2 text-inkwell/80 tracking-wide transition-colors duration-150 hover:text-inkwell focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-porcelain/80 dark:focus-visible:ring-porcelain/70 dark:focus-visible:ring-offset-inkwell dark:hover:text-porcelain'
				>
					{localeLabels[targetLocale]}
				</button>
			</div>
		</div>
	)
}
