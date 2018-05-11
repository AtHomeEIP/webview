<template>
    <div>
        <ui-loading :show='isLoading'/>
        <ui-menu v-if='module'>
            <router-link class='btn-menu-back' to='/'>
                Back
            </router-link>
            <router-link class='btn-menu edit-link' :to='`/modules/${module.id}/edit`'>
                <span class='fas fa-pencil-alt'/>
            </router-link>
        </ui-menu>
        <ui-container v-if='module'>
            <span class='icon fas fa-4x' :class='module.icon'/>
            <h5 class='name'>{{module.name}}</h5>
            <p class='type'>{{module.type}}</p>
            <p class='mac-address'>{{module.mac}}</p>
            <div class='location'>
                <span class='icon fas fa-map-marker-alt'/>
                <h6 class='title'>{{module.location}}</h6>
            </div>
            <div class='samples'>
                <span class='icon fas fa-file-alt'/>
                <h6 class='title'>Last data</h6>
            </div>
            <div class='samples-values' v-if='module.samples.length'>
                <div class='value' :class='sample.status' v-for='sample in module.samples'>
                    <h5 class='value'>{{sample.value}}</h5>
                    <p class='date'>{{sample.date}}</p>
                </div>
            </div>
            <p class='no-samples-values' v-else>
                No data to show
            </p>
        </ui-container>
    </div>
</template>

<script lang='ts'>
    import gql from 'graphql-tag';
    import Moment from 'moment';


    export default {
        apollo: {
            module: {
                fetchPolicy: 'cache-and-network',
                pollInterval: 10000,
                query: gql`
                    query($moduleId: String!, $samplesOffset: Int!) {
                        module: getModuleById(id: $moduleId) {
                            id
                            location
                            mac
                            name
                            samples(offset: $samplesOffset, limit: 10) { payload date }
                            thresholds { current }
                            type
                            vendor
                        }
                    }
                `,
                update({ module }) {
                    const result: any = { ...module };
                    result.samples = module.samples.map(sample => {
                        const payload = JSON.parse(sample.payload);
                        let status;
                        if (module.thresholds.length === 2) {
                            const { measure } = payload,
                                [min, max] = module.thresholds;
                            status = measure < min.current || measure > max.current ? 'bad' : 'good';
                        } else {
                            status = '';
                        }

                        // Fixme: Dirty hack, the data must be updated in the DB.
                        const unit = module.type === 'thermometer'
                            ? '°C' : payload.unit_measure;

                        return {
                            date: Moment(sample.date).fromNow(),
                            status: status,
                            value: `${payload.measure} ${unit}`
                        };
                    });
                    switch (module.type) {
                        case 'athmospherics': // Fixme: Remove this case.
                        case 'atmospherics':
                            result.icon = 'fa-cloud';
                            result.type = 'Atmospherics';
                            break;
                        case 'hygrometer':
                            result.icon = 'fa-tint';
                            result.type = 'Hygrometer';
                            break;
                        case 'luxmeter':
                            result.icon = 'fa-lightbulb';
                            result.type = 'Luxmeter';
                            break;
                        case 'thermometer':
                            result.icon = 'fa-thermometer-half';
                            result.type = 'Thermometer';
                            break;
                        default:
                            result.icon = 'fa-question';
                            result.type = undefined;
                            break;
                    }
                    return result;
                },
                variables() {
                    return {
                        moduleId: this.$route.params.id,
                        samplesOffset: 0
                    };
                },
                watchLoading(isLoading) {
                    this.isLoading = isLoading;
                }
            }
        },
        data() {
            return {
                isLoading: false,
                module: undefined
            };
        }
    };
</script>

<style lang='scss' scoped>
    .edit-link {
        margin-left: auto;
    }

    .icon {
        color: #646c77;
        flex: none;

        &.fa-cloud {
            color: #cbd0d8;
        }

        &.fa-lightbulb {
            color: #fecd57;
        }

        &.fa-thermometer-half {
            color: #ec5564;
        }

        &.fa-tint {
            color: #5e9cea;
        }
    }

    .name {
        flex: none;
        margin-top: 24px;

        @media (min-width: 480px) {
            & {
                margin-top: 32px;
            }
        }
    }

    .type,
    .mac-address {
        flex: none;
        font-size: .8rem;
        margin-top: 6px;

        @media (min-width: 480px) {
            & {
                margin-top: 8px;
            }
        }
    }

    .location,
    .samples {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin-top: 24px;
        max-width: 640px;
        width: 100%;

        @media (min-width: 480px) {
            & {
                margin-top: 32px;
            }
        }

        > .icon {
            color: #a9b1bc;
            flex: none;
        }

        > .title {
            flex: none;
            margin-left: 16px;
        }
    }

    .samples-values {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin-top: 24px;
        max-width: 640px;
        overflow-x: auto;
        padding-bottom: 16px;
        width: 100%;

        @media (min-width: 480px) {
            & {
                margin-top: 32px;
            }
        }

        > .value {
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
            }

            @media (min-width: 480px) {
                &:not(:first-child) {
                    margin-left: 12px;
                }
            }

            > .value,
            > .date {
                flex: none;
            }
        }
    }

    .no-samples-values {
        font-style: italic;
        margin-top: 24px;

        @media (min-width: 480px) {
            & {
                margin-top: 32px;
            }
        }

    }
</style>
