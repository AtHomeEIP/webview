import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { Module } from '@api/types';
import stores from '@store';

interface Props {
	module: Module;
	onClose(): any;
}

@observer
class EditModule extends Component<Props> {

	@observable
	private _location: string;
	@observable
	private _name: string;
	@observable
	private _loading = false;
	@observable
	private _error: string | undefined;

	public constructor(props: Props) {
		super(props);

		const { module } = props;

		this._location = module.location;
		this._name = module.name;
	}

	public render() {
		const { onClose } = this.props;
		const { i18n: i18nStore } = stores;

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
									{i18nStore.current.updateModule}
								</h4>
								<form onSubmit={this.handleSubmit}>
									<div className="field">
										<label htmlFor="name" className="label">
											{i18nStore.current.name}
										</label>
										<input
											id="name" className="input" type="text"
											autoComplete="off" placeholder={`${i18nStore.current.examplePrefix} ${i18nStore.current.moduleNameExample}`}
											value={this._name} onChange={this.handleNameChange}
											required
										/>
									</div>
									<div className="field">
										<label htmlFor="location" className="label">
											{i18nStore.current.location}
										</label>
										<div className="select is-fullwidth">
											<select id="location" value={this._location} onChange={this.handleLocationChange} required>
												<option value="Chambre">{i18nStore.current.bedroom}</option>
												<option value="Cuisine">{i18nStore.current.kitchen}</option>
												<option value="Salon">{i18nStore.current.livingRoom}</option>
											</select>
										</div>
									</div>
									<div className="field is-grouped is-grouped-centered">
										<div className="control">
											<button className="button is-primary" type="submit">
												{i18nStore.current.save}
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
	private handleLocationChange(event: React.ChangeEvent<HTMLSelectElement>) {
		this._location = event.target.value;
	}

	@action.bound
	private handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		this._name = event.target.value;
	}

	@action.bound
	private async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		const { module, onClose } = this.props;
		const { modules: modulesStore } = stores;

		event.preventDefault();

		this._loading = true;
		try {
			await modulesStore.updateModule({
				...module,
				name: this._name,
				location: this._location,
			});
			onClose();
		} catch (error) {
			this._error = error;
			this._loading = false;
		}
	}

	@action.bound
	private resetError() {
		this._error = undefined;
	}
}

export {
	EditModule as default,
};

// TODO: i18n
