<style scoped lang="scss">
    .empty-tab{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // margin-top: 100px;
        .title{
            color: #808080;
            font-size: 20px;
            font-weight: bold;
        }
        .desc{
            color: #808080;
            font-size: 16px;
            width: 351px;
        }
    }
</style>
<template>
    <div class="empty-tab">
        <div class="title mb-2">No interview created</div>
        <div class="desc">Use “post a job” button to create a new interview</div>
    </div>
</template>