// cSpell: disable
const form = {
	email: 'e-mail',
	name: 'nome',
	password: 'senha',
	confirm_password: 'confirmar senha',
} as const

const auth = {
	sign_in: 'entrar',
	login_with: 'entrar com',
	sign_up: 'cadastrar',
	sign_out: 'sair',
	create_account: 'criar conta',
	forgot_password: 'esqueci a senha',
	reset_password: 'redefinir senha',
	update_password: 'atualizar senha',
	already_have_account: 'já tem uma conta?',
	need_account: 'precisa de uma conta?',
	back_to_sign_in: 'voltar para entrar',
} as const

export const ptBr = {
	...form,
	...auth,
	dashboard: 'painel',
}

export default ptBr
