import { createBrowserHistory } from 'history';
import { reaction } from 'mobx';
import { syncHistoryWithStore } from 'mobx-react-router';
import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';
import { render } from 'react-dom';
import { Redirect, Route, Router, Switch } from 'react-router';

import EN from '@langs/en';
import FR from '@langs/fr';
import Home from '@pages/home';
import Module from '@pages/module';
import Settings from '@pages/settings';
import stores from '@store';
import { Language } from '@store/i18n';

const { i18n: i18nStore, router: routerStore } = stores;

reaction(() => i18nStore.language, (language) => {
	moment.locale(language);
});

i18nStore.addLanguage(Language.EN, EN);
i18nStore.addLanguage(Language.FR, FR);

if (window.navigator.language.startsWith('fr')) {
	i18nStore.setLanguage(Language.FR);
} else {
	i18nStore.setLanguage(Language.EN);
}

const history = createBrowserHistory();
const syncedHistory = syncHistoryWithStore(history, routerStore);

render(
	<Router history={syncedHistory}>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route exact path="/modules/:id" component={Module}/>
			<Route exact path="/settings" component={Settings}/>
			<Redirect to="/"/>
		</Switch>
	</Router>,
	document.querySelector('#root'),
);

// TODO: module details (description, samples, ...)
// TODO: i18n for errors
// TODO: add button in settings to change language
// TODO: persist language selection ?
// TODO: find why the refresh-token is not kept
