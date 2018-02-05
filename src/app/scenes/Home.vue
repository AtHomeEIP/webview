<template>
    <div class='home'>
        <transition name='fade'>
            <div class='loader' v-if='modulesLoading'>
                <span class='spinner fas fa-2x fa-spinner'/>
            </div>
        </transition>
        <ul class='modules'>
            <module v-for='module in modules' :key='module.id' :module='module'/>
        </ul>
    </div>
</template>

<script lang='ts'>
    import gql from 'graphql-tag';
    import Module from '@app/components/Module.vue';

    export default {
        components: { Module },
        apollo: {
            modules: {
                fetchPolicy: 'cache-and-network',
                pollInterval: 5000,
                query: gql`
                    query {
                        allModules { id name location type }
                    }
                `,
                update({ allModules }) {
                    return allModules;
                },
                watchLoading(isLoading) {
                    this.modulesLoading = isLoading;
                }
            }
        },
        data() {
            return { modules: [], modulesLoading: false };
        }
    };
</script>

<style lang='scss' scoped>
    .loader {
        align-items: center;
        background: rgba(255, 255, 255, .75);
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        left: 0;
        height: 100%;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .spinner {
        animation: rotate 1.25s linear infinite;
        -webkit-animation: rotate 1.25s linear infinite;
    }

    .modules {
        align-items: center;
        display: flex;
        flex: auto;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin: 0;
        overflow-y: auto;
        padding: 24px;
        width: 100%;
    }
</style>

<!-- Todo: Add pagination -->
