import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { MODULE_NOT_FOUND } from '@api/errors';
import stores from '@store';

@observer
export default class ModuleNotFound extends Component {

	render() {
		return (
			<div className="section">
				<h4 className="title is-4 has-text-centered">
					{stores.i18n.current.oops}...
				</h4>
				<h6 className="subtitle is-6 has-text-centered has-text-grey">
					{stores.i18n.current.errors[MODULE_NOT_FOUND]}
				</h6>
				<div className="buttons is-centered">
					<Link className="button is-link" to="/">
						{stores.i18n.current.pages.home}
					</Link>
				</div>
			</div>
		);
	}
}
