<template>
  <div class="card">
    <div class="card-header">
      <h2 class="student-name">김철수</h2>
      <h3>납부일: 매달 30일</h3> <!-- 납부일: {{ ref }} -->
      <h3>납부여부: O</h3> <!-- 납부여부: {{ ref }} -->
    </div>
    <div class="card-body">
      <div class="bill-container">
        <div class="subject-container">
        <h4>초6수학</h4>
          <span class="status-icon">
          <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M511.9 183.1c-181.8 0-329.1 147.4-329.1 329.1 0 181.8 147.4 329.1 329.1 329.1C693.6 841.3 841 694 841 512.2S693.6 183.1 511.9 183.1z m0 585.1c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"
              fill="green" />
            <path d="M487.4 556.8l-97.8-87.6-48.8 54.4 153.1 137.2 192.2-221.2-55.2-48z" fill="green" /></svg>
          </span>
        </div>
        <div class="subject-container">
        <h4>영어</h4>
          <span class="status-icon">
          <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M511.9 183.1c-181.8 0-329.1 147.4-329.1 329.1 0 181.8 147.4 329.1 329.1 329.1C693.6 841.3 841 694 841 512.2S693.6 183.1 511.9 183.1z m0 585.1c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"
              fill="green" />
            <path d="M487.4 556.8l-97.8-87.6-48.8 54.4 153.1 137.2 192.2-221.2-55.2-48z" fill="green" /></svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

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

.card-body{
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  font-size: 14px;
}

.subject-container {
  margin-left: 20px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  justify-items: stretch;
  row-gap: 5px;
}

</style>