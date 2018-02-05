<template>
    <li class='module'>
        <span class='type-icon fas' :class='moduleIcon'/>
        <div class='info'>
            <h5 class='name'>{{module.name}}</h5>
            <p class='location'>{{module.location}}</p>
        </div>
        <router-link class='link' :to='moduleLink'>
            <span class='fas fa-angle-right'/>
        </router-link>
    </li>
</template>

<script lang='ts'>
    export default {
        props: {
            module: Object
        },
        computed: {
            moduleIcon() {
                switch (this.module.type) {
                    case 'athmospherics':
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
            moduleLink() {
                return `/modules/${this.module.id}`;
            }
        }
    };
</script>

<style lang='scss' scoped>
    .module {
        align-items: center;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, .075);
        border-radius: 8px;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        padding: 20px;
        width: 100%;

        &:not(:first-child) {
            margin-top: 12px;
        }

        @media (min-width: 480px) {
            & {
                max-width: 640px;
                padding: 24px;
            }

            &:not(:first-child) {
                margin-top: 16px;
            }
        }
    }

    .type-icon {
        align-items: center;
        color: #424953;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        font-size: 1.5em;
        height: 48px;
        justify-content: center;
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

    .info {
        align-items: flex-start;
        display: flex;
        flex: auto;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin-left: 16px;

        @media (min-width: 480px) {
            & {
                margin-left: 32px;
            }
        }
    }

    .link {
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
                margin-left: 32px;
            }
        }
    }
</style>
