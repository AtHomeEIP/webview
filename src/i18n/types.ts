import * as apiErrors from '@api/errors';

export enum Languages {
	EN = 'en',
	FR = 'fr',
}

export interface LanguageDefinition {
	actions: {
		editInformation: string;
		save: string;
	};
	errors: {
		[apiErrors.MODULE_NOT_FOUND]: string;
		[apiErrors.UNKNOWN_ERROR]: string;
	};
	examples: {
		moduleName: string;
	};
	language: string;
	languages: {
		english: string;
		french: string;
	};
	location: string;
	locations: {
		bedroom: string;
		kitchen: string;
		livingRoom: string;
	};
	moduleName: string;
	oops: string;
	pages: {
		home: string;
		settings: string;
	};
	updateModule: string;
}
