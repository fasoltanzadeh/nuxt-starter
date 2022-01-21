<style lang="scss" scoped></style>

<template>
    <section>
        <SignUpForm
            @submit="onSignUp"
            v-model="form"
            v-if="signUpState=='completeForm'"
        />
        <!-- <SetPasswordForm
            v-if="signUpState=='setPassword'"
            v-model="form"
            @setPassword="setPassword"
        /> -->
        <EmailVerification
            v-if="signUpState=='verifyEmail'"
            :enteredEmail="form.email"
            @verify="onVerifyEmail"
            @resendEmail="resendEmail"
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
            let result = await this.$service.auth.signUp(formData)
            let token = result.registration_token.token
            this.$storage.setLocalStorage('registration_token', token)
            console.log(result)
        }catch(error){
            console.log('signup => onSignup => error')
        }
        this.signUpState = 'verifyEmail'
    }

    async onVerifyEmail(){
        this.$storage.removeLocalStorage('registration_token')
        this.$router.push('/login')
        // this.signUpState = 'setPassword'
    }

    async resendEmail(){
        try{
            let result = await this.$service.auth.resendEmail(this.$storage.getLocalStorage('registration_token'))
            this.$storage.removeLocalStorage('registration_token')
            let token = result.registration_token.token
            this.$storage.setLocalStorage('registration_token', token)
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