<template>
    <div @click="onClickTag(label)" class="tag-box">{{label}}:{{value}} <div class="x">x</div></div>
</template>

<script setup>
import {defineProps,defineEmits} from "vue";

defineProps(['label', 'value', 'id']);
const emit= defineEmits(['clickTag']);

const onClickTag = (target)=>{
    emit('clickTag', target);
}
</script>

<style scoped>
    .tag-box{
        border: 1px solid #3461FD;
        border-radius: 16px;
        padding: 5px 12px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        column-gap: 5px;
        align-items: center;
        background-color: #F5F9FE;
        color: #2A4ECA;
        cursor: pointer;
    }
    .x{
        background-color: #3461FD;
        border-radius: 100%;
        height: 18px;
        width: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 9px;
        color: #F5F9FE;
    }
</style>