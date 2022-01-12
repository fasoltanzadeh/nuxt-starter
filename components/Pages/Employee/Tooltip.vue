<style lang="scss" scoped>
    .tooltip-box { 
        position: relative;
        display: inline-block;
    }

    .tooltip-box:hover .tooltip{
        opacity: 1;
    }

    .tooltip { 
        color: #ffffff;
        text-align: center;
        padding: 4px 0;
        border-radius: 4px;
        padding: 6px 0;
        width: 149px!important;
        bottom: 120%;
        right: -100%;
        opacity: 0;
        transition: opacity 1s;
        position: absolute;
        z-index: 9;
        background: rgba(0, 0, 0, 0.7);
    }
    .text::after {
        content: " ";
        position: absolute;
        z-index: 100;
        top: 100%;
        right: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        opacity: 0.7;
        border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
    }
    .text{
        font-size: 16px;
        font-weight: bold;
        // height: 19px;
    }
</style>
<template>
    <div class="tooltip-box">
        <slot/>
        <div class="tooltip">
            <span class="text">{{ text }}</span>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component
    export default class Service extends Vue{
        @Prop({
            type: String,
            required: true
        })
        readonly text!: String
    }
</script>