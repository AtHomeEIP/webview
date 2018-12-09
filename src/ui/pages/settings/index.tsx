import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { ChangeEvent, Component, Fragment } from 'react';

import { Languages } from '@i18n';
import stores from '@store';
import Menu from '@ui/components/menu';

@observer
export default class Settings extends Component {

	@action.bound
	private handleAutoUpdateChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.checked) {
			stores.modules.enableModulesListAutoUpdate();
		} else {
			stores.modules.disableModulesListAutoUpdate();
		}
	}

	@action.bound
	private handleLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
		stores.i18n.use(event.target.value as Languages);
	}

	render() {
		const autoUpdateStatus = stores.modules.hasModulesListAutoUpdateEnabled
			? stores.i18n.current.autoUpdateModulesListEnabled
			: stores.i18n.current.autoUpdateModulesListDisabled;

		return (
			<Fragment>
				<Menu/>
				<div className="section">
					<div className="field">
						<label className="label">
							{stores.i18n.current.autoUpdateModulesList}
						</label>
						<div className="control">
							<input
								id="auto-update" className="switch is-rounded" type="checkbox"
								checked={stores.modules.hasModulesListAutoUpdateEnabled} onChange={this.handleAutoUpdateChange}
							/>
							<label htmlFor="auto-update">
								{autoUpdateStatus}
							</label>
						</div>
					</div>
					<div className="field">
						<label htmlFor="language" className="label">
							{stores.i18n.current.language}
						</label>
						<div className="control">
							<div className="select is-fullwidth">
								<select id="language" value={stores.i18n.language} onChange={this.handleLanguageChange}>
									<option value={Languages.EN}>
										{stores.i18n.current.languages.english}
									</option>
									<option value={Languages.FR}>
										{stores.i18n.current.languages.french}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
