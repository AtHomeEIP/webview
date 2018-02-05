import { Sample } from '@app/entities/Sample';


/**
 * Structure of a module object.
 * @interface ModuleEntity
 */
export interface ModuleEntity {
    readonly id: string;
    location: string;
    readonly mac: string;
    name: string;
    readonly samples: Sample[];
    readonly type: string;
    readonly vendor: string;
}


/**
 * Changes the location of a module.
 * @param {ModuleEntity} module The module for which to change the location.
 * @param {string} newLocation The new module location.
 * @returns {ModuleEntity} The module.
 */
export function changeModuleLocation(module: ModuleEntity, newLocation: string): ModuleEntity {
    module.location = newLocation;
    return module;
}

/**
 * Changes the name of a module.
 * @param {ModuleEntity} module The module for which to change the name.
 * @param {string} newName The new module name.
 * @returns {ModuleEntity} The module.
 */
export function changeModuleName(module: ModuleEntity, newName: string): ModuleEntity {
    module.name = newName;
    return module;
}
