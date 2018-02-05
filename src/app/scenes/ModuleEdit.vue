<template>
    <div class='module-edit'>
        <transition name='fade'>
            <div class='loader' v-if='editModuleLoading'>
                <span class='spinner fas fa-2x fa-spinner'/>
            </div>
        </transition>
        <form class='form' @submit.prevent='onSubmit'>
            <input class='input' placeholder='Module name' type='text'
                v-model='name'>
            <div class='select'>
                <select class='select' name='location'
                    v-model='location'>
                    <option value='1'>Salon</option>
                    <option value='2'>Chambre</option>
                    <option value='3'>Cuisine</option>
                </select>
                <span class='select-arrow fas fa-angle-down'/>
            </div>
            <ui-button class='submit-btn' type='submit'
                :disabled='submitBtnStatus'>
                Save changes
            </ui-button>
        </form>
    </div>
</template>

<script lang='ts'>
    import gql from 'graphql-tag';

    export default {
        apollo: {
            module: {
                query: gql`
                    query($id: String!) {
                        getModuleById(id: $id) { id name location }
                    }
                `,
                update({ getModuleById }) {
                    switch (getModuleById.location) {
                        case 'Salon':
                            this.location = 1;
                            break;
                        case 'Chambre':
                            this.location = 2;
                            break;
                        case 'Cuisine':
                            this.location = 3;
                            break;
                        default:
                            break;
                    }
                    this.name = getModuleById.name;
                    return getModuleById;
                },
                variables() {
                    return { id: this.$route.params.id };
                }
            }
        },
        computed: {
            submitBtnStatus() {
                return !this.location && !this.name;
            }
        },
        methods: {
            async onSubmit() {
                this.editModuleLoading = true;
                try {
                    await this.$apollo.mutate({
                        mutation: gql`
                        mutation ($id: String!, $location: String, $name: String) {
                            updateModule(id: $id, location: $location, name: $name) { id location name }
                        }
                    `,
                        variables: {
                            id: this.module.id,
                            location: this.location,
                            name: this.name
                        }
                    });
                    this.$router.push(`/modules/${this.$route.params.id}`);
                } finally {
                    this.editModuleLoading = false;
                }
            }
        },
        data() {
            return { editModuleLoading: false, location: '', name: '' };
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

    .module-edit {
        padding: 32px 24px;
    }

    .form {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
    }

    .input {
        background: #ffffff;
        border: 2px solid rgba(0, 0, 0, .075);
        border-radius: 8px;
        flex: none;
        font-family: inherit;
        font-size: 14px;
        font-weight: inherit;
        height: 44px;
        max-width: 480px;
        padding: 0 16px;
        width: 100%;

        &:focus {
            border-color: #646c77;
        }
    }

    .select {
        align-items: center;
        display: flex;
        flex: none;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        margin-top: 8px;
        max-width: 480px;
        position: relative;
        width: 100%;

        @media (min-width: 480px) {
            margin-top: 16px;
        }

        > select {
            background: #ffffff;
            border: 2px solid rgba(0, 0, 0, .075);
            border-radius: 8px;
            flex: none;
            font-family: inherit;
            font-size: 14px;
            font-weight: inherit;
            height: 44px;
            line-height: 44px;
            margin: 0;
            padding: 0 16px;
            width: 100%;

            &:focus {
                border-color: #646c77;
            }
        }

        > .select-arrow {
            pointer-events: none;
            position: absolute;
            right: 16px;
        }
    }

    .submit-btn {
        margin-top: 24px;

        @media (min-width: 480px) {
            margin-top: 32px;
        }
    }
</style>
