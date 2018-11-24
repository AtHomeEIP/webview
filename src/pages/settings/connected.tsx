import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import stores from '@store';

@observer
class Connected extends Component {

	@observable
	private _loading = false;
	@observable
	private _error: string | undefined;

	public render() {
		const { auth: authStore, i18n: i18nStore } = stores;

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

		return (
			<>
				{loader}
				<strong className="has-text-centered" style={{ display: 'block' }}>
					{authStore.user!.name}
				</strong>
				<small className="has-text-centered" style={{ display: 'block' }}>
					{authStore.user!.email}
				</small>
				<div className="level">
					<div className="level-item">
						<button className="button is-danger is-outlined" onClick={this.signOut} style={{ marginTop: '1rem' }}>
							{i18nStore.current.signOut}
						</button>
					</div>
				</div>
				{error}
			</>
		);
	}

	@action.bound
	private resetError() {
		this._error = undefined;
	}

	@action.bound
	private async signOut() {
		const { auth: authStore } = stores;

		this._loading = true;
		try {
			await authStore.signOut();
		} catch (error) {
			this._error = error;
			this._loading = false;
		}
	}
}

export {
	Connected as default,
};
