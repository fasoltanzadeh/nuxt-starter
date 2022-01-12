<style lang="scss" scoped>
    .main{
        background-color: #00325E;
        color: #ffffff;
        padding: 60px;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a.nuxt-link-active{
            font-size: 14px;
            color: #ffffff;
            margin-right: 25px;
            &:last-child{
                margin-right: 0px;
            }
        }
    }
</style>
<template>
    <v-app>
        <main>
            <section class="main">
                <h2 class="text-center mb-6">Jobitta</h2>
                <nuxt/> 
                <div class="d-flex mt-8">
                    <nuxt-link to="/">Support</nuxt-link>
                    <nuxt-link to="/">Terms of Use</nuxt-link>
                    <nuxt-link to="/">Privacy Policy</nuxt-link>
                </div>
            </section>
        </main>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class AuthLayout extends Vue {
}
</script>