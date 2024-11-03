<template>
  <div class="status-toggle">
      <button 
          :class="{ active: currentStatus === 'complete' }" 
          @click="setStatus('complete')">완료
      </button>
      <button 
          :class="{ active: currentStatus === 'not-complete' }" 
          @click="setStatus('not-complete')">미완료
      </button>
      <button 
          :class="{ active: currentStatus === 'no-homework' }" 
          @click="setStatus('no-homework')">미부여
      </button>
  </div>
</template>

<script setup>
import { ref,defineEmits } from 'vue';
const emit = defineEmits(['updateStatus']);

const currentStatus = ref('complete'); // 초기 상태 설정

const setStatus = (status) => {
  currentStatus.value = status; // 상태 변경
  emit('updateStatus', status);
};




</script>

<style scoped>
.status-toggle {
  display: flex;
  gap: 10px;
  margin: 20px 0; /* 위치 조정 */
}

.status-toggle button {
  padding: 10px 15px;
  border: 1px solid #d1d1d1; /* 테두리 색상 */
  border-radius: 5px;
  background-color: white; /* 기본 배경색 */
  color: #000; /* 기본 텍스트 색상 */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.status-toggle button.active {
  background-color: #3461FD; /* 활성화된 버튼 색상 */
  color: white; /* 활성화된 버튼 텍스트 색상 */
  border-color: #3461FD; /* 활성화된 버튼 테두리 색상 */
}

.status-toggle button:hover {
  background-color: #F5F9FE; /* 호버 시 배경색 */
  color: black;
}
</style>
