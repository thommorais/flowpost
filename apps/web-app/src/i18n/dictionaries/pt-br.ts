// cSpell: disable
const form = {
	email: 'e-mail',
	name: 'nome',
	password: 'senha',
	confirm_password: 'confirmar senha',
	sort_by: 'ordenar por',
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

const flagsGame = {
	// Start Screen
	flags_guessing_game: 'Jogo de Adivinhar Bandeiras',
	test_geography_knowledge: 'Teste seus conhecimentos de geografia! Adivinhe o país pela bandeira.',
	how_many_flags_play: 'Quantas bandeiras você quer jogar?',
	start_game: 'Iniciar Jogo',
	flags: 'bandeiras',
	all_flags: 'Todas as {count} bandeiras',

	// End Screen
	session_complete: 'Sessão Completa!',
	you_got: 'Você acertou',
	correct: 'corretas',
	errors: 'erros',
	accuracy: 'precisão',
	play_again: 'Jogar Novamente',

	// Game UI
	scoreboard: 'Placar',
	which_country_flag: 'De qual país é esta bandeira?',
	session_progress: 'Progresso da Sessão',
	total_rounds: 'Total de rodadas',
	current_streak: 'Sequência Atual',
	best_streak: 'Melhor Sequência',
	overall_accuracy: 'Precisão Geral',
	last_played: 'Última jogada',

	// Feedback
	take_best_guess: 'Faça seu melhor palpite.',
	correct_nice_work: 'Correto! Bom trabalho.',
	not_quite: 'Não foi dessa vez. Estude os detalhes e continue tentando.',
	round_skipped: 'Rodada pulada. Tente a próxima.',
	correct_answer_locked: 'Resposta correta confirmada.',
	correct_answer: 'Resposta correta',
	skipped_flag_belongs: 'Pulado. A bandeira pertence a',

	// Instructions
	how_to_play: 'Como jogar',
	keyboard_navigate: 'Use as setas ou Tab para navegar, Enter para selecionar',
	keyboard_skip: 'Escape pula a rodada ou avança para a próxima',
	streak_resets: 'A sequência reinicia em respostas incorretas ou puladas',

	// Actions
	skip_round: 'Pular rodada (Esc)',
	next_round: 'Próxima rodada',
	retry_image: 'Tentar novamente',
	flag_unavailable: 'Bandeira indisponível',

	// Warnings
	loading_saved_progress: 'Carregando progresso salvo…',
	loading_game: 'Carregando jogo...',
} as const

export const ptBr = {
	...form,
	...auth,
	...flagsGame,
	todo: 'tarefa',
	add_task: 'adicionar tarefa',
	new_task: 'nova tarefa',
	dashboard: 'painel',
}

export default ptBr
