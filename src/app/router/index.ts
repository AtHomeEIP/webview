import Vue from 'vue';
import Router from 'vue-router';

import Home from '@app/scenes/Home.vue';
import HomeMenu from '@app/scenes/HomeMenu.vue';
import Module from '@app/scenes/Module.vue';
import ModuleEdit from '@app/scenes/ModuleEdit.vue';
import ModuleEditMenu from '@app/scenes/ModuleEditMenu.vue';
import ModuleMenu from '@app/scenes/ModuleMenu.vue';


Vue.use(Router);

export default new Router({
    routes: [{
        components: {
            main: Home,
            menu: HomeMenu
        },
        name: 'Home',
        path: '/'
    }, {
        components: {
            main: Module,
            menu: ModuleMenu
        },
        name: 'Module',
        path: '/modules/:id'
    }, {
        components: {
            main: ModuleEdit,
            menu: ModuleEditMenu
        },
        name: 'ModuleEdit',
        path: '/modules/:id/edit'
    }]
});
