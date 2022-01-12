<style lang="scss" scoped>
    .section-wrapper{
        margin: 0 auto;
        max-width: 1010px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .interviewer{
        font-size: 14px;
        color: #707070;
    }
    .logo{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        border: #D3D3D3 solid 1px;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 19px;
    }
    .company-name{
        font-size: 24px;
        font-weight: bold;
    }
    .interviewer-name{
        font-size: 14px;
        font-weight: bold;
    }
    .video-wrapper{
        margin: 28px 122px 0 0;
    }
    .progress{
        margin-bottom: 55px;
        width: 157px;
    }
</style>
<template>
    <div class="section-wrapper">
        <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
                <div class="logo">
                    <img :src="interviewInfo.logo" width="80px"/>
                </div>
                <div class="d-flex flex-column">
                    <div class="company-name">{{interviewInfo.companyName}}</div>
                    <div class="interviewer">Interviewer</div>
                    <div class="interviewer-name">{{interviewInfo.interviewer}}</div>
                </div>
            </div>
            <div class="progress d-flex flex-column align-end">
                {{questionNumber}}/{{interviewInfo.questionsCount}}
                <v-progress-linear 
                    :value="questionNumber/(interviewInfo.questionsCount)*100"
                    color="#808080"
                    height="8"
                    rounded
                    background-color="#E6E6E6"
                ></v-progress-linear>
            </div>
        </div>
        <div class="d-flex justify-space-between pt-5">
            <InterviewVideoPlayer :videoUrl="interviewInfo.videoUrl"/>
            <PersonalInformation 
                v-if="state == `info`"
                v-model="form" 
                @continue="state = `answerType`"
            />
            <AnswerType 
                v-if="state == `answerType`"
                v-model="answerType"
                @input="state = `answering`"
            />
            <VideoRecorder 
                v-if="answerType == `video` && state == `answering`" 
                v-model="answer" 
                @continue="answered"
            />
            <AudioRecorder 
                v-if="answerType == `audio` && state == `answering`" 
                v-model="answer" 
                @continue="answered"
            />
            <TextAnswer 
                v-if="answerType == `text` && state == `answering`" 
                v-model="answer" 
                @continue="answered"
            />
            <UploadCV 
                v-if="state == `uploadCV`"
                v-model="cvFile"
                @continue="onSubmit"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import InterviewVideoPlayer from '@/components/Pages/Employee/InterviewVideoPlayer.vue'
import PersonalInformation from '@/components/Pages/Employee/PersonalInformation.vue'
import AnswerType from '@/components/Pages/Employee/AnswerType.vue'
import VideoRecorder from '@/components/Pages/Employee/VideoRecorder.vue'
import AudioRecorder from '@/components/Pages/Employee/AudioRecorder.vue'
import TextAnswer from '@/components/Pages/Employee/TextAnswer.vue'
import UploadCV from '@/components/Pages/Employee/UploadCV.vue'
Component.registerHooks(['fetch'])

@Component({
    layout: 'user-panel',
    components: {
        InterviewVideoPlayer,
        PersonalInformation,
        AnswerType,
        VideoRecorder,
        AudioRecorder,
        TextAnswer,
        UploadCV
    }
})
export default class Panel extends Vue {
    form = {}
    state = "info"
    answer: any = null
    answerType = ""
    questionNumber = 1
    answers : any[] = []
    cvFile :any = null
    interviewInfo : any = {}
    async fetch(){
        this.interviewInfo = await this.$service.applications.getInterviewInfo();
    }

    answered(){
        this.answers.push({
            answerType: this.answerType,
            answer: this.answer,
            questionNumber: this.questionNumber
        })
        if(this.questionNumber == this.interviewInfo.questionsCount){
            this.state = 'uploadCV'
        }else{
            this.questionNumber += 1
            this.state = 'answerType'
        }
    }
    async onSubmit(){
        await this.$service.applications.apply(this.answer, this.cvFile)
    }
}
</script>