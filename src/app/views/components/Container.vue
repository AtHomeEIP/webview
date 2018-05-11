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
        display: flex;
        flex: auto;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-y: auto;
        width: 100%;
    }

    .inner-wrapper {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        max-width: 640px;
        padding: 24px;
        width: 100%;

        @media screen and (min-width: 480px) {
            margin: 32px;
        }
    }
</style>
