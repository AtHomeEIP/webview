<template>
    <div>
        <div class='inner-menu'>
            <router-link class='back-link' replace :to='moduleLink'>
                <span class='fas fa-arrow-left'/>
            </router-link>
            <h4 class='title'>Edit module</h4>
            <div class='fake'/>
        </div>
    </div>
</template>

<script lang='ts'>
    export default {
        computed: {
            moduleLink() {
                return `/modules/${this.$route.params.id}`;
            }
        }
    };
</script>

<style lang='scss' scoped>
    .inner-menu {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        position: relative;
        width: 100%;

        @media (min-width: 480px) {
            max-width: 1080px;
        }
    }

    .back-link {
        align-items: center;
        border-radius: 50%;
        color: inherit;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        height: 48px;
        justify-content: center;
        text-decoration: none;
        width: 64px;
    }

    .title {
        margin-left: auto;
        margin-right: auto;
    }

    .fake {
        flex: none;
        width: 64px;
    }
</style>
