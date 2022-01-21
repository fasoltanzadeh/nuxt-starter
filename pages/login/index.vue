<style lang="scss" scoped></style>

<template>
    <section>
        <LoginForm
            @submit="onLogin"
            @resetPassword="resetPassword"
            v-model="form"
            v-if="!resetPass"
        />
        <ResetPasswordForm
            v-if="resetPass && !resetSuccessful"
            @submit="resetPassword"
        />
        <SuccessResetPass
            v-if="resetSuccessful"
        />
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import LoginForm from '@/components/Pages/Company/Login/LoginForm.vue'
import ResetPasswordForm from '@/components/Pages/Company/Login/ResetPasswordForm.vue'
import SuccessResetPass from '@/components/Pages/Company/Login/SuccessResetPass.vue'

@Component({
  layout: 'auth',
  components:{
      LoginForm, 
      ResetPasswordForm, 
      SuccessResetPass
  }
})
export default class LoginPage extends Vue {
    form = {}
    resetPass = false
    resetSuccessful = false
    async onLogin(formData: any){
        console.log('login')
        try{
            let result = await this.$service.auth.login(formData)
            this.$storage.removeLocalStorage('registration_token')
            let token = result.access_token.token
            console.log(token)
            await this.$storage.setLocalStorage('access_token', token)
            console.log(result)
            this.$router.push('/')
        }catch(error){
            console.log('login => onLogin => error')
        }
    }

    resendEmail(){
        console.log('resend email')
        this.resetSuccessful = true
    }

    resetPassword(email: string){
        this.resetPass = true
        this.resendEmail()
    }
}
</script>