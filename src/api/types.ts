export interface Entity {
	id: string;
}

// Auth

export interface User extends Entity {
	email: string;
	name: string;
}

export interface AccessTokenData {
	user: User;
}

// Module

export type ModuleType = 'atmospherics' | 'hygrometer' | 'luxmeter' | 'thermometer';

export interface ModuleSample {
	date: Date;
	payload: string;
}

export interface ModuleThresholds {
	name: string;
	current: number;
	min: number;
	max: number;
	default: number;
}

export interface Module extends Entity {
	name: string;
	type: ModuleType;
	location: string;
	mac: string;
	vendor: string;
	samples: ModuleSample[];
	thresholds: ModuleThresholds[];
}
