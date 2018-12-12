import * as apiErrors from '@api/errors';

import { LanguageDefinition } from '../types';

const DEFINITION: LanguageDefinition = {
	actions: {
		editInformation: 'Modifier les informations',
		save: 'Sauvegarder',
	},
	autoUpdateModulesList: 'Mise à jour auto. de la liste des modules',
	autoUpdateModulesListEnabled: 'Activée',
	autoUpdateModulesListDisabled: 'Desactivée',
	errors: {
		[apiErrors.MODULE_NOT_FOUND]: 'Impossible de trouver le module',
		[apiErrors.UNKNOWN_ERROR]: 'Une erreur inconnue est survenue. Veuillez réessayer ultérieurement',
	},
	examples: {
		moduleName: 'ex. Module cuisine',
	},
	language: 'Langue',
	languages: {
		english: 'Anglais',
		french: 'Français',
	},
	location: 'Emplacement',
	locations: {
		bedroom: 'Chambre',
		kitchen: 'Cuisine',
		livingRoom: 'Salon',
	},
	moduleName: 'Nom du module',
	oops: 'Oups',
	pages: {
		home: 'Accueil',
		settings: 'Paramètres',
	},
	thresholds: 'Seuils',
	updateModule: 'Modifier un module',
};

export default DEFINITION;
