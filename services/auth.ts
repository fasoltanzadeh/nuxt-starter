import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'

export default class AuthService {
  constructor(public $axios: NuxtAxiosInstance) {}
  getProfile() : any{
    return {
        name: 'Facebook',
        logo: '/icons/logo.png'
    }
  }

  signUp(formData: any){
    console.log(' i want sign up')
    return this.$axios.$post('/signup', formData)
  }

  checkEmailVerification(){

  }

  resendEmail(registrationToken: string){
    console.log(registrationToken)
    return this.$axios.$post('/signup/resend_email', null , {
      headers: {
        Authorization: 'bearer ' + registrationToken
      }
    })
  }

  login(formData: any) {
    return this.$axios.$post('/login', formData)
  }

  resetPassword(data: any){
    
  }
}
