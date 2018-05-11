<template>
    <div class='outer-wrapper'>
        <div class='inner-wrapper'>
            <slot></slot>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    .outer-wrapper {
        align-items: center;
        background: #ffffff;
        box-shadow: 0 1px 4px 2px rgba(0, 0, 0, .1);
        display: flex;
        flex: none;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
    }

    .inner-wrapper {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        max-width: 960px;
        width: 100%;
    }
</style>
