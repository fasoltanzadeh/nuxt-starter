<style lang="scss" scoped>
    .camera{
        width: 444px;
        height: 337px;
        border: #d3d3d3 5px dashed;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        .feed{
            width: 420px;
            height: 313px;
            background-color: transparent;
            border-radius: 8px;
            position: relative;
            .record-btn-tooltip{
                position: absolute;
                bottom: 21px;
                left: calc(50% - 25.5px);
                z-index: 10;
                height: 51px;
                .record-btn{
                    border: solid #ffffff 7px;
                    border-radius: 100%;
                    background-color: #F70000;
                    width: 51px;
                    height: 51px;
                }
            }
            .stop-btn{
                box-shadow: 0 0 0 12px #ffffff;
                border-radius: 8px;
                background-color: #181818;
                width: 27px;
                height: 27px;
                position: absolute;
                bottom: 29px;
                left: calc(50% - 16px);
                z-index: 10;
            }
            .play-btn{
                background-color: #ffffff;
                width: 56px;
                height: 56px;
                border-radius: 100%;
                position: absolute;
                bottom: calc(50% - 28px);
                left: calc(50% - 28px);
                z-index: 10;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .duration{
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                position: absolute;
                bottom: 12px;
                left: 12.5px;
                z-index: 10;
                .record-sign{
                    background-color: #F70000;
                    width: 12px;
                    height: 12px;
                    border-radius: 100%;
                    margin-right: 5.5px;
                }
            }
            .retake-btn{
                display: flex;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                position: absolute;
                bottom: 12px;
                right: 16.5px;
                z-index: 10;
            }
        }
    }
    .continue-btn{
        // padding: 15px 35px;
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
        height: 48px !important;
        width: 228px;
        border-radius: 2px;
        text-transform: none;
    }
</style>
<template>
    <div class="d-flex flex-column align-end">
        <div class="camera mb-4">
            <div class="feed">
                <video ref="video" width="420" height="313" preload="auto" autoplay muted></video>
                <div class="record-btn-tooltip" v-if="!recording && !recorded">   
                    <Tooltip
                        text="Press to record"
                    >
                        <div @click="startRecordingVideo" class="record-btn"></div>
                    </Tooltip>
                </div>
                <div  @click="stopRecordingVideo" class="stop-btn" v-if="recording && !recorded"></div>
                <div  @click="playVideo" class="play-btn" v-if="recorded && !playing">
                    <img src="/icons/play.png" width="21px" height="26px"/>
                </div>
                <div class="duration d-flex" v-if="recording | (recorded & !playing)">
                    <div class="record-sign" v-if="recording"></div>
                    {{formattedRecordingTime}}
                </div>
                <div class="retake-btn" v-if="recorded && !playing" @click="retakeVideo">
                    <img src="/icons/white-pencil.png" width="19px" height="19px" class="mr-1"/>
                    Retake
                </div>
            </div>
        </div>
        <v-btn color="#005AAA" v-if="recorded" class="continue-btn" @click="onSubmit">Submit and continue</v-btn>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tooltip from './Tooltip.vue'

@Component({
    components:{
        Tooltip
    }
})
export default class VideoAnswer extends Vue {
    @Prop()
    readonly value! : any
    get answer(){
        return this.value
    }
    set answer(newVal){
        this.$emit('input', newVal)
    }
    recorded = false
    recording = false
    mediaRecorder: any = null
    recordedChunks : BlobPart[] = []
    video : any
    stream : any
    playing = false
    duration = ""
    videoDuration = 0
    recordingTime = 0
    timer: any
    elapsedTime = 0
    file: any = {}
    async mounted(){
        this.video = this.$refs.video as HTMLMediaElement
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){alert('oh no')}
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        this.video.srcObject = this.stream
        this.mediaRecorder = new MediaRecorder(this.stream);
        
    }
    async startRecordingVideo(){
        this.recording = true
        console.log("recorder started");
        this.mediaRecorder.ondataavailable = (e : any) => {
            this.recordedChunks.push(e.data);
            this.stream.getTracks()
        }
        this.mediaRecorder.start();
        this.startStopwatch();
        console.log(this.mediaRecorder.state);
        this.mediaRecorder.onstop = (e : any) => {
            console.log("recorder stopped");
            const recordedBlob = new Blob(this.recordedChunks, { type: "video/mp4" });
            const videoUrl = window.URL.createObjectURL(recordedBlob);
            this.video.src = videoUrl;
            this.file = {
                blob: recordedBlob,
                size: recordedBlob.size,
                duration: this.elapsedTime,
                type: recordedBlob.type,
                url: videoUrl,
            }
            this.video.autoplay = false
            this.video.muted = false
            this.video.srcObject = null
            this.recorded = true
            this.recordedChunks = []
        }
        this.video.play();
    }
    stopRecordingVideo(){
        this.stopStopwatch();
        this.mediaRecorder?.stop();
        console.log(this.mediaRecorder?.state);
        this.recording = false
        this.recorded = true
    }
    playVideo(){
        this.playing = true
        this.video.play()
        this.video.addEventListener('ended', () => this.playing =false)
    }
    retakeVideo(){
        this.recorded = false
        this.video.src = null;
        this.video.srcObject = this.stream
        this.video.autoplay = true
        this.video.muted = true
        this.video.play();
    }
    get formattedRecordingTime(){
        const date = new Date(0, 0, 0);
        date.setSeconds(this.elapsedTime / 1000);
        var min = date.getMinutes()
        var sec = date.getSeconds()
        return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    }
    startStopwatch() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    }
    stopStopwatch() {
      clearInterval(this.timer);
    }
    onSubmit(){
        this.answer = this.file
        this.$emit('continue')
    }
}
</script>