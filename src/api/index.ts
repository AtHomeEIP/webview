import axios from 'axios';

import { refreshAccessToken } from '@api/modules/auth';

export const authClient = axios.create({
	baseURL: 'https://woodbox.io:3001/auth',
	withCredentials: true,
});
export const cloudClient = axios.create({
	baseURL: 'https://woodbox.io:1234/graphql',
});

cloudClient.interceptors.response.use(undefined, async (error) => {
	const { config, response: { status } } = error;

	if (status === 401) {
		await refreshAccessToken();
		await cloudClient.request(config);
	} else {
		throw error;
	}
});

export * from '@api/modules/auth';
export * from '@api/modules/modules';
