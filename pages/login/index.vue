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
    onLogin(formData: any){
        this.$router.push('/')
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