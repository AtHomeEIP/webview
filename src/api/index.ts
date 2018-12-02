import axios from 'axios';

import * as apiErrors from './errors';
import { Module } from './types';

export const dataClient = axios.create({
	baseURL: 'http://192.168.4.1:8080/graphql',
});

function buildFetchModuleQuery(id: string, offset: number, limit: number) {
	return `{
		module: getModuleById(id: "${id}") {
			id
			name
			type
			location
			mac
			vendor
			samples(limit: ${limit}, offset: ${offset}) {
				date
				payload
			}
		}
	}`;
}

function buildFetchModulesQuery() {
	return `{
		modules: allModules {
			id
			name
			type
			location
			mac
			vendor
		}
	}`;
}

function buildUpdateModuleQuery(module: Module) {
	const { id, name, location } = module;
	const convertedLocation = convertModuleLocation(location);

	return `mutation {
		updateModule(id: "${id}", name: "${name}", location: "${convertedLocation}") {
			id
		}
	}`;
}

function convertModuleLocation(location: string) {
	switch (location) {
		case 'Salon':
			return '1';
		case 'Chambre':
			return '2';
		case 'Cuisine':
			return '3';
		default:
			return '4';
	}
}

export async function fetchModule(id: string, offset: number = 0, limit: number = 10): Promise<Module> {
	try {
		const { data: queryData } = await dataClient.post('/', {
			query: buildFetchModuleQuery(id, offset, limit),
		});
		return queryData.data.module;
	} catch (error) {
		throw apiErrors.UNKNOWN_ERROR;
	}
}

export async function fetchModules(): Promise<Module[]> {
	try {
		const { data: queryData } = await dataClient.post('/', {
			query: buildFetchModulesQuery(),
		});
		return queryData.data.modules.map((module: Partial<Module>) => {
			return { ...module, samples: [] };
		});
	} catch (error) {
		throw apiErrors.UNKNOWN_ERROR;
	}
}

export async function updateModule(module: Module) {
	try {
		await dataClient.post('/', {
			query: buildUpdateModuleQuery(module),
		});
	} catch (error) {
		throw apiErrors.UNKNOWN_ERROR;
	}
}
