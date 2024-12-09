<template>
  <div class="test-score-header">
    <h1>주간평가</h1>
  </div>
  <p v-if="!studentSubject">데이터를 불러오는 중...</p>
  <TestCard v-if="studentSubject" :studentSubject="studentSubject" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TestCard from '../TestCard.vue';
import { useRoute } from 'vue-router';

let route = useRoute();
console.log(route.params.id);
const studentSubjectId = route.params.id;
const studentSubject = ref(null);

const fetchStudentByParent = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/api/student-subject/${studentSubjectId}`)
    studentSubject.value = res.data;
  } catch (e) {
    console.error('주간평가를 가져오는데 실패했습니다: ', e);
  }
}

onMounted(()=>{
  fetchStudentByParent();
}

)

</script>

<style scoped>
.test-score-header {
  padding: 0 20px;
}
</style>