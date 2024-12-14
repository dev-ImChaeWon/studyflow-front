<template>
  <h1>자녀 수강정보</h1>
  <RouterLink  :to="'/student-subject/' + s.id " v-for="(s , idx) in subjects" v-bind:key="idx" class="box">
    <p class="student-name">{{ s.student.studentName }}</p>
    <p class="subject-name">{{s.subject.subjectName}}</p>
  </RouterLink>

</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const subjects = ref([]);


onMounted(async ()=>{
  const res  = await axios.get("http://localhost:8000/api/parent-student-info?parentId=" + localStorage.getItem("userId"));
  subjects.value = res.data;
});
</script>


<style scoped>
/* 전체 박스 스타일 */
.box {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 10px; /* box 사이 간격을 추가 */
}

.box:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 학생 이름 */
.student-name {
  background-color: #f3f9ff;
  color: #2c3e50;
  border-radius: 6px;
  padding: 12px 20px;
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

/* 과목 이름 */
.subject-name {
  background-color: #eaf4ea;
  color: #2c3e50;
  border-radius: 6px;
  padding: 12px 20px;
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 기본 텍스트 스타일 */
.box > div {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .box {
    flex-direction: column;
    align-items: stretch;
    padding: 15px;
  }

  .student-name, .subject-name {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
