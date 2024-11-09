<template>
  <div class="page-box">
    <span class="label">{{ label }}</span>
    <span v-if="!isEdit" @click="changeEditStatus" class="page">{{ currentPage }}</span>
    <input v-show="isEdit" ref="inputField" v-model.number="currentPage" @keydown.enter="enterClick"
      @blur="changeEditStatus" :class="{ 'invalid-input': !isValid }" />
    <div v-if="!isValid" class="snackbar">
      숙제 페이지보다 완료 페이지가 커질 수 없습니다.
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick, defineEmits } from "vue";

const props = defineProps({ 'label': String, 'page': Number, 'limitPage': Number });
const emits = defineEmits(['updatePage']);
const isEdit = ref(false);
const currentPage = ref(props.page);
const inputField = ref(null); // Ref to input element
const isValid = ref(true); // 유효성 검사 플래그

// Edit mode 활성화/비활성화 함수
function changeEditStatus() {
  isEdit.value = !isEdit.value;

  if (isEdit.value) {
    isValid.value = true;
    nextTick(() => {
      setTimeout(() => {
        inputField.value.focus();
      }, 50); // 작은 지연을 줘서 렌더링 완료 후 focus
    });
  } else {
    // 유효성 검사

    if (props.label === '완료 Page' && currentPage.value > props.limitPage) {
      isValid.value = false; // 잘못된 값이 입력됨
      currentPage.value = props.page;
      return;
    }
    if (props.label === '숙제 Page' && currentPage.value < props.limitPage) {
      isValid.value = false; // 잘못된 값이 입력됨
      currentPage.value = props.page;

      return;
    }

    // 유효하면 부모로 값 전달
    isValid.value = true;
    emits('updatePage', currentPage.value);
  }
}

// 엔터 키 입력 시 포커스 해제
function enterClick() {
  nextTick(() => {
    inputField.value.blur();
  });
}


</script>

<style scoped>
input {
  font-size: 20px;
  color: #333;
  background-color: #f1f3f5;
  border: 1px solid #d0d4db;
  border-radius: 4px;
  text-align: center;
  padding: 5px;
  width: 40px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.snackbar {
  visibility: visible;
  min-width: 250px;
  background-color: #f44336;
  /* 빨간색 */
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s, fadeOut 0.5s 2.5s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    bottom: 50px;
  }

  50% {
    opacity: 1;
    bottom: 30px;
  }

  100% {
    opacity: 1;
    bottom: 30px;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    bottom: 30px;
  }

  100% {
    opacity: 0;
    bottom: 50px;
  }
}

input:focus {
  border-color: #3461fd;
  background-color: #ffffff;
}

.invalid-input {
  border-color: #e74c3c;
  /* Invalid input에 대한 빨간 테두리 */
  background-color: #f8d7da;
  /* 잘못된 입력 배경 */
}

.error-message {
  font-size: 12px;
  color: #e74c3c;
  /* 빨간 색 */
  margin-top: 5px;
  font-weight: bold;
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
