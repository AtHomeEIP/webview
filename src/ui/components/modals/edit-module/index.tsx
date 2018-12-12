import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { createPortal } from 'react-dom';

import { Module, ModuleThreshold } from '@api/types';
import stores from '@store';

import Threshold from './threshold';

interface Props {
	module: Module;
	onClose(): any;
}

@observer
export default class EditModule extends Component<Props> {

	@observable
	private _location: string;
	@observable
	private _name: string;
	@observable
	private _thresholds: ModuleThreshold[];
	@observable
	private _loading = false;
	@observable
	private _error: string | undefined;

	constructor(props: Props) {
		super(props);

		this._location = props.module.location;
		this._name = props.module.name;
		this._thresholds = props.module.thresholds.map((threshold) => ({ ...threshold }));
	}

	@computed
	private get unit() {
		const { module } = this.props;

		return module.type === 'hygrometer'
			? '%'
			: module.type === 'thermometer' ? '°C' : '';
	}

	@action.bound
	private handleLocationChange(event: ChangeEvent<HTMLSelectElement>) {
		this._location = event.target.value;
	}

	@action.bound
	private handleNameChange(event: ChangeEvent<HTMLInputElement>) {
		this._name = event.target.value;
	}

	@action.bound
	private async handleSubmit(event: FormEvent<HTMLFormElement>) {
		const { module, onClose } = this.props;

		event.preventDefault();

		this._loading = true;
		try {
			await stores.modules.updateModule({
				...module,
				name: this._name,
				location: this._location,
				thresholds: this._thresholds,
			});
			await stores.modules.loadModuleInfo(module.id);
			onClose();
		} catch (error) {
			this._error = error;
			this._loading = false;
		}
	}

	render() {
		const { onClose } = this.props;
		const [thresholdMin, thresholdMax] = this._thresholds;

		let loader;
		if (this._loading) {
			loader = <div className="pageloader is-active"/>;
		}

		let error;
		if (this._error != null) {
			error = (
				<div className="notification is-danger">
					<button className="delete" type="button" onClick={this.resetError}/>
					{this._error}
				</div>
			);
		}

		return createPortal(
			<div className="modal is-active">
				{loader}
				<div className="modal-background"/>
				<button className="modal-close is-large" aria-label="close" onClick={onClose}/>
				<div className="modal-content">
					<div className="section">
						<div className="card">
							<div className="card-content">
								<h4 className="title is-4">
									{stores.i18n.current.updateModule}
								</h4>
								<form onSubmit={this.handleSubmit}>
									<div className="field">
										<label htmlFor="name" className="label">
											{stores.i18n.current.moduleName}
										</label>
										<input
											id="name" className="input" type="text"
											autoComplete="off" placeholder={stores.i18n.current.examples.moduleName}
											value={this._name} onChange={this.handleNameChange}
											required
										/>
									</div>
									<div className="field">
										<label htmlFor="location" className="label">
											{stores.i18n.current.location}
										</label>
										<div className="select is-fullwidth">
											<select id="location" value={this._location} onChange={this.handleLocationChange} required>
												<option value="Chambre">
													{stores.i18n.current.locations.bedroom}
												</option>
												<option value="Cuisine">
													{stores.i18n.current.locations.kitchen}
												</option>
												<option value="Salon">
													{stores.i18n.current.locations.livingRoom}
												</option>
											</select>
										</div>
									</div>
									<div className="field">
										<label className="label">
											{stores.i18n.current.thresholds}
										</label>
										<Threshold threshold={thresholdMin} type="min" unit={this.unit}/>
										<Threshold threshold={thresholdMax} type="max" unit={this.unit} min={thresholdMin.current + 1}/>
									</div>
									<div className="field is-grouped is-grouped-centered">
										<div className="control">
											<button className="button is-primary" type="submit">
												{stores.i18n.current.actions.save}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				{error}
			</div>,
			document.body,
		);
	}

	@action.bound
	private resetError() {
		this._error = undefined;
	}
}
