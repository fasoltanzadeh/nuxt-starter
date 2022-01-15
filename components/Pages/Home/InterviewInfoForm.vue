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
    <div class="d-flex flex-column">
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class InterviewInfoForm extends Vue {
    @Prop()
    readonly value! : any
    get form(){
        return this.value
    }
    set form(newVal){
        this.$emit('input', newVal)
    }

    async nextPage(){
        let valid = await this.$validator.validate()
        if (valid) {
            this.$emit('continue')
        }
    }
}
</script>