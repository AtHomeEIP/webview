<template>
    <button class='ui-button' :class='variant'>
        <slot/>
    </button>
</template>

<script lang='ts'>
    const SUPPORTED_VARIANTS = ['danger', 'primary', 'success', 'warning'];

    export default {
        props: {
            variant: {
                default: 'primary',
                type: String,
                validator: value => SUPPORTED_VARIANTS.indexOf(value) !== -1
            }
        }
    };
</script>

<style lang='scss'>
    $btn-font-size: 16px;
    $btn-font-weight: 600;
    // Disabled
    $btn-disabled-background: #e0e0e0;
    $btn-disabled-color: #c0c0c0;
    // Danger
    $btn-danger-background: #ef5256;
    $btn-danger-hover-background: #fd5256;
    $btn-danger-color: #ffffff;
    // Primary
    $btn-primary-background: #4b89f4;
    $btn-primary-hover-background: #4b94ff;
    $btn-primary-color: #ffffff;
    // Success
    $btn-success-background: #27c078;
    $btn-success-hover-background: #27d58c;
    $btn-success-color: #ffffff;
    // Warning
    $btn-warning-background: #ee9b56;
    $btn-warning-hover-background: #ffa75b;
    $btn-warning-color: #ffffff;

    .ui-button {
        align-items: center;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        font-family: inherit;
        font-size: $btn-font-size;
        font-weight: $btn-font-weight;
        justify-content: center;
        line-height: $btn-font-size;
        padding: 12px;
        margin: 4px;
        transition: all .2s ease;

        &:disabled {
            background: $btn-disabled-background !important;
            color: $btn-disabled-color !important;
            cursor: not-allowed;
        }

        &, &.primary {
            background: $btn-primary-background;
            color: $btn-primary-color;

            @media screen and (min-width: 480px) {
                &:hover {
                    background: $btn-primary-hover-background;
                }
            }
        }

        &.danger {
            background: $btn-danger-background;
            color: $btn-danger-color;

            @media screen and (min-width: 480px) {
                &:hover {
                    background: $btn-danger-hover-background;
                }
            }
        }

        &.success {
            background: $btn-success-background;
            color: $btn-success-color;

            @media screen and (min-width: 480px) {
                &:hover {
                    background: $btn-success-hover-background;
                }
            }
        }

        &.warning {
            background: $btn-warning-background;
            color: $btn-warning-color;

            @media screen and (min-width: 480px) {
                &:hover {
                    background: $btn-warning-hover-background;
                }
            }
        }
    }
</style>
