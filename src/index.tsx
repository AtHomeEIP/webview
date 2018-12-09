import { createBrowserHistory } from 'history';
import { reaction } from 'mobx';
import { syncHistoryWithStore } from 'mobx-react-router';
import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';
import { render } from 'react-dom';
import { Redirect, Route, Router, Switch } from 'react-router';

import { EN, FR, Languages } from '@i18n';
import store from '@store';
import Home from '@ui/pages/home';
import Module from '@ui/pages/module';
import Settings from '@ui/pages/settings';

function createSyncedHistory() {
	return syncHistoryWithStore(
		createBrowserHistory(),
		store.router,
	);
}

function initializeI18nStore() {
	store.i18n.register(Languages.EN, EN);
	store.i18n.register(Languages.FR, FR);

	if (navigator.language.startsWith('fr')) {
		store.i18n.use(Languages.FR);
	} else {
		store.i18n.use(Languages.EN);
	}
}

function syncI18nStoreWithLocalStorage() {
	const localStorageKey = 'language';

	const savedLanguage = localStorage.getItem(localStorageKey);
	if (savedLanguage != null) {
		for (const language of Object.values(Languages)) {
			if (language === savedLanguage) {
				store.i18n.use(language);
				break;
			}
		}
	}

	reaction(() => store.i18n.language, (language) => {
		if (language == null) {
			localStorage.removeItem(localStorageKey);
		} else {
			localStorage.setItem(localStorageKey, language);
		}
	}, {
		fireImmediately: true,
	});
}

function syncI18nStoreWithMoment() {
	reaction(() => store.i18n.language, (language) => {
		if (language != null) {
			moment.locale(language);
		}
	}, {
		fireImmediately: true,
	});
}

initializeI18nStore();
syncI18nStoreWithLocalStorage();
syncI18nStoreWithMoment();

const syncedHistory = createSyncedHistory();

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
