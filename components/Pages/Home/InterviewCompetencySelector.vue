<style lang="scss" scoped>
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
        overflow: hidden !important;
        max-height: 267px !important;
        height: 267px !important;
        .sub-title{
            font-size: 14px;
            color: #808080;
        }
        .questions-box{
            overflow-y: auto !important;
            max-height: 200px !important;
        }
    }
</style>

<template>
    <div>
        <v-autocomplete
            label="Competency"
            name="competency"
            v-model="selectedCompetencies"
            hide-details
            :items="competencies"
            :loading="loading"
            data-vv-as="Competency"
            v-validate="'required'"
            :error-messages="errors.collect('competency')"
            @change="changeSelectedCompetencies"
            class="competency"
            multiple
        />
        <div class="related-questions">
            <div class="sub-title">Related questions</div>
            <div  class="questions-box">
                <div v-for="(selectedCompetency, index) in selectedCompetencies" :key="index">
                    <v-checkbox 
                        v-for="question in questions[selectedCompetency]"
                        :key="question"
                        v-model="selectedQuestions"
                        @change="updateSelectedCompetenciesQuestionsCount(selectedCompetency, question)"
                        :label="question"
                        :value="question"
                        :disabled="isDisabled(selectedCompetency, question)"
                    ></v-checkbox>
                    <!-- {{selectedCompetenciesQuestions}} -->
                </div>
            </div>
        </div>
        <v-btn color="#4DBC54" class="confirm-btn" @click="createInterview">Confirm</v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class InterviewCompetencySelector extends Vue {
    @Prop()
    readonly competencies! : any[]

    @Prop()
    readonly questions! : any

    @Prop()
    readonly loading! : boolean
    
    selectedCompetencies : string[] = []
    selectedQuestions : any[] = []
    selectedCompetenciesQuestionsCount: any = {}
    
    createInterview(){
        this.$emit('createInterview', this.selectedQuestions)
    }

    updateSelectedCompetenciesQuestionsCount(selectedCompetency : any, question: any){
        if(this.selectedQuestions.includes(question)){
            if(this.selectedCompetenciesQuestionsCount[selectedCompetency] != undefined){
                this.selectedCompetenciesQuestionsCount[selectedCompetency] += 1
            }else{
                this.selectedCompetenciesQuestionsCount[selectedCompetency] = 1
            }
        }else{
            this.selectedCompetenciesQuestionsCount[selectedCompetency] -= 1
        }
    }
    isDisabled(selectedCompetency : any, question: any){
        if(this.selectedQuestions.includes(question) || this.selectedCompetenciesQuestionsCount[selectedCompetency] == undefined || this.selectedCompetenciesQuestionsCount[selectedCompetency] < 5){
            return false
        }
        return true
    }

    changeSelectedCompetencies(){
        this.$emit('changeSelectedCompetencies', this.selectedCompetencies)
    }
}
</script>