import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import Menu from '@components/menu';
import ModuleNotFound from '@components/module-not-found';
import EditModuleModal from '@pages/module/edit-module';
import stores from '@store';

@observer
class Module extends Component<RouteComponentProps<{ id: string }>> {

	@observable
	private _showEditModal = false;

	public render() {
		const { id: moduleId } = this.props.match.params;
		const { i18n: i18nStore, modules: modulesStore } = stores;

		const module = modulesStore.modules.find((m) => m.id === moduleId);

		if (module == null) {
			return <ModuleNotFound/>;
		}

		let editModal;
		if (this._showEditModal) {
			editModal = <EditModuleModal module={module} onClose={this.closeEditModal}/>;
		}

		return (
			<>
				{editModal}
				<Menu/>
				<div className="section">
					<div className="container">
						<article className="media">
							<figure className="media-left">
								<div className="icon is-large">
									<span className="far fa-2x fa-lightbulb"/>
								</div>
							</figure>
							<div className="media-content">
								<h4 className="title is-4">
									{module.name}
								</h4>
								<h6 className="subtitle is-6">
									{module.type}
								</h6>
								<button className="button is-link" onClick={this.openEditModal}>
									<span className="icon">
										<span className="fas fa-pen"/>
									</span>
									<span>
										{i18nStore.current.editInformation}
									</span>
								</button>
							</div>
						</article>
					</div>
				</div>
			</>
		);
	}

	@action.bound
	private closeEditModal() {
		this._showEditModal = false;
	}

	@action.bound
	private openEditModal() {
		this._showEditModal = true;
	}
}

export {
	Module as default,
};
