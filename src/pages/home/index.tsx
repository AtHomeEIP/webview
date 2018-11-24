import { observer } from 'mobx-react';
import React, { Component } from 'react';

import Menu from '@components/menu';
import ModulesList from '@pages/home/modules-list';
import stores from '@store';

@observer
class Home extends Component {

	public render() {
		const { modules: modulesStore } = stores;

		return (
			<>
				<Menu/>
				<div className="section">
					<ModulesList modules={modulesStore.modules}/>
				</div>
			</>
		);
	}
}

export {
	Home as default,
};
