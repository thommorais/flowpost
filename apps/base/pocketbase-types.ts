/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	CardsDecks = "cards_decks",
	FlashcardsCards = "flashcards_cards",
	FlashcardsDecks = "flashcards_decks",
	FlashcardsDecksColors = "flashcards_decks_colors",
	FlashcardsLeitnerBoxes = "flashcards_leitner_boxes",
	FlashcardsSessions = "flashcards_sessions",
	FlashcardsStats = "flashcards_stats",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type CardsDecksRecord = {
	card_id?: RecordIdString
	created: IsoAutoDateString
	deck_id: RecordIdString
	id: string
	updated: IsoAutoDateString
}

export enum FlashcardsCardsAnswerTypeOptions {
	"multiple_choice" = "multiple_choice",
	"short_answer" = "short_answer",
}

export enum FlashcardsCardsStatusOptions {
	"draft" = "draft",
	"published" = "published",
}
export type FlashcardsCardsRecord<Tanswers = unknown> = {
	answer_type?: FlashcardsCardsAnswerTypeOptions
	answers: null | Tanswers
	created: IsoAutoDateString
	creator_id: RecordIdString
	difficulty_level?: number
	id: string
	question: string
	status: FlashcardsCardsStatusOptions
	updated: IsoAutoDateString
}

export type FlashcardsDecksRecord = {
	color?: RecordIdString
	created: IsoAutoDateString
	creator_id?: RecordIdString
	description?: string
	id: string
	is_public?: boolean
	slug: string
	title?: string
	updated: IsoAutoDateString
}

export type FlashcardsDecksColorsRecord = {
	created: IsoAutoDateString
	hex: string
	id: string
	updated: IsoAutoDateString
}

export enum FlashcardsLeitnerBoxesBoxLevelOptions {
	"E1" = "1",
	"E2" = "2",
	"E3" = "3",
	"E4" = "4",
	"E5" = "5",
	"E6" = "6",
	"E7" = "7",
}
export type FlashcardsLeitnerBoxesRecord = {
	box_level: FlashcardsLeitnerBoxesBoxLevelOptions
	card_deck_id: RecordIdString
	created: IsoAutoDateString
	id: string
	last_reviewed?: IsoDateString
	next_review_date?: IsoDateString
	updated: IsoAutoDateString
	user_id: RecordIdString
}

export type FlashcardsSessionsRecord = {
	completed_at?: IsoDateString
	created: IsoAutoDateString
	creator_id: RecordIdString
	deck_id: RecordIdString
	id: string
	is_multiplayer?: boolean
	title: string
	updated: IsoAutoDateString
}

export type FlashcardsStatsRecord = {
	answered?: string
	card_id?: RecordIdString
	correct?: boolean
	created: IsoAutoDateString
	id: string
	session_id: RecordIdString
	updated: IsoAutoDateString
	user_id?: RecordIdString
}

export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type CardsDecksResponse<Texpand = unknown> = Required<CardsDecksRecord> & BaseSystemFields<Texpand>
export type FlashcardsCardsResponse<Tanswers = unknown, Texpand = unknown> = Required<FlashcardsCardsRecord<Tanswers>> & BaseSystemFields<Texpand>
export type FlashcardsDecksResponse<Texpand = unknown> = Required<FlashcardsDecksRecord> & BaseSystemFields<Texpand>
export type FlashcardsDecksColorsResponse<Texpand = unknown> = Required<FlashcardsDecksColorsRecord> & BaseSystemFields<Texpand>
export type FlashcardsLeitnerBoxesResponse<Texpand = unknown> = Required<FlashcardsLeitnerBoxesRecord> & BaseSystemFields<Texpand>
export type FlashcardsSessionsResponse<Texpand = unknown> = Required<FlashcardsSessionsRecord> & BaseSystemFields<Texpand>
export type FlashcardsStatsResponse<Texpand = unknown> = Required<FlashcardsStatsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	cards_decks: CardsDecksRecord
	flashcards_cards: FlashcardsCardsRecord
	flashcards_decks: FlashcardsDecksRecord
	flashcards_decks_colors: FlashcardsDecksColorsRecord
	flashcards_leitner_boxes: FlashcardsLeitnerBoxesRecord
	flashcards_sessions: FlashcardsSessionsRecord
	flashcards_stats: FlashcardsStatsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	cards_decks: CardsDecksResponse
	flashcards_cards: FlashcardsCardsResponse
	flashcards_decks: FlashcardsDecksResponse
	flashcards_decks_colors: FlashcardsDecksColorsResponse
	flashcards_leitner_boxes: FlashcardsLeitnerBoxesResponse
	flashcards_sessions: FlashcardsSessionsResponse
	flashcards_stats: FlashcardsStatsResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
