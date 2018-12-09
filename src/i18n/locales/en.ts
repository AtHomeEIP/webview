import * as apiErrors from '@api/errors';

import { LanguageDefinition } from '../types';

const DEFINITION: LanguageDefinition = {
	actions: {
		editInformation: 'Edit information',
		save: 'Save',
	},
	autoUpdateModulesList: 'Auto-update modules list',
	autoUpdateModulesListEnabled: 'Enabled',
	autoUpdateModulesListDisabled: 'Disabled',
	errors: {
		[apiErrors.MODULE_NOT_FOUND]: 'Module not found',
		[apiErrors.UNKNOWN_ERROR]: 'An unknown error occurred. Please try again later',
	},
	examples: {
		moduleName: `eg. Kitchen's module`,
	},
	language: 'Language',
	languages: {
		english: 'English',
		french: 'French',
	},
	location: 'Location',
	locations: {
		bedroom: 'Bedroom',
		kitchen: 'Kitchen',
		livingRoom: 'Living room',
	},
	moduleName: 'Module name',
	oops: 'Oops',
	pages: {
		home: 'Home',
		settings: 'Settings',
	},
	updateModule: 'Update module',
};

export default DEFINITION;
