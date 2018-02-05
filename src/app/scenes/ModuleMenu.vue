<template>
    <div>
        <div class='inner-menu'>
            <router-link class='back-link' replace to='/'>
                <span class='fas fa-arrow-left'/>
            </router-link>
            <h4 class='title'>{{moduleName}}</h4>
            <router-link class='edit-link' replace :to='editLink'>
                <span class='fas fa-pencil-alt'/>
            </router-link>
        </div>
    </div>
</template>

<script lang='ts'>
    import gql from 'graphql-tag';

    export default {
        apollo: {
            moduleName: {
                fetchPolicy: 'cache-and-network',
                pollInterval: 5000,
                query: gql`
                    query($id: String!) {
                        getModuleById(id: $id) { id name }
                    }
                `,
                update({ getModuleById }) {
                    return getModuleById.name;
                },
                variables() {
                    return { id: this.$route.params.id };
                }
            }
        },
        computed: {
            editLink() {
                return `${this.$route.path}/edit`;
            }
        },
        data() {
            return { moduleName: '' };
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

    .back-link, .edit-link {
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
</style>
