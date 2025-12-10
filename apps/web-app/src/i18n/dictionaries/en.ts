// cSpell: disable

import type { Dictionary } from './types'

const form = {
	email: 'e-mail',
	name: 'name',
	password: 'password',
	confirm_password: 'confirm password',
} as const

const auth = {
	sign_in: 'sign in',
	login_with: 'login with',
	sign_up: 'sign up',
	sign_out: 'sign out',
	create_account: 'create account',
	forgot_password: 'forgot password',
	reset_password: 'reset password',
	update_password: 'update password',
	already_have_account: 'already have an account?',
	need_account: 'need an account?',
	back_to_sign_in: 'back to sign in',
} as const

export const en: Dictionary = {
	...form,
	...auth,
	dashboard: 'dashboard',
}

export default en
