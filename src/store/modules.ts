import { action, computed, observable, ObservableMap } from 'mobx';

import { fetchModules, updateModule } from '@api';
import { Module } from '@api/types';

export default class ModulesStore {

	@observable
	private _error: string | undefined;
	@observable
	private _intervalId: number | undefined;
	@observable
	private _modules: ObservableMap<string, Module> = observable.map();

	@computed
	public get modules(): Module[] {
		return Array.from(this._modules.values());
	}

	@action.bound
	public disableAutoUpdate() {
		if (this._intervalId != null) {
			window.clearInterval(this._intervalId);
			this._intervalId = undefined;
		}
	}

	@action.bound
	public enableAutoUpdate() {
		if (this._intervalId == null) {
			this._intervalId = window.setInterval(this.updateCache, 10_000);
			this.updateCache();
		}
	}

	@action.bound
	private updateCache() {
		fetchModules()
			.then((modules) => {
				return modules.reduce((acc, module) => {
					acc[module.id] = module;
					return acc;
				}, {} as any);
			})
			.then((modules) => {
				this._modules.replace(modules);
			})
			.catch((error) => {
				this._error = error;
			});
	}

	@action.bound
	public async updateModule(module: Module) {
		try {
			await updateModule(module);
		} catch {
			throw 'Unknown error';
		}
	}
}
