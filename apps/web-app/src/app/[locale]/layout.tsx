import { IconSprites } from '@flowpost/ui/icon'
import { LocaleSwitcher } from '_/components/features/locale-switcher'
import { LocaleProviders } from '_/components/providers/locale-providers'
import { HTML } from '_/components/ui/html'
import { getStaticParams } from '_/i18n/config-server'
import type { Locale } from '_/i18n/dictionaries/types'

export function generateStaticParams() {
	return getStaticParams()
}

type LocaleLayoutProps = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps): Promise<React.ReactNode> => {
	const resolvedParams = await params
	const locale = resolvedParams.locale as Locale

	return (
		<HTML locale={locale}>
			<body className='relative min-h-dvh w-full overflow-x-hidden'>
				<LocaleProviders locale={locale}>
					{children}
					<LocaleSwitcher />
				</LocaleProviders>
				<IconSprites />
			</body>
		</HTML>
	)
}

export default LocaleLayout
