<style scoped lang="scss">
    .text-answer{
        width: 444px;
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
    ::v-deep{
        .text textarea{
            width: 444px;
            height: 337px !important;
            border: #d3d3d3 5px solid;
            border-radius: 8px;
            padding: 23px 29px;
            margin: 0 !important;
        }
    }
</style>
<template>
    <div class="d-flex flex-column justify-start align-end text-answer">
        <v-textarea
            v-model="ans"
            class="text ma-0"
            flat solo hide-details
            placeholder="Type here ..."
        />
        <v-btn color="#005AAA" class="continue-btn mt-4" @click="onSubmit">Submit and continue</v-btn>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class TextAnswer extends Vue {
    @Prop()
    readonly value! : any
    ans = ''
    get answer(){
        return this.value
    }
    set answer(newVal){
        this.$emit('input', newVal)
    }
    onSubmit(){
        this.answer = this.ans
        this.$emit('continue')
    }
}
</script>