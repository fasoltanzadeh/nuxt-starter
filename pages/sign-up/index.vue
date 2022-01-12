<style lang="scss" scoped></style>

<template>
    <section>
        <SignUpForm
            @submit="onSignUp"
            v-model="form"
            v-if="signUpState=='completeForm'"
        />
        <EmailVerification
            v-if="signUpState=='verifyEmail'"
            :enteredEmail="form.email"
            @verify="onVerifyEmail"
            @changeEmail="changeEmail"
            @resendEmail="resendEmail"
        />
        <SetPasswordForm
            v-if="signUpState=='setPassword'"
            v-model="form"
            @setPassword="setPassword"
        />
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import SignUpForm from '@/components/Pages/Company/SignUp/SignUpForm.vue'
import EmailVerification from '@/components/Pages/Company/SignUp/EmailVerification.vue'
import SetPasswordForm from '@/components/Pages/Company/SignUp/SetPasswordForm.vue'

@Component({
  layout: 'auth',
  components:{
      SignUpForm, 
      EmailVerification,
      SetPasswordForm
  }
})
export default class SignupPage extends Vue {
    form = {}
    signUpState = 'completeForm'
    async onSignUp(formData: any){
        console.log('sign up')
        try{
            await this.$service.auth.signUp(formData)
        }catch(error){
            console.log('signup => onSignup => error')
        }
        this.signUpState = 'verifyEmail'
    }

    async onVerifyEmail(){
        try{
            await this.$service.auth.checkEmailVerification()
        } catch(error){
            console.log('signup => onVerifyEmail => error')
        }
        this.signUpState = 'setPassword'
    }

    changeEmail(){
        this.signUpState = 'completeForm'
    }

    async resendEmail(){
        try{
            await this.$service.auth.resendEmail()
        } catch(error){
            console.log('signup => resendEmail => error')
        }
        console.log('resend email')
    }

    setPassword(formData: any){
        this.$router.push('/')
    }
}
</script>