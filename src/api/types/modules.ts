export interface Module {
	id: string;
	name: string;
	type: ModuleType;
	location: string;
	mac: string;
	vendor: string;
	samples: ModuleSample[];
	thresholds: ModuleThreshold[];
}

export interface ModuleSample {
	date: Date;
	payload: string;
}

export interface ModuleThreshold {
	name: string;
	current: number;
	min: number;
	max: number;
	default: number;
}

export type ModuleType =
	'atmospherics'
	| 'hygrometer'
	| 'luxmeter'
	| 'thermometer';
