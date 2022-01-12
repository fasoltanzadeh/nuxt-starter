<style lang="scss" scoped>
    .auth-box{
        width: 446px;
        margin: auto;
        padding: 32px;
        .desc{
            font-size: 14px;
            margin-bottom: 24px;
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
        .success-reset{
            width: 48px;
            height: 48px;
            border: solid 4px #26A33B;
            border-radius: 100% !important;
            display: flex;
            justify-content: center;
            margin: auto;
        }
    }
    .title{
        margin: 31px 0 11px;
    }
</style>
<template>
    <v-card class="auth-box">
        <div class="success-reset">
            <v-icon color="#26A33B" size="35">la-check</v-icon>
        </div>
        <h4 class="text-center font-weight-bold title">We've just sent you an email</h4>
        <div class="desc">
            Please wait up to 15 minutes for the mail to arrive, and please also check your spam filter in case it ended up in there.
        </div>
        <v-btn @click="gotoLogin" class="verify-btn">Go to login</v-btn>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class SignupPage extends Vue {
    gotoLogin(){
        console.log('hiiiii')
        this.$router.push('/login')
    }
}
</script>