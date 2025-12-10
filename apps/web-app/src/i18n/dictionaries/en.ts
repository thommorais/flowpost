// cSpell: disable

import type { Dictionary } from './types'

const form = {
	email: 'e-mail',
	name: 'name',
	password: 'password',
	confirm_password: 'confirm password',
	sort_by: 'sort by',
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

const flagsGame = {
	// Start Screen
	flags_guessing_game: 'Flags Guessing Game',
	test_geography_knowledge: 'Test your geography knowledge! Guess the country by its flag.',
	how_many_flags_play: 'How many flags do you want to play?',
	start_game: 'Start Game',
	flags: 'flags',
	all_flags: 'All {count} flags',

	// End Screen
	session_complete: 'Session Complete!',
	you_got: 'You got',
	correct: 'correct',
	errors: 'errors',
	accuracy: 'accuracy',
	play_again: 'Play Again',

	// Game UI
	scoreboard: 'Scoreboard',
	which_country_flag: 'Which country does this flag belong to?',
	session_progress: 'Session Progress',
	total_rounds: 'Total rounds',
	current_streak: 'Current Streak',
	best_streak: 'Best Streak',
	overall_accuracy: 'Overall Accuracy',
	last_played: 'Last played',

	// Feedback
	take_best_guess: 'Take your best guess.',
	correct_nice_work: 'Correct! Nice work.',
	not_quite: 'Not quite. Study the details and keep going.',
	round_skipped: 'Round skipped. Try the next one.',
	correct_answer_locked: 'Correct answer locked in.',
	correct_answer: 'Correct answer',
	skipped_flag_belongs: 'Skipped. The flag belongs to',

	// Instructions
	how_to_play: 'How to play',
	keyboard_navigate: 'Arrow keys or Tab to navigate options, Enter to select',
	keyboard_skip: 'Escape skips the round or moves to the next one',
	streak_resets: 'Streak resets on incorrect or skipped answers',

	// Actions
	skip_round: 'Skip round (Esc)',
	next_round: 'Next round',
	retry_image: 'Retry image',
	flag_unavailable: 'Flag unavailable',

	// Warnings
	loading_saved_progress: 'Loading saved progress…',
	loading_game: 'Loading game...',
}

export const en: Dictionary = {
	...form,
	...auth,
	...flagsGame,
	todo: 'todo',
	add_task: 'add task',
	new_task: 'new task',
	dashboard: 'dashboard',
}

export default en
