import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import App from '@app/App.vue';
import appRouter from '@app/router';
import appStore from '@app/store';
import Button from '@app/ui/Button.vue';


Vue.component('ui-button', Button);
Vue.use(VueApollo);

const apollo = new VueApollo({
    defaultClient: new ApolloClient({
        cache: new InMemoryCache(),
        connectToDevTools: true,
        link: new HttpLink({ uri: 'http://lferry.xyz:8080/graphql' })
        // link: new HttpLink({ uri: 'http://woodbox.io:8080/graphql' })
    })
});

new Vue({
    apolloProvider: apollo,
    components: { App },
    el: '#app',
    router: appRouter,
    store: appStore,
    template: '<App/>'
});
