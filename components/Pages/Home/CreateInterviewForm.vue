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
        <div class="d-flex flex-column" v-if="page == 1">
            <div class="desc">Enter required information</div>
            <div class="d-flex fields-row">
                <v-text-field
                    label="Job type"
                    name="jobType"
                    data-vv-as="Job type"
                    v-model="form.jobType"
                    v-validate="'required'"
                    :error-messages="errors.collect('jobType')"
                    class="mr-8"
                />
                <v-text-field
                    label="Seniority"
                    name="seniority"
                    data-vv-as="Seniority"
                    v-validate="'required'"
                    v-model="form.seniority"
                    :error-messages="errors.collect('seniority')"
                />
            </div>
            <v-text-field
                label="Job title"
                name="title"
                v-model="form.jobTitle"
                data-vv-as="Job title"
                v-validate="'required'"
                class="field"
                :error-messages="errors.collect('title')"
            />
            <div class="d-flex fields-row">
                <v-text-field
                    label="Validity time"
                    name="validity"
                    v-model="form.validityTime"
                    data-vv-as="Validity time"
                    v-validate="'required'"
                    :error-messages="errors.collect('validity')"
                    class="mr-8"
                />
                <v-text-field
                    label="Location"
                    name="location"
                    v-model="form.location"
                    data-vv-as="Location"
                    :error-messages="errors.collect('location')"
                    v-validate="'required'"
                />
            </div>
            <v-btn color="#005AAA" @click="nextPage" class="continue-btn">Continue</v-btn>
        </div>
        <div class="d-flex flex-column" v-else>
            <v-autocomplete
                hide-details
                :items="competencies"
                :loading="loading"
                data-vv-as="Competency"
                v-validate="'required'"
                :error-messages="errors.collect('competency')"
                v-model="form.competency"
                @change="getQuestions"
                label="Competency"
                name="competency"
                class="competency"
            />
            <div class="related-questions">
                <div class="sub-title">Related questions</div>
                <div v-for="question in questions" :key="question">{{question}}</div>
            </div>
            <v-btn color="#4DBC54" class="confirm-btn" @click="createInterview">Confirm</v-btn>
        </div>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CreateInterviewForm extends Vue {
    form : any = {}
    page = 1
    competencies : any[] = []
    loading = false
    questions : any[] = []
    createInterview(){
        try{
            this.$service.interviews.createInterview(this.form)
        }catch(error){
            console.log('CreateInterviewForm => createInterview => error')
        }
        this.$emit('hide')
    }
    async nextPage(){
        let valid = await this.$validator.validate()
        if (valid) {
            this.page = this.page + 1
            this.loading = true
            try{
                this.competencies = await this.$service.interviews.getCompetency()
            }catch(error){
                console.log('CreateInterviewForm => nextPage => error')
            }            
            this.loading = false
        }
    }

    async getQuestions(){
        try{
            this.questions = await this.$service.interviews.getRelatedQuestions(this.form.competency)
        }catch(error){
            console.log('CreateInterviewForm => getQuestions => error')
        }
    }
}
</script>