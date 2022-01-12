<style lang="scss" scoped>
    .input-field{
        width: 404px;
    }
    .continue-btn{
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        text-transform: none;
    }
</style>
<template>
    <div class="d-flex flex-column">
        <v-text-field
            label="Full name"
            name="fullName"
            v-model="form.fullName"
            hide-details
            class="input-field"
            dense
            v-validate="'required'"
            :error-messages="errors.collect('fullName')"
            data-vv-as="Full name"
        />
        <v-text-field
            label="Email"
            name="email"
            v-model="form.email"
            hide-details
            dense
            class="input-field"
            v-validate="'required'"
            :error-messages="errors.collect('email')"
            data-vv-as="Email"
        />
        <v-autocomplete
            hide-details
            :items="experiences"
            v-model="form.experience"
            label="Experience"
            name="experience"
            multiple
            class="input-field pt-0"
            v-validate="'required'"
            :error-messages="errors.collect('experience')"
            data-vv-as="Experience"
        />
        <v-autocomplete
            hide-details
            :items="locations"
            v-model="form.location"
            label="Location"
            name="location"
            class="input-field pt-0"
            v-validate="'required'"
            :error-messages="errors.collect('location')"
            data-vv-as="Location"
        />
        <v-btn color="#005AAA" class="continue-btn" @click="nextState">Continue</v-btn>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class PersonalInformation extends Vue {
    @Prop()
    readonly value! : any
    get form(){
        return this.value
    }
    set form(newVal){
        this.$emit('input', newVal)
    }

    experiences : any[] = []
    locations : any[] = []
    async fetch(){
        this.experiences = await this.$service.applications.getExperiences();
        this.locations = await this.$service.applications.getLocations();
    }

    async nextState(){
        let valid = await this.$validator.validate()
        if (valid) {
            this.$emit('continue')
        }
    }
}
</script>