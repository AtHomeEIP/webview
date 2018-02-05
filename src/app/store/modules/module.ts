export interface Module {}


export interface State {
    modules: Map<string, Module>;
}

const state: State = {
    modules: new Map()
};
