<style lang="scss" scoped>
    .video-player{
        width: 484px;
    }
</style>
<template>
    <div class="d-flex flex-column video-player">
        <!-- <link href="//vjs.zencdn.net/5.4.6/video-js.min.css" rel=s"stylesheet"> -->
        <video 
            ref="interviewVideo" 
            class="video-js"
            preload="auto" 
            width="484" 
            height="337"
            controls
        >
            <source :src="videoUrl" type="video/mp4" />
        </video>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Watch } from 'vue-property-decorator'
@Component
export default class InterviewVideoPlayer extends Vue {
    @Prop()
    readonly videoUrl! : any
    @Watch('videoUrl')
    test(){
        this.$refs.interviewVideo.src = this.videoUrl
    }
}
</script>