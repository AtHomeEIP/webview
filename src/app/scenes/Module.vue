<template>
    <div class='module'>
        <transition name='fade'>
            <div class='loader' v-if='moduleLoading'>
                <span class='spinner fas fa-2x fa-spinner'/>
            </div>
        </transition>
        <div class='module-info'>
            <span class='type-icon fas' :class='moduleIcon'/>
            <h5 class='type'>{{moduleType}}</h5>
            <p class='mac'>{{module.mac}}</p>
            <div class='location'>
                <span class='icon fas fa-map-marker-alt'/>
                <!-- Fixme -->
                <h6 class='room'>{{module.location}}</h6>
            </div>
            <div class='samples'>
                <span class='icon fas fa-file-alt'/>
                <h6 class='title'>Last data</h6>
            </div>
            <div class='samples-list'>
                <div class='sample' :class='sample.status' v-for='sample in moduleSamples'>
                    <h5>{{sample.value}}</h5>
                    <p>{{sample.date}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import gql from 'graphql-tag';
    import Moment from 'moment';

    export default {
        apollo: {
            module: {
                fetchPolicy: 'cache-and-network',
                pollInterval: 5000,
                query: gql`
                    query($id: String!) {
                        getModuleById(id: $id) {
                            id mac location type vendor
                            samples { payload date }
                        }
                    }
                `,
                update({ getModuleById }) {
                    return getModuleById;
                },
                variables() {
                    return { id: this.$route.params.id };
                },
                watchLoading(isLoading) {
                    this.moduleLoading = isLoading;
                }
            }
        },
        computed: {
            moduleIcon() {
                switch (this.module.type) {
                    // Fixme: Remove first case
                    case 'athmospherics':
                    case 'atmospherics':
                        return 'fa-cloud';
                    case 'hygrometer':
                        return 'fa-tint';
                    case 'luxmeter':
                        return 'fa-lightbulb';
                    case 'thermometer':
                        return 'fa-thermometer-half';
                    default:
                        return 'fa-question';
                }
            },
            moduleSamples() {
                return this.module.samples && this.module.samples.map(sample => {
                    const payload = JSON.parse(sample.payload);
                    return {
                        date: Moment(sample.date).fromNow(),
                        status: this.getSampleStatus(payload.measure),
                        value: `${payload.measure} ${payload.unit_measure}`
                    };
                }).reverse();
            },
            moduleType() {
                switch (this.module.type) {
                    // Fixme: Remove first case
                    case 'athmospherics':
                    case 'atmospherics':
                        return 'Atmospherics';
                    case 'hygrometer':
                        return 'Hygrometer';
                    case 'luxmeter':
                        return 'Luxmeter';
                    case 'thermometer':
                        return 'Thermometer';
                    default:
                        return null;
                }
            }
        },
        methods: {
            getSampleStatus(measure) {
                switch (this.module.type) {
                    case 'athmospherics':
                    case 'atmospherics':
                        return measure < 2 ? 'good' : measure < 50 ? 'warn' : 'bad';
                    case 'hygrometer':
                        return measure < 40 || measure > 60 ? 'bad' : 'good';
                    case 'luxmeter':
                        return measure < 215 || measure > 525 ? 'bad' : 'good';
                    case 'thermometer':
                        return measure < 18 || measure > 21 ? 'bad' : 'good';
                    default:
                        return '';
                }
            }
        },
        data() {
            return { module: {}, moduleLoading: false };
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

    .module-info {
        align-items: center;
        display: flex;
        flex: auto;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-y: auto;
        padding: 32px 24px;
        width: 100%;

        @media (min-width: 480px) {
            padding: 48px 32px;
        }
    }

    .type-icon {
        align-items: center;
        color: #646c77;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        font-size: 5em;
        justify-content: center;

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

    .type {
        flex: none;
        margin-top: 32px;

        @media (min-width: 480px) {
            margin-top: 48px;
        }
    }

    .mac {
        flex: none;
        margin-top: 4px;

        @media (min-width: 480px) {
            margin-top: 8px;
        }
    }

    .location {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        font-size: 1.25em;
        justify-content: flex-start;
        margin-top: 24px;
        max-width: 640px;
        width: 100%;

        @media (min-width: 480px) {
            margin-top: 32px;
        }

        > .icon {
            color: #a9b1bc;
        }

        > .room {
            flex: auto;
            margin-left: 16px;
        }
    }

    .samples {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        font-size: 1.25em;
        justify-content: flex-start;
        margin-top: 24px;
        max-width: 640px;
        width: 100%;

        @media (min-width: 480px) {
            margin-top: 32px;
        }

        > .icon {
            color: #a9b1bc;
        }

        > .title {
            flex: auto;
            margin-left: 16px;
        }

    }

    .samples-list {
        align-items: center;
        flex: none;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin-top: 24px;
        max-width: 640px;
        overflow-x: auto;
        padding-bottom: 16px;
        width: 100%;

        @media (min-width: 480px) {
            margin-top: 32px;
        }

        .sample {
            align-items: center;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, .075);
            border-radius: 8px;
            display: flex;
            flex: none;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            padding: 24px;

            &.bad {
                background: #ec5564;
            }

            &.good {
                background: #9ed36a;
            }

            &.warn {
                background: #fb6d51;
            }

            &:not(:first-child) {
                margin-left: 8px;

                @media (min-width: 480px) {
                    margin-left: 16px;
                }
            }
        }
    }
</style>
