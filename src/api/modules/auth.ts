import { observable } from 'mobx';

import { authClient, cloudClient } from '@api';

// Access token

const accessToken$ = observable.box<string | undefined>();

function setAccessToken(token: string) {
	accessToken$.set(token);
	cloudClient.defaults.headers.Authorization = `Bearer ${token}`;
}

function resetAccessToken() {
	accessToken$.set(undefined);
	cloudClient.defaults.headers.Authorization = undefined;
}

// Refresh access token

async function refreshAccessToken() {
	try {
		const { data: token } = await authClient.get<string>('/token');
		setAccessToken(token);
	} catch (error) {
		switch (error.response.status) {
			case 401:
				throw refreshAccessToken.errors.EXPIRED_SESSION;
			case 422:
				throw refreshAccessToken.errors.NO_SESSION;
			default:
				throw refreshAccessToken.errors.UNKNOWN_ERROR;
		}
	}
}

refreshAccessToken.errors = {
	EXPIRED_SESSION: 'EXPIRED_SESSION',
	NO_SESSION: 'NO_SESSION',
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Sign in

async function signIn(email: string, password: string) {
	try {
		const { data: token } = await authClient.post<string>('/sign-in', { email, password });
		setAccessToken(token);
	} catch (error) {
		switch (error.response.status) {
			case 401:
				throw signIn.errors.INVALID_CREDENTIALS;
			case 404:
				throw signIn.errors.ACCOUNT_NOT_FOUND;
			default:
				throw signIn.errors.UNKNOWN_ERROR;
		}
	}
}

signIn.errors = {
	ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
	INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Sign out

async function signOut() {
	try {
		await authClient.post('/sign-out');
	} catch {
		throw signOut.errors.UNKNOWN_ERROR;
	} finally {
		resetAccessToken();
	}
}

signOut.errors = {
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Sign up

async function signUp(email: string, password: string, name: string) {
	try {
		await authClient.post('/sign-up', { email, password, name });
	} catch (error) {
		switch (error.response.status) {
			case 409:
				throw signUp.errors.ACCOUNT_EXISTS;
			default:
				throw signUp.errors.UNKNOWN_ERROR;
		}
	}
}

signUp.errors = {
	ACCOUNT_EXISTS: 'ACCOUNT_EXISTS',
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

export {
	accessToken$,
	refreshAccessToken,
	signIn,
	signOut,
	signUp,
};
