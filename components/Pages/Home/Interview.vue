<style lang="scss" scoped>
    .interview{
        width: 319px;
        height: 176px;
        border-radius: 2px;
        border: #D3D3D3 1px solid;
        margin-right: 20px;
        background-color: #ffffff;
        .title{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 38px;
        }
        .bottom-nav{
            height: 44px;
            background-color: #FAFAFA;
            padding: 13px 12px;
        }
        .main-section{
            padding: 24px 16px 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            height: calc(100% - 44px);
        }
        .found-candidate-state{
            height: 28px;
            border-radius: 18px;
            font-size: 14px;
            font-weight: bold;
            background-color: #F2F2F2;
            color: #808080;
            padding: 5px 12px;
            &.found{
                background-color: #99BDDD;
                color: #005AAA;
            }
        }
        .time{
            font-size: 14px;
            color: #808080;
        }
        .candidates-count{
            height: 20px;
            border-radius: 8px;
            background-color: #FF7C05;
            color: #ffffff;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 7px;
            margin-right: 14px;
        }
    }
</style>
<template>
    <div class="interview">
        <div class="main-section">
            <div class="title">{{interview.jobTitle}}</div>
            <div class="found-candidate-state" :class="{found: interview.candidateCounts > 0}">{{interview.candidateCounts > 0 ? `Found candidates`: `Looking for candidates`}}</div>
        </div>
        <!-- <div>time</div> -->
        <div class="bottom-nav d-flex justify-space-between" @click="gotoInterview">
            <div class="time">
                {{formattedPostTime}}
            </div>
            <v-spacer/>
            <div class="candidates-count" v-if="interview.candidateCounts > 0">{{interview.candidateCounts}}</div>
            <v-icon size="16" color="#CCCCCC">la-angle-right</v-icon>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class Interview extends Vue {
    @Prop()
    interview! : any
    get formattedPostTime(){
        let diff = (new Date().getTime() - new Date(this.interview.postedAt).getTime())/1000
        let min = Math.floor(diff/60)
        let hour = Math.floor(min/60)
        let day = Math.floor(hour/24)
        if(day > 0)
            return day + ' day' + (day > 1 ? 's' : '') + ' ago'
        else if(hour > 0)
            return hour + ' hour' + (hour > 1 ? 's' : '') + ' ago'
        else if(min > 0)
            return min + ' min' + (min > 1 ? 's' : '') + ' ago'
        else
            return 'a few seconds ago'
    }
    gotoInterview(){
        this.$router.push('/interview')
    }
}
</script>