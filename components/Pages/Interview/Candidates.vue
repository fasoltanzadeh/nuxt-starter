<style scoped lang="scss">
    .table-header{
        font-size: 12px;
        font-weight: normal;
        color: #808080;
    }
    .candidates{
        width: 522px;
    }
    .active{
        background-color: #D6E5F1;
    }
</style>
<template>
    <v-simple-table class="candidates">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left table-header">
                        Rank
                    </th>
                    <th class="text-left table-header name">
                        Candidate
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(candidate, index) in candidates"
                    :key="index"
                    @click="activeIndex = index"
                >
                    <td :class="{active: index == activeIndex}">
                        <img src="/icons/rank1.png" v-if="index == 0" width="24px"/>
                        <img src="/icons/rank2.png" v-if="index == 1" width="24px"/>
                        <img src="/icons/rank3.png" v-if="index == 2" width="24px"/>
                        {{ index > 2 ? index : ''}}
                    </td>
                    <td class="font-weight-bold" :class="{active: index == activeIndex}">{{ candidate.candidateName}} </td>
                    <td :class="{active: index == activeIndex}">
                        <div class="d-flex justify-space-between align-center">
                            <div>
                                <div class="table-header">Score</div>
                                <div class="font-weight-bold">
                                    {{candidate.score}}
                                </div>
                            </div>
                            <v-icon size="13" color="#707070" v-if="index == activeIndex">la-angle-right</v-icon>
                        </div>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class TextAnswer extends Vue {
    @Prop()
    readonly value!: any

    get activeIndex(){
        return this.value
    }

    set activeIndex(newIndex: any){
        this.$emit('input', newIndex)
    }

    @Prop()
    readonly candidates! : any[]
    
}
</script>