<style lang="scss" scoped>
    .info-col{
        width: 557px;
        font-size: 30px;
    }
    .box-info{
        height: calc((100vh - 200px)/3);
        border: #707070 1px solid;
        padding-left: 51px;
        overflow: hidden;
        font-size: 30px;
        display: flex;
        align-items: center;
    }
    .bubbles{
        margin-top: 84.5px;
        height: calc(100vh - 160px);
    }
    .bubble{
        width: 30px;
        height: 30px;
        border: 1px solid #707070;
        margin: 0 69px;
        border-radius: 100%;
        &.active{
            background-color: #13E80A;
        }
    }
    .wrapper{
        margin-right: 248px;
    }
    .result{
        padding: 36px 83px;
        height: 100vh;
        width: 100vw;
    }
    .col-status{
        width: 160px;
        font-size: 30px;
        // height: calc(100vh - 149px);
    }
    .data{
        // width: 160px;
        // font-size: 30px;
        height: calc(100vh - 149px);
    }
    .divider{
        border-right: 5px solid #707070;
        height: calc((100vh - 312px)/2);
        margin: 15.5px 0;
        margin-right: 81.5px;
    }
</style>
<template>
    <div class="d-flex result">
        <div class="d-flex flex-column justify-space-between info-col">
            <div class="box-info">{{applicationInfo.fullName}}</div>
            <div class="box-info d-flex justify-space-between">
                {{applicationInfo.company}}
                <v-img :src="applicationInfo.logo" width="200"/>
            </div>
            <div class="box-info">{{applicationInfo.jobTitle}}</div>
        </div>
        <v-spacer/>
        <div class="d-flex flex-column date align-center col-status">
            <div class="mb-8">Date</div>
            <div class="d-flex flex-column justify-space-between align-center data">
                <div>{{applicationStatusHistory.submittedAt}}</div>
                <div>{{applicationStatusHistory.reviewedAt}}</div>
                <div>{{applicationStatusHistory.finalResultDate}}</div>
            </div>
        </div>
        <div class="d-flex flex-column bubbles">
            <div>
                <div class="bubble" :class="{active: applicationStatusHistory.submittedAt}"></div>
                <div class="divider"></div>
            </div>
            <div>
                <div class="bubble" :class="{active: applicationStatusHistory.reviewedAt}"></div>
                <div class="divider"></div>
            </div>
            <div class="bubble" :class="{active: applicationStatusHistory.finalResultDate}"></div>
        </div>
        <div class="d-flex flex-column align-center col-status">
            <div class="mb-8">Status</div>
            <div class="d-flex flex-column justify-space-between align-center data">
                <div>Submitted</div>
                <div>Reviewed</div>
                <div>Invite/Reject</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
Component.registerHooks(['fetch'])

@Component
export default class Result extends Vue {
    applicationInfo : any = {}
    applicationStatusHistory: any = {}
    async fetch(){
        this.applicationInfo = await this.$service.applications.getApplication(this.$route.params.id)
        console.log(this.applicationInfo)
        this.applicationStatusHistory = await this.$service.applications.getApplicationStatusHistory(this.$route.params.id)
    }


}
</script>
