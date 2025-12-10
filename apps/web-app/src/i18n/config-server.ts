import { createI18nServer } from 'next-international/server'
import { dictionariesLoaders } from './dictionaries/helpers'

const i18nServer = createI18nServer(dictionariesLoaders, {})

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams }: ReturnType<typeof createI18nServer> =
	i18nServer
