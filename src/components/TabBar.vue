<template>   
        <div class="tab-container">
            <div class="tabs" :class="tabNo===1 && 'active'" @click="changeTab(1)">원생관리</div>
            <div class="tabs" :class="tabNo===2 && 'active'" @click="changeTab(2)">학습관리</div>
            <div class="tabs" :class="tabNo===3 && 'active'" @click="changeTab(3)">수납관리</div>
            <div class="tabs" :class="tabNo===4 && 'active'" @click="changeTab(4)">환경설정</div>
        </div>

</template>

<script setup>

import {defineProps} from "vue";
defineProps(["tabNo", "changeTab"])

</script>

<style scoped>

    .tab-container{
        display: flex;
        padding: 0 20px;
        justify-content: space-between;
        column-gap: 5px;
    }
    .tabs{
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 7px;
        cursor: pointer;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;

    }
    .active{
        border-bottom: 2px solid #3461FD;
        color: #3461FD;
        font-weight: bold;
    }
    
</style>