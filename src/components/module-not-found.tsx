import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import stores from '@store';

class ModuleNotFound extends Component {

	public render() {
		const { i18n: i18nStore } = stores;

		return (
			<div className="section">
				<h4 className="title is-4 has-text-centered">
					{i18nStore.current.oops}...
				</h4>
				<h6 className="subtitle is-6 has-text-centered has-text-grey">
					{i18nStore.current.moduleNotFound}
				</h6>
				<div className="buttons is-centered">
					<Link className="button is-link" to="/">
						{i18nStore.current.home}
					</Link>
				</div>
			</div>
		);
	}
}

export {
	ModuleNotFound as default,
};
