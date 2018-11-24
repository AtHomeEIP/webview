import { RouterStore } from 'mobx-react-router';

import AuthStore from '@store/auth';
import I18nStore from '@store/i18n';
import ModulesStore from '@store/modules';

interface Stores {
	auth: AuthStore;
	i18n: I18nStore;
	modules: ModulesStore;
	router: RouterStore;
}

const stores: Stores = {
	auth: new AuthStore(),
	i18n: new I18nStore(),
	modules: new ModulesStore(),
	router: new RouterStore(),
};

export {
	Stores,
	stores as default,
};
