import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { Module } from '@api/types';
import ModulesListItem from '@pages/home/modules-list-item';

interface Props {
	modules: Module[];
}

@observer
class ModulesList extends Component<Props> {

	public render() {
		const { modules } = this.props;

		return modules.map((module) => (
			<ModulesListItem key={module.id} module={module}/>
		));
	}
}

export {
	ModulesList as default,
};
