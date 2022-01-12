<style scoped lang="scss">
.full-height{
  height: 100%;
  min-height: 100%;
}
.post-job-bt{
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 2px;
  width: 100px;
  text-transform: none;
}
.wrapper{
  height: 100%;
  background-color: #FAFAFA;
  .company-info{
    margin: 40px 0 20px;
    .company-name{
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        line-height: 24px;
        margin-left: 13px;
    }
    .company-logo{
        background-color: #ffffff;
        width: 32px;
        height: 32px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  }
}
.v-tabs{
  height: 48px;
  max-height: 48px !important;
}
</style>
<template>
    <section class="wrapper d-flex flex-column">
      <Header>
        <template v-slot:subtitle>
          <div class="d-flex align-center company-info">
            <div class="company-logo">
              <img :src="companyLogo" width="24px"/>
            </div>
            <div class="company-name">{{companyName}}</div>
          </div>
        </template>
      </Header>
      <v-container class="d-flex flex-column" :class="{'justify-space-between': interviews.length == 0}">
        <v-tabs
          v-model="tab"
          color="#005AAA"
          background-color="transparent"
          height="48"
        >
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="full-width">
          <v-tab-item v-for="index in items.length" :key="index">
            <EmptyTab v-if="interviews.length == 0"/>
            <div class="d-flex flex-wrap mt-6" v-else>
              <Interview 
                v-for="(specificInterview, index) in interviews" 
                :key="index" 
                :interview="specificInterview" 
                class="mb-6"
              />
            </div>
          </v-tab-item>
        </v-tabs-items>
        <!-- <v-btn  @click="$router.push('/employee/panel')">employee</v-btn> -->
      <v-btn color="#005AAA" class="post-job-bt" @click="showInterviewForm">post a job</v-btn>
      </v-container>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import Interview from '@/components/Pages/Home/Interview.vue'
import EmptyTab from '@/components/Pages/Home/EmptyTab.vue'
import CreateInterviewForm from '@/components/Pages/Home/CreateInterviewForm.vue'
import Header from '@/components/Layouts/HomePage/Header.vue'
Component.registerHooks(['fetch'])

@Component({
  components:{
    Header,
    Interview,
    EmptyTab,
    CreateInterviewForm
  }
})
export default class Dashboard extends Vue {
    items = ["All", "On progress", "Ended"]
    tab = null
    interviews : any[] = []
    profile: any = {}
    showInterviewForm(){
      this.$dialog.show({
        component: CreateInterviewForm,
      })
    }
    async fetch(){
      // let loader = this.$loader.show(this.$refs.wrapper)
      try{
        this.profile = await this.$service.auth.getProfile()
        this.interviews = await this.$service.interviews.getAllInterviews();
      }catch(error){
            console.log('home => fetch => error')
      }
      // loader.hide()
    }
    @Watch('tab')
    async changeTab(newTab: any){
      try{
        if(newTab == 1){
          this.interviews = await this.$service.interviews.getOnProgressInterviews();
        }
        else if(newTab == 2){
          this.interviews = await this.$service.interviews.getEndedInterviews();
        }
        else{
          this.interviews = await this.$service.interviews.getAllInterviews();
        }
      }catch(error){
            console.log('home => changeTab => error')
      }
    }

    get companyName(){
      return this.profile.name
    }

    get companyLogo(){
      return this.profile.logo
    }
}
</script>