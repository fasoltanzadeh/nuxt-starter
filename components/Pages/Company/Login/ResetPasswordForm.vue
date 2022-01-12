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
            }
            &:not(:last-child){
                margin-bottom: 165px;
            }
        }
        .submit-btn{
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
        <v-card-title class="pa-0">Reset Password</v-card-title>
        <div class="desc">
            No problem! Just fill in the email below and we'll send you password reset instructions!
        </div>
        <v-text-field 
            placeholder="Email"
            name="email"
            v-model="email"
        />
        <v-btn @click="onSubmit" class="submit-btn">Submit</v-btn>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ResetPassword extends Vue {
    email = ""

    onSubmit(){
        this.$emit('submit', this.email)
    }
    gotoLogin(){
        this.$router.push('/login')
    }
}
</script>