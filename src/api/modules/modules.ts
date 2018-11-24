import { cloudClient } from '@api';
import { Module, ModuleSample } from '@api/types';

// Fetch module

function buildFetchModuleQuery(id: string) {
	return `{
		module: getModuleById(id: ${id}) {
			id
			type
			vendor
			mac
			name
			location
			thresholds {
				current
			}
		}
	}`;
}

async function fetchModule(id: string): Promise<Module> {
	try {
		const query = buildFetchModuleQuery(id);
		const { data: { data } } = await cloudClient.post('/', { query });
		return data.module;
	} catch (error) {
		throw fetchModule.errors.UNKNOWN_ERROR;
	}
}

fetchModule.errors = {
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Fetch module samples

function buildFetchModuleSamplesQuery(id: string, offset: number, limit: number) {
	return `{
		samples: getModuleById(id: ${id}) {
			samples(offset: ${offset}, limit: ${limit}) {
				date
				payload
			}
		}
	}`;
}

async function fetchModuleSamples(id: string, offset: number = 0, limit: number = 10): Promise<ModuleSample[]> {
	try {
		const query = buildFetchModuleSamplesQuery(id, offset, limit);
		const { data: { data } } = await cloudClient.post('/', { query });
		return data.samples;
	} catch (error) {
		throw fetchModuleSamples.errors.UNKNOWN_ERROR;
	}
}

fetchModuleSamples.errors = {
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Fetch modules

function buildFetchModulesQuery() {
	return `{
		modules: allModules {
			id
			type
			name
			location
		}
	}`;
}

async function fetchModules(): Promise<Module[]> {
	try {
		const query = buildFetchModulesQuery();
		const { data: { data } } = await cloudClient.post('/', { query });
		return data.modules;
	} catch (error) {
		throw fetchModules.errors.UNKNOWN_ERROR;
	}
}

fetchModules.errors = {
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Update module

function buildUpdateModuleQuery(module: Module) {
	const { id, name, location, thresholds } = module;
	return `mutation {
		id: updateModule(id: ${id}, name: ${name}, location: ${location}, thresholds: ${thresholds}) {
			id
		}
	}`;
}

async function updateModule(module: Module): Promise<string> {
	try {
		const query = buildUpdateModuleQuery(module);
		const { data: { data } } = await cloudClient.post('/', { query });
		return data.id;
	} catch (error) {
		throw updateModule.errors.UNKNOWN_ERROR;
	}
}

updateModule.errors = {
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

export {
	fetchModule,
	fetchModuleSamples,
	fetchModules,
	updateModule,
};
