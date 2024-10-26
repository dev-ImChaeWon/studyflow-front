<template>
  <footer class="footer">
      <div class="container">
          <p>&copy; {{ currentYear }} study flow. All rights reserved.</p>
      </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear()); // 현재 연도
</script>

<style scoped>
.footer {
  background-color: #f8f9fa; /* 연한 회색 배경 */
  padding: 50px 20px;
  text-align: center;
  border-top: 1px solid #e9ecef; /* 위쪽 테두리 */
}

.container {
  max-width: 1200px;
  margin: 0 auto; /* 가운데 정렬 */
}

.footer p {
  margin: 0;
  color: #6c757d; /* 회색 텍스트 */
  font-size: 14px; /* 텍스트 크기 */
}
</style>
