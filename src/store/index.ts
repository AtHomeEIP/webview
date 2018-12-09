import { RouterStore } from 'mobx-react-router';

import I18nStore from './i18n';
import ModulesStore from './modules';

export default {
	i18n: new I18nStore(),
	modules: new ModulesStore(),
	router: new RouterStore(),
};
