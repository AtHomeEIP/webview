import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { Module } from '@api/types';

import ModulesListItem from './modules-list-item';

interface Props {
	modules: Module[];
}

@observer
export default class ModulesList extends Component<Props> {

	render() {
		const { modules } = this.props;

		return modules.map((module) => (
			<ModulesListItem key={module.id} module={module}/>
		));
	}
}
