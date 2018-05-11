<template>
    <div>
        <ui-loading :show='isLoading'/>
        <ui-container>
            <ul class='modules'>
                <li class='module' v-for='module in modules' :key='modules.id'>
                    <span class='fas icon' :class='module.icon'/>
                    <div class='info'>
                        <h5 class='name'>{{module.name}}</h5>
                        <p class='location'>{{module.location}}</p>
                    </div>
                    <router-link class='link' :to='`/modules/${module.id}`'>
                        <span class='fas fa-angle-right'/>
                    </router-link>
                </li>
            </ul>
        </ui-container>
    </div>
</template>

<script lang='ts'>
    import gql from 'graphql-tag';


    export default {
        apollo: {
            modules: {
                fetchPolicy: 'cache-and-network',
                pollInterval: 5000,
                query: gql`
                    query {
                        modules: allModules { id name location type }
                    }
                `,
                update({ modules }) {
                    return modules.map(module => {
                        const result: any = { ...module };
                        switch (module.type) {
                            case 'athmospherics': // Fixme: Remove this case.
                            case 'atmospherics':
                                result.icon = 'fa-cloud';
                                break;
                            case 'hygrometer':
                                result.icon = 'fa-tint';
                                break;
                            case 'luxmeter':
                                result.icon = 'fa-lightbulb';
                                break;
                            case 'thermometer':
                                result.icon = 'fa-thermometer-half';
                                break;
                            default:
                                result.icon = 'fa-question';
                                break;
                        }
                        return result;
                    });
                },
                watchLoading(isLoading) {
                    this.isLoading = isLoading;
                }
            }
        },
        data() {
            return {
                isLoading: false,
                modules: []
            };
        }
    };
</script>

<style lang='scss' scoped>
    .modules {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin: 0;
        padding: 0;
        width: 100%;

        > .module {
            align-items: center;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, .075);
            border-radius: 4px;
            display: flex;
            flex: none;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;
            padding: 18px;
            width: 100%;

            &:not(:first-child) {
                margin-top: 9px;
            }

            @media (min-width: 480px) {
                & {
                    padding: 24px;
                }

                &:not(:first-child) {
                    margin-top: 12px;
                }
            }

            > .icon {
                color: #424953;
                flex: none;
                font-size: 1.5em;
                width: 32px;

                &.fa-cloud {
                    color: #cbd0d8;
                }

                &.fa-lightbulb {
                    color: #fecd57;
                }

                &.fa-tint {
                    color: #5e9cea;
                }

                &.fa-thermometer-half {
                    color: #ec5564;
                }
            }

            > .info {
                align-items: flex-start;
                display: flex;
                flex: auto;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: flex-start;
                margin-left: 16px;

                @media (min-width: 480px) {
                    & {
                        margin-left: 24px;
                    }
                }
            }

            > .link {
                align-items: center;
                background: #f7f7fa;
                border-radius: 50%;
                color: inherit;
                display: flex;
                flex: none;
                flex-direction: row;
                flex-wrap: nowrap;
                font-size: 1.25em;
                height: 48px;
                justify-content: center;
                margin-left: 16px;
                text-decoration: none;
                width: 48px;

                @media (min-width: 480px) {
                    & {
                        margin-left: 24px;
                    }
                }
            }
        }
    }
</style>
