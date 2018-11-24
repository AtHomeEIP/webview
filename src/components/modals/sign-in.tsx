import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import stores from '@store';

interface Props {
	onClose(): any;
}

@observer
export default class SignInModal extends Component<Props> {

	@observable
	private _email = '';
	@observable
	private _password = '';
	@observable
	private _loading = false;
	@observable
	private _error: string | undefined;

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
									{i18nStore.current.signIn}
								</h4>
								<form onSubmit={this.handleSubmit}>
									<div className="field">
										<label htmlFor="email" className="label">
											{i18nStore.current.email}
										</label>
										<input
											id="email" className="input" type="email"
											autoComplete="email" placeholder={`${i18nStore.current.examplePrefix} john.doe@example.com`}
											value={this._email} onChange={this.handleEmailChange}
											required
										/>
									</div>
									<div className="field">
										<label htmlFor="password" className="label">
											{i18nStore.current.password}
										</label>
										<input
											id="password" className="input" type="password"
											autoComplete="current-password" placeholder="********"
											value={this._password} onChange={this.handlePasswordChange}
											required
										/>
									</div>
									<div className="field is-grouped is-grouped-centered">
										<div className="control">
											<button className="button is-primary" type="submit">
												{i18nStore.current.connect}
											</button>
										</div>
									</div>
									{error}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>,
			document.body,
		);
	}

	@action.bound
	private handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		this._email = event.target.value;
	}

	@action.bound
	private handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		this._password = event.target.value;
	}

	@action.bound
	private async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		const { onClose } = this.props;
		const { auth: authStore } = stores;

		event.preventDefault();

		this._loading = true;
		try {
			await authStore.signIn(this._email, this._password);
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
