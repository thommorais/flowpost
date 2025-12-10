import type { Locale } from '_/i18n/dictionaries/types'

type LocaleType = {
	locale: Locale
}

export type Param = string | string[] | undefined
export type Params = Record<string, Param> & LocaleType

export type SearchParams = {
	[param: string]: Param
}

export type PageProps = Readonly<{
	params: Promise<Params>
	searchParams: Promise<SearchParams>
}>

export type LayoutProps = Readonly<{ params: Promise<Params>; children: React.ReactElement }>
