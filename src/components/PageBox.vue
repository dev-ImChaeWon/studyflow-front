<template>
  <div class="page-box">
    <span class="label">{{label}}</span>
    <span v-if="!isEdit" @click="changeEditStatus" class="page">{{ currentPage }}</span>
    <input v-else ref="inputField" v-model="currentPage" @keydown.enter="enterClick" @blur="changeEditStatus" />
  </div>

</template>


<script setup>
import {defineProps , ref, nextTick, defineEmits} from "vue";

const props = defineProps(['label', 'page']);
const emits = defineEmits(['updatePage'])
const isEdit = ref(false);
const currentPage = ref(props.page);
const inputField = ref(null); // Ref to input element

function changeEditStatus() {
  isEdit.value = !isEdit.value;

  if (isEdit.value) {
    nextTick(() => inputField.value.focus()); // Focus on input when edit mode is activated
  }else{
    emits('updatePage', currentPage.value);
  }
}

function enterClick() {
  nextTick(() => {
    inputField.value.blur(); // 포커스를 해제
  });

}

</script>

<style scoped>
input {
  font-size: 20px;
  color: #333;
  background-color: #f1f3f5; /* Light background for visibility */
  border: 1px solid #d0d4db; /* Subtle border color */
  border-radius: 4px;
  text-align: center;
  padding: 5px;
  width: 40px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #3461fd; /* Accent color on focus */
  background-color: #ffffff;
}


.page-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fc;
  border-radius: 8px;
  padding: 10px;
  margin: 0 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.label {
  font-size: 14px;
  color: #606060;
  margin-bottom: 5px;
}

.page {
  font-size: 28px;
  color: #000000;
}

</style>