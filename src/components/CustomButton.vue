<template>
    <button @click="handleLogin" :type="type">{{ text }}</button>
</template>


<script setup>
import{defineProps} from "vue";
defineProps(["text", "type", "handleLogin"])
</script>

<style scoped>
    button{
        height: 60px;
        padding: 18px 24px;
        background-color: #3461FD;
        border: none;
        border-radius: 14px;
        color: white;
        box-shadow: 0 10px 30px -10px #3460fdc4;
        cursor: pointer;
    }
</style>