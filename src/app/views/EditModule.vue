<template>
    <div>
        <ui-loading :show='fetchIsLoading || updateIsLoading'/>
        <ui-menu v-if='module'>
            <router-link class='btn-menu-back' :to='`/modules/${module.id}`'>
                Back
            </router-link>
        </ui-menu>
        <ui-container v-if='module'>
            <form class='form' @submit.prevent='onSubmit'>
                <input class='input' placeholder='Module name' required type='text'
                    v-model='module.name'/>
                <div class='form-group location'>
                    <select class='input' v-model='module.location'>
                        <option value='Chambre'>Chambre</option>
                        <option value='Cuisine'>Cuisine</option>
                        <option value='Salon'>Salon</option>
                    </select>
                    <span class='fas fa-angle-down arrow'/>
                </div>
                <ul class='form-group thresholds'>
                    <li class='threshold' v-for='threshold of module.thresholds'>
                        <p class='name'>
                            <b>{{threshold.name}}:</b> {{threshold.current}}
                        </p>
                        <div class='selector'>
                            <input class='threshold-input' type='range'
                                :min='threshold.min' :max='threshold.max' step='1' v-model='threshold.current'>
                            <button class='btn reset-btn' type='button' @click='resetThreshold(threshold)'>
                                Reset
                            </button>
                        </div>
                    </li>
                </ul>
                <button class='form-submit' type='submit'>
                    Save
                </button>
            </form>
        </ui-container>
    </div>
</template>

<script lang='ts'>
    import gql from 'graphql-tag';


    export default {
        apollo: {
            module: {
                query: gql`
                    query ($id: String!) {
                        module: getModuleById(id: $id) {
                            id
                            name
                            location
                            type
                            thresholds { current default name max min }
                        }
                    }
                `,
                update({ module }) {
                    return {
                        ...module,
                        thresholds: module.thresholds.map(threshold => {
                            return { ...threshold };
                        })
                    };
                },
                variables() {
                    return { id: this.$route.params.id };
                },
                watchLoading(isLoading) {
                    this.fetchIsLoading = isLoading;
                }
            }
        },
        methods: {
            resetThreshold(threshold) {
                threshold.current = threshold.default;
            },
            async onSubmit() {
                this.updateIsLoading = true;

                let location;
                switch (this.module.location) {
                    case 'Chambre':
                        location = '2';
                        break;
                    case 'Cuisine':
                        location = '3';
                        break;
                    case 'Salon':
                        location = '1';
                        break;
                    default:
                        location = '-1';
                        break;
                }

                await this.$apollo.mutate({
                    mutation: gql`
                        mutation ($id: String!, $name: String, $location: String, $thresholds: [ThresholdInput!]) {
                            updateModule(id: $id, name: $name, location: $location, thresholds: $thresholds) {
                                id
                            }
                        }
                    `,
                    variables: {
                        id: this.module.id,
                        name: this.module.name,
                        location: location,
                        thresholds: this.module.thresholds.map(threshold => {
                            return {
                                current: threshold.current,
                                default: threshold.default,
                                max: threshold.max,
                                min: threshold.min,
                                moduleId: this.module.id,
                                name: threshold.name
                            };
                        })
                    }
                });
                this.$router.push(`/modules/${this.$route.params.id}`);
            }
        },
        data() {
            return {
                fetchIsLoading: false,
                module: undefined,
                updateIsLoading: false
            };
        }
    };
</script>

<style lang='scss' scoped>
    .location {
        justify-content: center;
        position: relative;

        > .arrow {
            pointer-events: none;
            position: absolute;
            right: 16px;
        }
    }

    .thresholds {
        margin: 15px 0 0 !important;
        padding: 0;

        @media screen and (min-width: 480px) {
            margin-top: 20px !important;
        }

        > .threshold {
            align-items: flex-start;
            display: flex;
            flex: none;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: flex-start;
            width: 100%;

            &:not(:first-child) {
                margin-top: 6px;

                @media screen and (min-width: 480px) {
                    margin-top: 8px;
                }
            }

            > .name {
                flex: none;
            }

            > .selector {
                align-items: center;
                display: flex;
                flex: none;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                width: 100%;

                > .threshold-input {
                    flex: auto;
                }

                > .reset-btn {
                    border: 2px solid #ef5256;
                    color: #ef5256;
                    flex: none;
                    margin-left: 9px;
                    padding: 12px;

                    @media screen and (min-width: 480px) {
                        margin-left: 12px;
                    }
                }
            }
        }
    }
</style>
