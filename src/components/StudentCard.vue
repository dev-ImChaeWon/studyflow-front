<template>
  <div class="card">
    <div class="card-header">
      <h2 class="student-name">
        {{ studentName }}({{ studentId }})
      </h2>
      <div class="status complete">
        <span class="percentage">100%</span>
        <span class="status-icon"><svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M511.9 183.1c-181.8 0-329.1 147.4-329.1 329.1 0 181.8 147.4 329.1 329.1 329.1C693.6 841.3 841 694 841 512.2S693.6 183.1 511.9 183.1z m0 585.1c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"
              fill="green" />
            <path d="M487.4 556.8l-97.8-87.6-48.8 54.4 153.1 137.2 192.2-221.2-55.2-48z" fill="green" />
          </svg></span>
      </div>
    </div>
    <div class="card-body">
      <div class="homework-container">
        <h4>국어</h4>
        <div class="grid-container">
          <p class="grid-header">전체</p>
          <p class="grid-header">완료</p>
          <p class="grid-header">Comment</p>
          <p>15</p>
          <p>4</p>
          <p>
            <span style="flex-grow: 1;">
              아파서 미완료했음
            </span>
          </p>
          <p>10</p>
          <p>10</p>
          <p>
            <span style="flex-grow: 1;">
              완료함
            </span>
          </p>
        </div>

      </div>
      <div class="homework-container">
        <h4>수학</h4>
        <div class="grid-container">
          <p class="grid-header">전체</p>
          <p class="grid-header">완료</p>
          <p class="grid-header">Comment</p>
          <p>15</p>
          <p>15</p>
          <p>
            <span style="flex-grow: 1;">
              완료함
            </span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(['studentName', 'studentId']);
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;

}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.status {
  display: flex;
  column-gap: 5px;
  align-items: center;
}

.status.complete {
  color: green;
}

.status-icon {
  display: flex;
  justify-content: center;
  align-items: center;

}

.grid-container {
  margin-left: 20px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  justify-items: stretch;
  row-gap: 5px;
}

.grid-container p {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-header {
  color: rgb(133, 133, 133);
  border-bottom: 1px solid rgb(161, 161, 161);

}

.card-body{
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  font-size: 14px;
}
</style>