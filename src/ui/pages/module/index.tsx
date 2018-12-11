import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';

import stores from '@store';
import Menu from '@ui/components/menu';
import EditModuleModal from '@ui/components/modals/edit-module';
import ModuleIcon from '@ui/components/module-icon';
import ModuleNotFound from '@ui/components/module-not-found';

interface RouteParams {
	id: string;
}

@observer
export default class Module extends Component<RouteComponentProps<RouteParams>> {

	@observable
	private _showEditModal = false;

	@action.bound
	private closeEditModal() {
		this._showEditModal = false;
	}

	componentDidMount() {
		const { id } = this.props.match.params;

		stores.modules.loadModuleInfo(id);
	}

	@action.bound
	private openEditModal() {
		this._showEditModal = true;
	}

	render() {
		const { id: moduleId } = this.props.match.params;

		const module = stores.modules.modules.find((m) => m.id === moduleId);

		if (module == null) {
			return <ModuleNotFound/>;
		}

		let editModal;
		if (this._showEditModal) {
			editModal = <EditModuleModal module={module} onClose={this.closeEditModal}/>;
		}

		return (
			<Fragment>
				{editModal}
				<Menu/>
				<div className="section">
					<div className="container">
						<article className="media">
							<figure className="media-left">
								<div className="icon is-large">
									<ModuleIcon moduleType={module.type}/>
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
										{stores.i18n.current.actions.editInformation}
									</span>
								</button>
							</div>
						</article>
					</div>
				</div>
			</Fragment>
		);
	}
}
