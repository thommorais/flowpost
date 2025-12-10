import { en, ptBr } from '_/i18n/dictionaries/locales'
import type { DictionaryLoaders, LocalesExtended } from '_/i18n/dictionaries/types'

const localesExtended: LocalesExtended = {
	[en]: {
		name: 'english',
		direction: 'ltr',
		file: `./${en}`,
	},
	[ptBr]: {
		name: 'português',
		direction: 'ltr',
		file: `./${ptBr}`,
	},
}

const dictionariesLoaders: DictionaryLoaders = {
	[en]: async () => import('./en'),
	[ptBr]: async () => import('./pt-br'),
}

export { dictionariesLoaders, localesExtended }
