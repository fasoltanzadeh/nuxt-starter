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

  }

  checkEmailVerification(){

  }

  resendEmail()
  {

  }

  login(formData: any) {
    // let data = `username=${params.username}&password=${params.password}&grant_type=${params.grant_type}`
    // return this.$axios.$post(`/oauth2/token`, data, {
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded',
    //   },
    // })
  }

  resetPassword(data: any){
    
  }
}
