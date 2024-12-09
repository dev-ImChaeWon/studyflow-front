<template>
  <div v-if="studentSubject" class="card">
    <div class="card-header">
      <h2 class="student-name">{{ studentSubject.student.studentName }}</h2>
      <h2 class="subject-name">{{ studentSubject.subject.subjectName }}</h2>
    </div>
    <div v-for="ts in testScores" :key="ts.id" class="card-body">
      <div class="test-date">
        <p class="info-text">응시일자</p>
        <p>{{ ts.weeklyTestDate }}</p>
      </div>
      <div class="test-score">
        <p class="info-text">점수</p>
        <p>{{ ts.score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  studentSubject: {
    type: Object,
    required: true, // 반드시 전달되는 값이어야 함
  },
});

const testScores = ref([]);

async function fetchTestScores(studentId, subjectId) {
  try {
    const res = await axios.get(`http://localhost:8000/api/all-test-score/${studentId}/${subjectId}`);
    testScores.value = res.data;
  } catch (e) {
    console.error('시험점수정보를 가져오는데 실패했습니다: ', e);
  }
}

onMounted(() => {
  if (props.studentSubject) {
    fetchTestScores(props.studentSubject.student.studentId, props.studentSubject.subject.subjectId);
  }
})
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  font-family: Arial, sans-serif;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top: 1px solid #000;
}

.card-body .test-date,
.card-body .test-score {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0;
}

.info-text {
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: #000;
}

.test-date p,
.test-score p {
  margin: 0;
  font-size: 14px;
  color: #000;
}

.test-score p {
  font-weight: bold;
}
</style>
