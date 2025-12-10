'use client'
import { createI18nClient } from 'next-international/client'
import { dictionariesLoaders } from './dictionaries/helpers'

const i18nClient = createI18nClient(dictionariesLoaders, {})

export const {
	useI18n,
	useScopedI18n,
	I18nProviderClient,
	useChangeLocale,
	defineLocale,
	useCurrentLocale,
}: ReturnType<typeof createI18nClient> = i18nClient
