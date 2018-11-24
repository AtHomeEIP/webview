import decodeJwt from 'jwt-decode';
import { action, computed, observable, reaction } from 'mobx';

import { accessToken$, refreshAccessToken, signIn, signOut, signUp } from '@api';
import { AccessTokenData, User } from '@api/types';

export default class AuthStore {

	@observable
	protected _user: User | undefined;

	public constructor() {
		reaction(() => accessToken$.get(), (token) => {
			this._user = token == null ? undefined : decodeJwt<AccessTokenData>(token).user;
		});
		refreshAccessToken().catch(() => {
			// Empty catch here because there is chances that the user is not connected
		});
	}

	@computed
	public get isConnected() {
		return this._user != null;
	}

	@computed
	public get user() {
		return this._user;
	}

	@action.bound
	public async signIn(email: string, password: string) {
		try {
			await signIn(email, password);
		} catch (error) {
			switch (error) {
				case signIn.errors.INVALID_CREDENTIALS:
					throw 'Invalid credentials';
				case signIn.errors.ACCOUNT_NOT_FOUND:
					throw 'Account not found';
				default:
					throw 'Unknwon error';
			}
		}
	}

	@action.bound
	public async signUp(email: string, password: string, name: string) {
		try {
			await signUp(email, password, name);
		} catch (error) {
			switch (error) {
				case signUp.errors.ACCOUNT_EXISTS:
					throw 'A user account already exists with this email address';
				default:
					throw 'Unknwon error';
			}
		}
	}

	@action.bound
	public async signOut() {
		try {
			await signOut();
		} catch (error) {
			throw 'Unknown error';
		}
	}
}
