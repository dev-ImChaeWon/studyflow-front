<template>
  <div class="student-row">
    <div class="grid-cell student-name">{{studentName}}({{studentId}})</div>
    <div class="grid-cell">
      <input :checked="isAttend===null" :id="`no-status-${studentId}`" type="radio" :name="`status-${studentId}`" value="no-status">
      <label :for="`no-status-${studentId}`" class="radio-label gray">
        <span class="icon">-</span> <!-- 회색 상태없음 아이콘 -->
      </label>
    </div>
    <div class="grid-cell">
      <input :checked="isAttend === '출석'" :id="`present-${studentId}`" type="radio" :name="`status-${studentId}`" value="present">
      <label :for="`present-${studentId}`" class="radio-label green">
        <span class="icon">P</span> <!-- 초록색 출석 아이콘 -->
      </label>
    </div>
    <div class="grid-cell">
      <input :checked="isAttend === '결석'" :id="`absent-${studentId}`" type="radio" :name="`status-${studentId}`" value="absent">
      <label :for="`absent-${studentId}`" class="radio-label red">
        <span class="icon">A</span> <!-- 빨간색 결석 아이콘 -->
      </label>
    </div>
    <div class="grid-cell">
      <input :checked="isAttend === '지각'" :id="`late-${studentId}`" type="radio" :name="`status-${studentId}`" value="late">
      <label :for="`late-${studentId}`" class="radio-label yellow">
        <span class="icon">L</span> <!-- 진한 노란색 지각 아이콘 -->
      </label>
    </div>
    <div class="grid-cell">
      <input :checked="isAttend === '조퇴'" :id="`leave-early-${studentId}`" type="radio" :name="`status-${studentId}`" value="leave-early">
      <label :for="`leave-early-${studentId}`" class="radio-label orange">
        <span class="icon">LE</span> <!-- 주황색 조퇴 아이콘 -->
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(['studentId', 'studentName', 'isAttend']);

</script>

<style scoped>
.grid-header,
.grid-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  /* border-bottom 추가 */
}



.grid-cell.student-name {
  justify-content: flex-start;
}

.student-row {
  display: contents;
}

/* 라디오 버튼 숨기기 */
input[type="radio"] {
    display: none;
}

/* 각 상태별 색상 */
input[type="radio"]:checked + .radio-label.gray {
    background-color: #ccc; /* 회색 */
}
input[type="radio"]:checked + .radio-label.green {
    background-color: #28a745; /* 초록색 */
}
input[type="radio"]:checked + .radio-label.red {
    background-color: #dc3545; /* 빨간색 */
}
input[type="radio"]:checked + .radio-label.yellow {
    background-color: #ffc107; /* 진한 노란색 */
}
input[type="radio"]:checked + .radio-label.orange {
    background-color: #fd7e14; /* 주황색 */
    
}

/* 각 상태별 색상 */
input[type="radio"]:checked + .radio-label .icon {
    color: #242424; /* 회색 */
    font-weight: bold;
}

label{
  border: 1px solid rgb(228, 228, 228);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon{
  color: #ddd;
  font-size: 14px;
}
</style>