<style lang="scss" scoped>
    .auth-box{
        width: 446px;
        margin: auto;
        padding: 32px;
        .signup-btn{
            width: 100%;
            height: 48px;
            font-size: 14;
            font-weight: bold;
            background-color: #005AAA !important;
            color: #ffffff;
            border-radius: 2px;
            text-transform: none;
        }
        .desc{
            font-size: 12px;
            margin-bottom: 110px;
            span{
                font-size: 12px;
                font-weight: bold;
                cursor: pointer;
            }
        }
        .login{
            font-size: 14;
            color: #808080;
            .nuxt-link-exact-active, .nuxt-link-active{
                color: #005AAA;
                font-weight: bold;
            }
        }
    }
</style>
<template>
    <v-card class="auth-box">
        <v-card-title class="pa-0">Sign up</v-card-title>
        <form @submit.prevent="onSignUp">
            <v-text-field 
                placeholder="Company name"
                name="name"
                data-vv-as="Company name"
                :error-messages="errors.collect('name')"
                v-validate="'required'"
                v-model="form.companyName"
            />
            <v-text-field 
                placeholder="Work email address"
                name="email"
                data-vv-as="Email"
                :error-messages="errors.collect('email')"
                v-validate="'required'"
                v-model="form.email"
            />
            <v-text-field 
                placeholder="Password"
                name="password"
                data-vv-as="Password"
                :error-messages="errors.collect('password')"
                v-validate="'required'"
                type="password"
                v-model="form.password"
            />
            <v-btn  @click="onSignUp" class="signup-btn mb-4">Sign Up</v-btn>
            <div class="desc">
                By continuing, you agree to the 
                <span>Terms of Use</span>
                and 
                <span>Privacy Policy</span>.
            </div>
            <div class="login">
                Have an account?
                <nuxt-link to="/login">Login</nuxt-link>
            </div>
        </form>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class SignUpForm extends Vue {
    @Prop({
        type: Object,
        required: true,
    })
    readonly value!: object
    get form() {
        return this.value
    }
    set form(val) {
        this.$emit('input', val)
    }

    onSignUp(){
        this.$emit('submit', this.form)
    }
}
</script>