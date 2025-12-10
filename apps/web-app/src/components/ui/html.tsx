import type { Locale } from '_/i18n/dictionaries/types'
import { tv } from '_/lib/third-party/tv'
import type { LayoutProps } from '_/types/pages-layouts'
import { Sono } from 'next/font/google'

const sono = Sono({
	subsets: ['latin'],
	display: 'swap',
})

export const htmlClasses = tv({
	base: [
		sono.className,
		'min-h-dvh w-full max-w-screen overscroll-none bg-porcelain font-default antialiased accent-accent dark:bg-inkwell',
		'text-stone-800 antialiased transition-colors transition-discrete duration-200 ease-enter',
	],
})

type HTMLProps = Pick<LayoutProps, 'children'> &
	React.ComponentProps<'html'> & {
		locale: Locale
	}

const HTML = ({ children, locale, className }: HTMLProps): React.ReactNode => {
	return (
		<html lang={locale} className={htmlClasses({ class: [className] })}>
			{children}
		</html>
	)
}

export { HTML }
