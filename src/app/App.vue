<template>
    <div id='app'>
        <router-view class='menu' name='menu'/>
        <router-view class='main' name='main'/>
    </div>
</template>

<script lang='ts'>
    export default {
        name: 'app'
    };
</script>

<style lang='scss' scoped>
    .menu {
        align-items: center;
        background: #ffffff;
        box-shadow: 0 1px 4px 2px rgba(0, 0, 0, .1);
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        height: 64px;
        justify-content: center;
        position: relative;
        width: 100%;
        z-index: 1;
    }

    .main {
        align-items: center;
        display: flex;
        flex: auto;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-y: scroll;
        position: relative;
        width: 100%;
        z-index: 0;
    }
</style>
