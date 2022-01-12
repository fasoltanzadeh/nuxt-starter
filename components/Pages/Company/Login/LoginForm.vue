<style lang="scss" scoped>
    .auth-box{
        width: 446px;
        margin: auto;
        padding: 32px;
        .login-btn{
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
            span{
                font-size: 12px;
                font-weight: bold;
            }
        }
        .question{
            font-size: 14;
            color: #808080;
            span{
                color: #005AAA;
                font-weight: bold;
            }
            &:not(:last-child){
                margin-bottom: 145px;
            }
        }
    }
</style>
<template>
    <v-card class="auth-box">
        <v-card-title class="pa-0">Login</v-card-title>
        <form @submit.prevent="onLogin">
            <v-text-field 
                placeholder="Email"
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
            <div class="desc">
                <v-checkbox
                    label="Keep me signed in on this device"
                    v-model="selected"
                />

            </div>
            <v-btn  @click="onLogin" class="login-btn mb-4">Login</v-btn>
            <div class="question">
                Forgot password?
                <span @click="resetPassword">Reset Password</span>
            </div>
            <div class="question">
                Don't have an account?
                <span @click="gotoSignUp">Sign Up</span>
            </div>
        </form>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class LoginForm extends Vue {
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
    selected = false
    gotoSignUp(){
        this.$router.push('/sign-up')
    }
    async onLogin(){
        console.log('login')
        this.$emit('submit', this.form)

        try{
            await this.$service.auth.login(this.form)
        } catch(error){
            console.log('login => onLogin => error')
        }
    }

    async resetPassword(){
        this.$emit('resetPassword', this.form)
    
        try{
            await this.$service.auth.resetPassword(this.form)
        } catch(error){
            console.log('login => resetPassword => error')
        }
    }
}
</script>