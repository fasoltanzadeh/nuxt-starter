<style lang="scss" scoped>
    .question{
        font-size: 32px;
        color: #191919;
        width: 337px;
        margin-bottom: 33px;
    }
    .types{
        width: 394px;
        .answer-type{
            height: 145px;
            width: 122px;
            border: #D3D3D3 solid 4px;
            border-radius: 8px;
            padding-bottom: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }
        .answer-img{
        }
    }
</style>
<template>
    <div class="d-flex flex-column">
        <div class="question">How would you like to answer?</div>
        <div class="d-flex justify-space-between types">
            <div @click="answerType = `video`" class="answer-type">
                <v-img 
                    src="/icons/video-camera.png" 
                    width="44px" 
                    height="26px" 
                    contain/>
                <div class="type-title">
                    Video
                </div>
            </div>
            <div @click="answerType = `audio`" class="answer-type">
                <v-img src="/icons/microphone.png" 
                    width="30px" 
                    height="44px" 
                    class="answer-img"
                    contain/>
                <div class="type-title">
                    Audio
                </div>
            </div>
            <div @click="answerType = `text`" class="answer-type">
                <v-img 
                    src="/icons/text.png"
                    width="19px" 
                    height="37px"
                    contain
                />
                <div class="type-title">
                    Text
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class AnswerType extends Vue {
    @Prop()
    readonly value! : any
    get answerType(){
        return this.value
    }
    set answerType(newVal){
        this.$emit('input', newVal)
    }
}
</script>