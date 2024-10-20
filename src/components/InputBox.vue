<template>
    <div>

        <input :type="props.type" :placeholder="props.placeholder">
        <p>{{errText}}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
    const props = defineProps(['type', 'placeholder', 'errText']);

    
</script>

<style scoped>
div{
    display: flex;
    flex-direction: column;
}
    input {
        background-color: #F5F9FE;
        outline: none;
        border: none;
        border-radius: 14px;
        padding: 18px 24px;
        font-size: 14px;
        height: 60px;
        transition: 0.3s;
    }
    input::placeholder{
        color: #7C8BA0;

    }
    input:focus{
        box-shadow:0 0 0 1px #3461FD inset;
        
    }
    p{
        font-size: 14px;
        padding-left: 10px;
        color: red;
    }
    
</style>