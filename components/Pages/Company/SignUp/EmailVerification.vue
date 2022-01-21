<style lang="scss" scoped>
    .auth-box{
        width: 446px;
        margin: auto;
        padding: 32px;
        .desc{
            font-size: 14px;
            font-weight: bold;
            margin: 40px 0 54px;
            color: #808080;
        }
        .question{
            font-size: 14;
            color: #808080;
            span{
                color: #005AAA;
                font-weight: bold;
                cursor: pointer;
            }
            &:not(:last-child){
                margin-bottom: 165px;
            }
        }
        .verify-btn{
            margin-bottom: 25px;
            color: #005AAA;
            background-color: #ffffff;
            font-size: 14px;
            font-weight: bold;
            border: solid #005AAA 1px;
            border-radius: 2px;
            box-shadow: none;
            width: 100%;
            text-transform: none;
            height: 48px;
        }
    }
</style>
<template>
    <v-card class="auth-box">
        <v-card-title class="pa-0">Verify your email address</v-card-title>
        <div class="desc">
            We’ve sent you an email to {{enteredEmail}}, check your inbox
        </div>
        <v-btn @click="onVerify" class="verify-btn">Verified my email</v-btn>
        <div class="question">
            Didn’t recieve the email?
            <span @click="resendEmail">Resend</span>
        </div>
        <!-- <div class="question">
            Entered a wrong email?
            <span @click="changeEmail">Change email</span>
        </div> -->
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class EmailVerification extends Vue {
    @Prop()
    enteredEmail !: String

    onVerify(){
        this.$emit('verify')
    }
    // changeEmail(){
    //     this.$emit('changeEmail')
    // }
    resendEmail(){
        this.$emit('resendEmail')
    }
}
</script>