import { observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';

import stores from '@store';
import Menu from '@ui/components/menu';

import ModulesList from './modules-list';

@observer
export default class Home extends Component {

	componentDidMount() {
		stores.modules.loadModulesList();
	}

	render() {
		return (
			<Fragment>
				<Menu/>
				<div className="section">
					<ModulesList modules={stores.modules.modules}/>
				</div>
			</Fragment>
		);
	}
}
