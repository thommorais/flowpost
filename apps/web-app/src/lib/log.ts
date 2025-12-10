import { ENVS } from '_/constants'
import inspect from 'object-inspect'

const Reset = '\x1b[0m'
const Bright = '\x1b[1m'
const FgBlack = '\x1b[30m'
const FgWhite = '\x1b[37m'
const BgRed = '\x1b[41m'
const BgGreen = '\x1b[42m'
const BgYellow = '\x1b[43m'
const BgBlue = '\x1b[44m'

export const log = {
	ok: (...message: unknown[]) => {
		if (!ENVS.IS_DEV) {
			return null
		}

		if (ENVS.IS_CLIENT) {
			const styles = ['color: black', 'background: #348034'].join(';')
			console.log('%c%s', styles, inspect(message, { indent: 2, numericSeparator: true }))
			return null
		}

		console.log(
			`${Bright}${BgGreen}${FgWhite}%s${Reset}`,
			` ${inspect(message, { indent: 2, numericSeparator: true })} `,
		)
	},

	info: (...message: unknown[]) => {
		if (!ENVS.IS_DEV) {
			return null
		}
		if (ENVS.IS_CLIENT) {
			console.log(inspect(message, { indent: 2, numericSeparator: true }))
			return null
		}

		console.log(
			`${Bright}${BgBlue}${FgWhite}%s${Reset}`,
			` ${inspect(message, { indent: 2, numericSeparator: true })} `,
		)
	},

	warn: (...message: unknown[]) => {
		if (!ENVS.IS_DEV) {
			return null
		}
		if (ENVS.IS_CLIENT) {
			const styles = ['color: black', 'background: #E7A640'].join(';')
			console.log('%c%s', styles, inspect(message, { indent: 2, numericSeparator: true }))
			return null
		}
		console.log(
			`${Bright}${BgYellow}${FgBlack}%s${Reset}`,
			` ⚠ ${inspect(message, { indent: 2, numericSeparator: true })} `,
		)
	},
	error: (...message: unknown[]) => {
		if (!ENVS.IS_DEV) {
			return null
		}
		if (ENVS.IS_CLIENT) {
			const styles = ['color: white', 'background: #CF1803'].join(';')
			console.log('%c%s', styles, inspect(message, { indent: 2, numericSeparator: true }))
			return null
		}

		console.log(`${Bright}${BgRed}${FgWhite}%s${Reset}`, inspect(message, { indent: 2, numericSeparator: true }))
	},
}
