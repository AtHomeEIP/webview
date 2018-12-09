import { action, computed, observable, ObservableMap } from 'mobx';

import { fetchModule, fetchModules, updateModule } from '@api';
import { Module } from '@api/types';

export default class ModulesStore {

	@observable
	private _intervalId: number | undefined;
	@observable
	private _modules: ObservableMap<string, Module> = observable.map();
	@observable
	private _updateInterval = 5_000;

	@computed
	get hasModulesListAutoUpdateEnabled() {
		return this._intervalId != null;
	}

	@computed
	get modules() {
		return Array.from(
			this._modules.values(),
		);
	}

	@action.bound
	disableModulesListAutoUpdate() {
		if (this.hasModulesListAutoUpdateEnabled) {
			clearInterval(this._intervalId);
			this._intervalId = undefined;
		}
	}

	@action.bound
	enableModulesListAutoUpdate() {
		if (!this.hasModulesListAutoUpdateEnabled) {
			this._intervalId = setInterval(this.updateModulesList, this._updateInterval);
			this.updateModulesList();
		}
	}

	@action.bound
	loadModuleInfo(id: string) {
		return fetchModule(id)
			.then((module) => {
				this._modules.set(id, module);
			});
	}

	@action.bound
	updateModule(module: Module) {
		return updateModule(module);
	}

	@action.bound
	private updateModulesList() {
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
			// tslint:disable-next-line:no-empty
			.catch(() => { });
	}
}
