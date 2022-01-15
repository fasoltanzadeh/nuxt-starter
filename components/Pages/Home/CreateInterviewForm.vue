<style lang="scss" scoped>
    .interview-form{
        width: calc(100vw - 80px);
        padding: 37px 31px;
        .title{
            font-size: 20px;
            color: #000000;
        }
        .desc{
            font-size: 14px;
            margin: 41px 0 11px;
            color: #808080;
        }
        .fields-row{
            width: 560px;
        }
        .field{
            width: 264px;
        }
        .continue-btn{
            width: 177px;
            height: 48px;
            color: #ffffff;
            text-transform: none;
            margin-top: 37px;
        }
        .confirm-btn{
            width: 177px;
            height: 48px;
            color: #ffffff;
            text-transform: none;
            margin-top: 36px;
        }
        .competency{
            width: 521px;
            margin-bottom: 53px;
        }
        .related-questions{
            padding: 24px;
            background-color: #FAFAFA;
            .sub-title{
                font-size: 14px;
                color: #808080;
            }
        }
        
    }
</style>
<template>
    <v-card class="interview-form">
        <div class="title">
            <v-icon color="#000000" @click="page == 1 ? $emit('hide') : page = 1" size="20" class="mr-3">la-arrow-left</v-icon>
            New interview
        </div>
        <InterviewInfoForm 
            v-if="page == 1" 
            v-model="form" 
            @continue="nextPage"
        />
        <InterviewCompetencySelector 
            v-else
            :questions="competenciesQuestions"
            :competencies="competencies"
            :loading="loading"
            @changeSelectedCompetencies="changeSelectedCompetencies"
            @createInterview="createInterview"
        />
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import InterviewCompetencySelector from '@/components/Pages/Home/InterviewCompetencySelector.vue'
import InterviewInfoForm from '@/components/Pages/Home/InterviewInfoForm.vue'
@Component({
    components: {
        InterviewCompetencySelector,
        InterviewInfoForm
    }
})
export default class CreateInterviewForm extends Vue {
    form : any = {}
    page = 1
    competencies : any[] = []
    loading = false
    competenciesQuestions : any = {}
    selectedCompetenciesQuestions : any = {}
    
    createInterview(questions: any[]){
        try{
            this.$service.interviews.createInterview(this.form, questions)
        }catch(error){
            console.log('CreateInterviewForm => createInterview => error')
        }
        this.$emit('hide')
    }
    async nextPage(){
        this.page = this.page + 1
        this.loading = true
        try{
            this.competencies = await this.$service.interviews.getCompetency()
        }catch(error){
            console.log('CreateInterviewForm => nextPage => error')
        }            
        this.loading = false
    }

    async changeSelectedCompetencies(selectedCompetencies : string[]){
        try{
            this.competenciesQuestions = await this.$service.interviews.getRelatedQuestions(selectedCompetencies)
        }catch(error){
            console.log('CreateInterviewForm => getQuestions => error')
        }
    }


}
</script>