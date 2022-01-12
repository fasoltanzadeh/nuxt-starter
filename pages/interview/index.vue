<style scoped lang="scss">
.wrapper{
  height: 100%;
  background-color: #FFFFFF;
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
.right-side{
  border-left: #CCCCCC 1px solid;
  padding-left: 20px;
}
.candidate-name{
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0 8px;
}
.approve-btn{
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  height: 48px !important;
  padding: 15px 25px;
  text-transform: none;
  margin-right: 45px;
}
.reject{
  font-size: 14px;
  font-weight: bold;
  color: #005AAA;
}
.header-job-title{
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
}
.text{
  color: #808080;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
}
.empty{
  background-image: url('~assets/map.png');
  background-size: 541px 228px;
  background-position: center;
}
</style>
<template>
    <section class="wrapper d-flex flex-column">
      <Header>
        <template v-slot:subtitle>
          <div class="d-flex align-center company-info">
            <v-icon color="#ffffff" @click="$router.push('/')">la-arrow-left</v-icon>
            <div class="header-job-title">{{candidatePersonalInformation.jobTitle}}</div>
          </div>
        </template>
      </Header>
      <v-container class="d-flex justify-space-between align-start" v-if="candidates.length>0">
        <Candidates :candidates="candidates" v-model="activeIndex" @input="getInfo"/>
        <div class="right-side">
          <div class="d-flex align-center">
            <div>
              <div class="candidate-name">
                {{candidatePersonalInformation.candidateName}}
              </div>
                {{candidatePersonalInformation.jobTitle}}
            </div>
            <v-spacer/>
            <v-btn color="#00AA27" class="approve-btn">Approve</v-btn>
            <div class="reject">Reject</div>
          </div>
          <v-divider class="my-6"/>
          <div class="d-flex justify-space-between align-start">
            <CandidateEvaluation :evaluation="candidateEvaluation"/>
            <PersonalInformation :information="candidatePersonalInformation"/>
          </div>
        </div>
      </v-container>
      <v-container class="d-flex flex-column align-center justify-center empty" v-else>
        <div class="text-center">
          <img src="/icons/search.png" width="50px" class="mt-8"/>
          <div class="text">You successfully posted the job</div>
          <div>Let us search between our candidates and get back to you soon 😎</div>
        </div>
      </v-container>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import EmptyTab from '@/components/Pages/Home/EmptyTab.vue'
import Header from '@/components/Layouts/HomePage/Header.vue'
import Candidates from '@/components/Pages/Interview/Candidates.vue'
import CandidateEvaluation from '@/components/Pages/Interview/CandidateEvaluation.vue'
import PersonalInformation from '@/components/Pages/Interview/PersonalInformation.vue'
Component.registerHooks(['fetch'])

@Component({
  components:{
    Header,
    EmptyTab,
    Candidates,
    CandidateEvaluation,
    PersonalInformation
  }
})
export default class Dashboard extends Vue {
    items = ["All", "On progress", "Ended"]
    tab = null
    interview : any = {}
    candidates: any[] = []
    candidateEvaluation: any = []
    candidatePersonalInformation : any = {}
    activeIndex = 0
    async fetch(){
      // let loader = this.$loader.show(this.$refs.wrapper)
      try{
        this.interview = await this.$service.interviews.getInterview()
        this.candidates = await this.$service.applications.getCandidates()
        await this.getInfo()
      }catch(error){
            console.log('interview => fetch => error')
      }
      // loader.hide()
    }
    @Watch('tab')
    async changeTab(newTab: any){
      
    }

    async getInfo(){
      this.candidateEvaluation = await this.$service.applications.getCandidateEvaluation()
      this.candidatePersonalInformation = await this.$service.applications.getCandidatePersonalInformation()
    }
}
</script>