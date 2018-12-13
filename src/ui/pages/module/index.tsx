import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';

import stores from '@store';
import Menu from '@ui/components/menu';
import EditModuleModal from '@ui/components/modals/edit-module';
import ModuleIcon from '@ui/components/module-icon';
import ModuleNotFound from '@ui/components/module-not-found';
import SamplesList from '@ui/pages/module/samples-list';

interface RouteParams {
	id: string;
}

@observer
export default class Module extends Component<RouteComponentProps<RouteParams>> {

	@observable
	private _isLoading = true;
	@observable
	private _showEditModal = false;

	@action.bound
	private closeEditModal() {
		this._showEditModal = false;
	}

	async componentDidMount() {
		const { id } = this.props.match.params;

		await stores.modules.loadModuleInfo(id);
		this._isLoading = false;
	}

	@action.bound
	private openEditModal() {
		this._showEditModal = true;
	}

	render() {
		if (this._isLoading) {
			return <div className="pageloader is-link is-active"/>;
		}

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
					<div className="container" style={{ marginTop: '1.5rem' }}>
						<h4 className="title is-4">
							{stores.i18n.current.samples}
						</h4>
						<SamplesList samples={module.samples} thresholds={module.thresholds}/>
					</div>
				</div>
			</Fragment>
		);
	}
}
