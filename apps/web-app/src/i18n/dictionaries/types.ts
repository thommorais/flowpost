import type { ptBr } from './pt-br'
import type { locales } from './locales'

type Locale = (typeof locales)[number]

type LocalesExtended = {
	[L in Locale]: {
		name: string
		direction: 'ltr' | 'rtl'
		file: `./${L}`
	}
}

type DictionaryKeys = keyof typeof ptBr

type Dictionary = {
	[key in DictionaryKeys]: string
}

type DictionaryLoaders = Record<Locale, () => Promise<{ default: Dictionary }>>

export type { Dictionary, DictionaryLoaders, Locale, LocalesExtended }
