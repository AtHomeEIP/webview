export interface Module {
	id: string;
	name: string;
	type: ModuleType;
	location: string;
	mac: string;
	vendor: string;
	samples: ModuleSample[];
}

export interface ModuleSample {
	date: Date;
	payload: string;
}

export type ModuleType =
	'atmospherics'
	| 'hygrometer'
	| 'luxmeter'
	| 'thermometer';
