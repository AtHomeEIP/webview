import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import router from '@app/router';
import Container from '@app/views/components/Container.vue';
import Loading from '@app/views/components/Loading.vue';
import Menu from '@app/views/components/Menu.vue';


Vue.component('ui-container', Container);
Vue.component('ui-loading', Loading);
Vue.component('ui-menu', Menu);

const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
        cache: new InMemoryCache(),
        connectToDevTools: true,
        // link: new HttpLink({ uri: 'http://woodbox.io:8080/graphql' })
        link: new HttpLink({ uri: 'http://lferry.xyz:8080/graphql' })
    })
});
Vue.use(VueApollo);

new Vue({
    el: '#app',
    provide: apolloProvider.provide(),
    router: router,
    template: `<router-view id='app'/>`
});
