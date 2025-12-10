import { COUNTRY_FLAGS, type CountryFlag } from './data'

export type RoundResult = 'correct' | 'incorrect' | 'skipped'

export type ScoreSnapshot = {
	totalGames: number
	correctAnswers: number
	currentStreak: number
	bestStreak: number
	lastPlayedAt: string | null
}

export type FlagRound = {
	correct: CountryFlag
	options: CountryFlag[]
}

export type GameMode = 'start' | 'playing' | 'ended'

export type GameSession = {
	mode: GameMode
	totalRounds: number
	currentRound: number
	sessionCorrect: number
}

const OPTIONS_PER_ROUND = 4
const HISTORY_LIMIT = 5
const ACCURACY_PRECISION = 10

export const EMPTY_SCORE: ScoreSnapshot = {
	totalGames: 0,
	correctAnswers: 0,
	currentStreak: 0,
	bestStreak: 0,
	lastPlayedAt: null,
}

export const EMPTY_SESSION: GameSession = {
	mode: 'start',
	totalRounds: 0,
	currentRound: 0,
	sessionCorrect: 0,
}

const getSecureRandomFloat = (): number => {
	if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.getRandomValues === 'function') {
		const buffer = new Uint32Array(1)
		globalThis.crypto.getRandomValues(buffer)
		const value = buffer[0]
		if (typeof value === 'number') {
			return value / 0xffffffff
		}
	}

	// Math.random is an acceptable fallback when crypto is unavailable (older browsers or SSR)
	return Math.random()
}

export const shuffle = <T>(items: readonly T[]): T[] => {
	const result = [...items]
	if (result.length <= 1) {
		return result
	}
	for (let index = result.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(getSecureRandomFloat() * (index + 1))
		const currentValue = result[index]
		const swapValue = result[swapIndex]

		// Bounds are guaranteed by the loop but keep a safety check for TypeScript strictness.
		if (currentValue === undefined || swapValue === undefined) {
			continue
		}

		result[index] = swapValue
		result[swapIndex] = currentValue
	}
	return result
}

const pickRandomCountry = (countries: readonly CountryFlag[]): CountryFlag => {
	const [country] = shuffle(countries)
	if (!country) {
		throw new Error('No countries available to pick from')
	}
	return country
}

const pickCorrectCountry = (countries: readonly CountryFlag[], recentCorrectCodes: readonly string[]): CountryFlag => {
	const avoid = new Set(recentCorrectCodes)
	const filtered = countries.filter(country => !avoid.has(country.code))

	if (filtered.length >= OPTIONS_PER_ROUND) {
		return pickRandomCountry(filtered)
	}

	return pickRandomCountry(countries)
}

const pickDistractors = (countries: readonly CountryFlag[], correct: CountryFlag): CountryFlag[] => {
	const candidates = countries.filter(country => country.code !== correct.code)
	if (candidates.length < OPTIONS_PER_ROUND - 1) {
		throw new Error('Not enough unique countries to build options')
	}
	return shuffle(candidates).slice(0, OPTIONS_PER_ROUND - 1)
}

export const createRound = (
	countries: readonly CountryFlag[] = COUNTRY_FLAGS,
	recentCorrectCodes: readonly string[] = [],
): FlagRound => {
	if (countries.length < OPTIONS_PER_ROUND) {
		throw new Error('At least four countries are required to start a round')
	}

	const correct = pickCorrectCountry(countries, recentCorrectCodes)
	const distractors = pickDistractors(countries, correct)
	const options = shuffle([correct, ...distractors])

	return { correct, options }
}

export const computeAccuracy = (score: ScoreSnapshot): number => {
	if (score.totalGames === 0) {
		return 0
	}
	const percentage = (score.correctAnswers / score.totalGames) * 100
	return Math.round(percentage * ACCURACY_PRECISION) / ACCURACY_PRECISION
}

export const clampRecentHistory = (
	recentCorrectCodes: readonly string[],
	newCode: string,
	limit: number = HISTORY_LIMIT,
): string[] => {
	const deduped = [newCode, ...recentCorrectCodes.filter(code => code !== newCode)]
	return deduped.slice(0, limit)
}

export const updateScore = (score: ScoreSnapshot, result: RoundResult, playedAt: number): ScoreSnapshot => {
	const isCorrect = result === 'correct'
	const totalGames = score.totalGames + 1
	const correctAnswers = score.correctAnswers + (isCorrect ? 1 : 0)
	const currentStreak = isCorrect ? score.currentStreak + 1 : 0
	const bestStreak = Math.max(score.bestStreak, currentStreak)

	return {
		totalGames,
		correctAnswers,
		currentStreak,
		bestStreak,
		lastPlayedAt: new Date(playedAt).toISOString(),
	}
}

export const summarizeRound = (
	previousScore: ScoreSnapshot,
	round: FlagRound,
	selectedCode: string | null,
	now: number,
): { nextScore: ScoreSnapshot; result: RoundResult } => {
	const isCorrect = selectedCode === round.correct.code
	const result: RoundResult = selectedCode === null ? 'skipped' : isCorrect ? 'correct' : 'incorrect'
	const nextScore = updateScore(previousScore, result, now)
	return { nextScore, result }
}

export const optionsPerRound = OPTIONS_PER_ROUND
