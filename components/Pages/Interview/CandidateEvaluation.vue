<style scoped lang="scss">
    .evaluation{
        background-color: #FAFAFA;
        width: 470px;
        padding: 25px 30px;
        margin-right: 28px;
        .skill{
            font-size: 14px;
            font-weight: bold;
        }
        .progress-bar{
            width: 200px;
        }
    }
</style>
<template>
    <div class="d-flex flex-column justify-start evaluation">
        <div v-for="(evaluationItem, index) in evaluation" :key="index" class="d-flex justify-space-between mb-2">
            <div class="skill">{{evaluationItem.skill}}</div>
            <v-progress-linear
                color="#6A87CD"
                background-color="#BECCEA"
                height="9"
                :value="evaluationItem.score"
                rounded
                class="progress-bar"
            ></v-progress-linear>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class TextAnswer extends Vue {
    @Prop()
    readonly evaluation! : any[]
    
}
</script>