import { getStaticParams } from '_/i18n/config-server'
import '_/styles/globals.css'
import '_/styles/tailwind.css'
import type { Metadata } from 'next'
import { meta } from './meta'

export function generateStaticParams() {
	return getStaticParams()
}

export const metadata: Metadata = {
	title: meta.name,
	description: meta.description,
}

type RootLayoutProps = {
	children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps): Promise<React.ReactNode> => children

export default RootLayout
