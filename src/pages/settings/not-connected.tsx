import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import SignInModal from '@components/modals/sign-in';
import SignUpModal from '@components/modals/sign-up';
import stores from '@store';

@observer
class NotConnected extends Component {

	@observable
	private _showSignInModal = false;
	@observable
	private _showSignUpModal = false;

	public render() {
		const { i18n: i18nStore } = stores;

		let signInModal;
		if (this._showSignInModal) {
			signInModal = <SignInModal onClose={this.closeSignInModal}/>;
		}

		let signUpModal;
		if (this._showSignUpModal) {
			signUpModal = <SignUpModal onClose={this.closeSignUpModal}/>;
		}

		return (
			<>
				{signInModal}
				{signUpModal}
				<div className="columns is-centered">
					<div className="column is-2-tablet">
						<button className="button is-primary is-fullwidth" onClick={this.openSignInModal}>
							{i18nStore.current.signIn}
						</button>
					</div>
					<div className="is-divider" data-content="OR"/>
					<div className="column is-2-tablet">
						<button className="button is-primary is-fullwidth" onClick={this.openSignUpModal}>
							{i18nStore.current.signUp}
						</button>
					</div>
				</div>
				<p className="has-text-centered has-text-grey" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
					<small>
						<em>
							{i18nStore.current.disclaimer}
						</em>
					</small>
				</p>
			</>
		);
	}

	@action.bound
	private closeSignInModal() {
		this._showSignInModal = false;
	}

	@action.bound
	private closeSignUpModal() {
		this._showSignUpModal = false;
	}

	@action.bound
	private openSignInModal() {
		this._showSignInModal = true;
	}

	@action.bound
	private openSignUpModal() {
		this._showSignUpModal = true;
	}
}

export {
	NotConnected as default,
};
