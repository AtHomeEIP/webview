import { action, computed, observable } from 'mobx';

export enum Language {
	EN = 'en',
	FR = 'fr',
}

export interface LanguageDefinition {
	bedroom: string;
	connect: string;
	disclaimer: string;
	editInformation: string;
	email: string;
	english: string;
	examplePrefix: string;
	french: string;
	home: string;
	kitchen: string;
	language: string;
	livingRoom: string;
	location: string;
	moduleNameExample: string;
	moduleNotFound: string;
	name: string;
	password: string;
	paswordDisclaimer: string;
	oops: string;
	register: string;
	save: string;
	settings: string;
	signIn: string;
	signOut: string;
	signUp: string;
	updateModule: string;
}

export default class I18nStore {

	@observable
	private _language: Language | undefined;
	@observable
	private _languages: Map<Language, LanguageDefinition> = new Map();

	@computed
	public get current() {
		if (this._language == null) {
			throw new Error('Language not set');
		}
		const definition = this._languages.get(this._language);
		if (definition == null) {
			throw new Error('Language definition not set');
		}
		return definition;
	}

	@computed
	public get language() {
		return this._language;
	}

	@action.bound
	public addLanguage(language: Language, definition: LanguageDefinition) {
		this._languages.set(language, definition);
	}

	@action.bound
	public setLanguage(language: Language) {
		this._language = language;
	}
}
