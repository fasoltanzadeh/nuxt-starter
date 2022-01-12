<style lang="scss" scoped>
    .recorder{
        width: 444px;
        height: 337px;
        border: #d3d3d3 5px dashed;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding-top: 80px;
        .desc{
            margin-top: 50px;
            font-size: 16px;
            font-weight: bold;
            color: #808080;
            margin-bottom: 22px;
        }
        .record-btn-outer{
            border: solid #D3D3D3 4px;
            border-radius: 100%;
            background-color: #ffffff;
            width: 51px;
            height: 51px;
            display: flex;
            justify-content: center;
            align-items: center;
            .record-btn-inner{
                border: solid #ffffff 3px;
                border-radius: 100%;
                background-color: #F70000;
                width: 43px;
                height: 43px;  
            }
        }
        .stop-btn-outer{
            border: solid #D3D3D3 4px;
            border-radius: 15px;
            background-color: #ffffff;
            width: 51px;
            height: 51px;
            display: flex;
            justify-content: center;
            align-items: center;
            .stop-btn-inner{
                box-shadow: 0 0 0 8px #ffffff;
                border-radius: 8px;
                background-color: #181818;
                width: 27px;
                height: 27px;
            }
        }
        .audio-player{
            margin-top: 26.9px;
            width: 359px;
            .play-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 16.4px;
            }
            .pause-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 16.4px;
            }
            .time{
                color: #808080;
                font-size: 16px;
            }
        }
        .duration{
            color: #000000;
            font-size: 14px;
            font-weight: bold;
            margin: 12px 0 54px;
            .record-sign{
                background-color: #F70000;
                width: 12px;
                height: 12px;
                border-radius: 100%;
                margin-right: 8px;
            }
        }
        .retake-btn{
            display: flex;
            color: #000000;
            font-size: 14px;
            font-weight: bold;
            margin-top: 18.3px;
        }
    }
    .continue-btn{
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
        <div class="recorder d-flex flex-column mb-4">
            <img src="/icons/microphone.png" height="80"/>
            <div class="desc" v-if="!recording & !recorded">Press to record</div>
            <div class="duration d-flex" v-if="recording">
                <div class="record-sign"></div>
                Recording
                <div class="ml-2">{{formattedRecordingTime}}</div>
            </div>
            <div class="d-flex flex-column align-end" v-if="recorded">
                <div class="d-flex audio-player align-center">
                    <div @click="playAudio" class="play-btn" v-if="!playing">
                        <img src="/icons/play.png" width="18px"/>
                    </div>
                    <div @click="pauseAudio" class="pause-btn" v-if="playing">
                        <img src="/icons/pause.png" width="22px"/>
                    </div>
                    <v-progress-linear 
                        background-color="#E6E6E6"
                        :value="audioCurrentTime"
                        color="#979797"
                        height="8"
                        rounded
                        stream
                    ></v-progress-linear>
                </div>
                <div class="time">{{formattedRecordingTime}}/{{formattedDuration}}</div>
            </div>
            <audio ref="audio" preload="auto"></audio>
            <div @click="startRecordingAudio" class="record-btn-outer" v-if="!recording & !recorded"><div class="record-btn-inner"></div></div>
            <div @click="stopRecordingAudio" class="stop-btn-outer" v-if="recording"><div class="stop-btn-inner"></div></div>
            <div class="retake-btn" v-if="recorded" @click="retakeAudio">
                <img src="/icons/black-pencil.png" width="19px" height="19px" class="mr-1"/>
                Retake
            </div>
        </div>
        <v-btn color="#005AAA" class="continue-btn" v-if="recorded" @click="onSubmit">Submit and continue</v-btn>
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
export default class AudioAnswer extends Vue {
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
    audio : any
    stream : any
    playing = false
    timer: any
    elapsedTime = 0
    recordingTime = 0
    file: any = {}
    async startRecordingAudio(){
        this.recording = true
        console.log("recorder started");
        this.audio = this.$refs.audio as HTMLMediaElement
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){alert('oh no')}
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: true
        })
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.startStopwatch()
        this.mediaRecorder.ondataavailable = (e : any) => {
            this.recordedChunks.push(e.data);
        }
        this.mediaRecorder.start();
        console.log(this.mediaRecorder.state);
        this.mediaRecorder.onstop = (e : any) => {
            console.log("recorder stopped");
            const recordedBlob = new Blob(this.recordedChunks, { type: "audio/mp3" });
            const audioUrl = window.URL.createObjectURL(recordedBlob);
            this.file = {
                blob: recordedBlob,
                size: recordedBlob.size,
                duration: this.recordingTime,
                type: recordedBlob.type,
                url: audioUrl,
            }
            this.audio.src = audioUrl;
            this.recorded = true
            this.recordedChunks = []
        }
    }
    stopRecordingAudio(){
        this.mediaRecorder?.stop();
        console.log(this.mediaRecorder?.state);
        this.recordingTime = this.elapsedTime
        this.stopStopwatch()
        this.elapsedTime = 0
        this.recording = false
        this.recorded = true
    }
    playAudio(){
        this.playing = true
        this.startStopwatch(this.recordingTime)
        this.audio.play()
        this.audio.addEventListener('ended', () => {
            this.playing =false
            this.elapsedTime = 0
            this.stopStopwatch()
        })
    }
    pauseAudio(){
        this.playing = false
        this.audio.pause()
    }
    retakeAudio(){
        this.recorded = false
        this.audio.src = null;
        this.elapsedTime = 0
        this.recordingTime = 0
        this.stopStopwatch()
        this.startRecordingAudio()
    }
    
    get formattedRecordingTime(){
        const date = new Date(0, 0, 0);
        date.setSeconds(this.elapsedTime / 1000);
        var min = date.getMinutes()
        var sec = date.getSeconds()
        return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    }
    get formattedDuration(){
        const date = new Date(0, 0, 0);
        date.setSeconds(this.recordingTime / 1000);
        var min = date.getMinutes()
        var sec = date.getSeconds()
        return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    }
    startStopwatch(end? : any) {
      this.timer = setInterval(() => {
          this.elapsedTime += 1000;
          if(end && this.elapsedTime == end){
              this.stopStopwatch()
          }
      }, 1000);
    }
    stopStopwatch() {
      clearInterval(this.timer);
    }

    get audioCurrentTime(){
        return this.elapsedTime/this.recordingTime * 100
    }
    
    onSubmit(){
        this.answer = this.file
        this.$emit('continue')
    }

}
</script>