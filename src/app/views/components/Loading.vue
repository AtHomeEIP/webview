<template>
    <div class='wrapper' v-if='show'>
        <span class='fas fa-2x fa-spinner spinner'/>
    </div>
</template>

<script lang='ts'>
    export default {
        props: {
            show: Boolean
        }
    };
</script>

<style lang='scss' scoped>
    .wrapper {
        align-items: center;
        background: rgba(255, 255, 255, .75);
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        height: 100%;
        justify-content: center;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 100;
    }

    .spinner {
        animation: spin 1.5s linear infinite;
        -webkit-animation: spin 1.5s linear infinite;
        flex: none;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
