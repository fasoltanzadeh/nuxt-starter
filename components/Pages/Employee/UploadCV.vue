<style lang="scss" scoped>
    .upload-box{
        width: 444px;
        height: 337px;
        border: #d3d3d3 5px dashed;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .desc{
            color: #005AAA;
            font-size: 16px;
            font-weight: bold;
            margin-top: 22.5px;
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
    .disable-events {
        pointer-events: none;
        opacity: 0.3;
    }
</style>
<template>
    <div class="d-flex flex-column align-end">
        <div class="upload-box" @click="$refs.uploadedFile.click()">
            <div class="d-flex flex-column justify-center align-center" v-if="!uploaded">
                <img src="/icons/upload.png" width="84px"/>
                <div class="desc">Upload your CV</div>
            </div>
            <div class="d-flex flex-column justify-center align-center" v-else>
                <img src="/icons/file.png" width="70px"/>
                <div class="mt-3">{{cv.name}}</div>
                <div class="desc">Edit</div>
            </div>
            <input type="file" ref="uploadedFile" hidden @change="handleFileUpload"/>
        </div>
        <v-btn id="cont-btn" color="#005AAA" class="continue-btn mt-4" @click="$emit('continue')" :class="{'disable-events': cv== undefined}">Submit and continue</v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class TextAnswer extends Vue {
    @Prop()
    readonly value! : any
    get cv(){
        return this.value
    }
    set cv(newVal){
        this.$emit('input', newVal)
    }
    uploaded = false
    
    handleFileUpload(){
        this.uploaded = true
        this.cv = (this.$refs.uploadedFile as any).files[0]
    }   
    editUploadedFile(){
        console.log(this.$refs.uploadedFile)
        console.log(this.cv)
        this.$refs.uploadedFile.value = null
        this.$refs.uploadedFile.click()
    }
    created(){
        // this.$nextTick(() => {
        //     document.getElementById('cont-btn')?.classList.remove('v-btn--disabled')      
        // })
    }
}
</script>