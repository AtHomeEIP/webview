import { action, computed, observable } from 'mobx';

import { LanguageDefinition, Languages } from '@i18n';

export default class I18nStore {

	@observable
	private _language: Languages | undefined;
	@observable
	private _languages: Map<Languages, LanguageDefinition> = new Map();

	@computed
	get current() {
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
	get language() {
		return this._language;
	}

	@action.bound
	register(language: Languages, definition: LanguageDefinition) {
		this._languages.set(language, definition);
	}

	@action.bound
	use(language: Languages) {
		this._language = language;
	}
}
