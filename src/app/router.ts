import Vue from 'vue';
import Router from 'vue-router';

import Home from '@app/views/Home.vue';
import Module from '@app/views/Module.vue';
import EditModule from '@app/views/EditModule.vue';


Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        component: Home,
        name: 'Home'
    }, {
        path: '/modules/:id',
        component: Module,
        name: 'Module'
    }, {
        path: '/modules/:id/edit',
        component: EditModule,
        name: 'EditModule'
    }]
});
