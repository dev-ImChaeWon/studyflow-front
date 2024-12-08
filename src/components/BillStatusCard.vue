<template>
  <div class="card">
    <div class="card-header">
      <h2 class="student-name">{{ student.studentName }}</h2>
    </div>
    <div class="card-body">
      <div class="bill-container">
        <div class="subject-container" v-for="subject in subjects" :key="subject.subjectId">
          <h4 class="subject-name">{{ subject.subjectName }}</h4>
          <span class="status-icon">
            <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
            d="M511.9 183.1c-181.8 0-329.1 147.4-329.1 329.1 0 181.8 147.4 329.1 329.1 329.1C693.6 841.3 841 694 841 512.2S693.6 183.1 511.9 183.1z m0 585.1c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"
            fill="green" />
            <path d="M487.4 556.8l-97.8-87.6-48.8 54.4 153.1 137.2 192.2-221.2-55.2-48z" fill="green" />
          </svg>
          <p class="pay-date">{{ billData }}</p>
          </span>
          <button type="button">납부하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
});

const subjects = ref([]);
// const paymentDueDate = '2023-11-10';

// 각 subject에 대해 studentId와 subjectId로 데이터를 가져오는 함수
async function fetchStudentSubject(studentId, subjectId) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/student-subject/${studentId}/${subjectId}`
    );
    return response.data;
  } catch (e) {
    console.error(`학생-과목 데이터를 가져오는 데 실패했습니다: subjectId=${subjectId}`, e);
    return null;
  }
}

// studentId를 받아서 해당 학생의 과목 리스트를 가져오는 함수
async function fetchSubjects(studentId) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/student-subject?studentId=${studentId}`
    );
    subjects.value = await Promise.all(
      response.data.map(async (subject) => {
        // 각 subject에 대해 studentId와 subjectId로 추가 데이터를 가져옴
        const studentSubjectData = await fetchStudentSubject(studentId, subject.subjectId);
        const billData = await fetchBillMangement(studentSubjectData);
        
        return { ...subject, 
          additionalData: studentSubjectData, 
          billData, 
        };
      })
    );
  } catch (e) {
    console.error('과목 리스트를 가져오는 데 실패했습니다:', e);
  }
}


async function fetchBillMangement(studentSubjectData){
  try {
    const response = await axios.get('http://localhost:8000/api/bill-management');
    //
    const filteredData = response.data.filter((bill) => {
      return bill.id === studentSubjectData.id;
    });

    console.log('Filtered Bill Data:', filteredData);

    return filteredData;
  } catch (e) {
    console.error('수납 정보를 가져오는 데 실패했습니다:', e);
  }

}

onMounted(() => {
  fetchSubjects(props.student.studentId);
});
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
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
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  justify-items: flex-end;
  row-gap: 5px;
}

.subject-container button {
  border-style: hidden;
  border-radius: 5px;
  padding: 1px 2px;
  background-color: #3461FD;
  color: #dbe3ff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.subject-container button:hover {
  background-color: #2540a0;
}

</style>