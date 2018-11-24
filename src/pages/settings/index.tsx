import { Language } from '@store/i18n';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import Menu from '@components/menu';
import Connected from '@pages/settings/connected';
import NotConnected from '@pages/settings/not-connected';
import stores from '@store';

@observer
class Settings extends Component {

	public render() {
		const { auth: authStore, i18n: i18nStore } = stores;

		const AuthInfo = authStore.isConnected
			? <Connected/>
			: <NotConnected/>;

		return (
			<>
				<Menu/>
				<div className="section">
					{AuthInfo}
					<label htmlFor="language" className="label">
						{i18nStore.current.language}
					</label>
					<div className="select is-fullwidth">
						<select id="language" value={i18nStore.language} onChange={this.handleLanguageChange}>
							<option value={Language.EN}>{i18nStore.current.english}</option>
							<option value={Language.FR}>{i18nStore.current.french}</option>
						</select>
					</div>
				</div>
			</>
		);
	}

	@action.bound
	private handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const { i18n: i18nStore } = stores;

		i18nStore.setLanguage(event.target.value as Language);
	}
}

export {
	Settings as default,
};
