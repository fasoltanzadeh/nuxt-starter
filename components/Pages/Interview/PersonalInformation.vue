<style scoped lang="scss">
    .personal-information{
        background-color: #FAFAFA;
        width: 270px;
        padding: 16px;
        .field{
            color: #CCCCCC;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 9px;
        }
        .desc{
            font-size: 14px;
            color: #191919;
            margin-bottom: 12px;
        }
    }
</style>
<template>
    <div class="d-flex flex-column personal-information">
        <div v-if="information.jobTitle">
            <div class="field">Job title</div>
            <div class="desc">{{information.jobTitle}}</div>
        </div>
        <div v-if="information.experience">
            <div class="field">Experience</div>
            <div class="desc">{{information.experience}}</div>
        </div>
        <div v-if="information.location">
            <div class="field">Location</div>
            <div class="desc">{{information.location}}</div>
        </div>
        <div v-if="information.noticeDays">
            <div class="field">Notice</div>
            <div class="desc">{{information.noticeDays}} days</div>
        </div>
        <div v-if="information.workPermit != undefined">
            <div class="field">Work Permit</div>
            <div class="desc">{{information.workPermit ? `Yes` : `No`}}</div>
        </div>
        <div v-if="information.languages != ``">
            <div class="field" >Language</div>
            <div class="desc">{{languages}}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class TextAnswer extends Vue {
    @Prop()
    readonly information! : any

    get languages(){
        let langs = ""
        if(this.information.languages){
            for (let i = 0; i < this.information.languages.length ; i++) {
                if(i > 0)
                    langs += ', '
                langs += this.information.languages[i];
            }
        }
        return langs
    }
}
</script>