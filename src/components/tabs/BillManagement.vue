<template>
  <h1>수납관리</h1>
  <div class="filter">
    <div class="input-box">
      <label for="student-name">학생 : </label>
      <input v-model="studentName" placeholder="Enter를 눌러 검색하세요" class="filter-input" id="student-name" />
    </div>
  </div>

  <CalendarTab :today="today" :defaultDate="selectedDate" @update-date="fetchStudentListByDate" />

  <div v-if="studentList.length > 0">
    <BillStatusCard
      v-for="student in filteredStudents"
      :key="student.studentId"
      :student="student"
    />
  </div>
  <div v-else>
    <p>학생 목록이 없습니다.</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import BillStatusCard from '../BillStatusCard.vue';
import CalendarTab from '../CalendarTab.vue';

let dateToString = (target) => {
  let year = target.getFullYear();
  let month = target.getMonth() + 1;
  let date = target.getDate();
  
  return '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
}

const date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);
const studentList = ref([]);  // 빈 배열로 초기화
const studentName = ref('');

const fetchStudentList = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/all-student'); // 학생 정보 API 호출
    studentList.value = response.data;  // 받아온 학생 데이터를 studentList에 저장
  } catch (e) {
    console.error('학생 정보를 가져오는 데 실패했습니다:', e);
  }
};

const filteredStudents = computed(() => {
  return studentList.value.filter(student => {
    return (
      studentName.value.trim() === '' ||
      student.studentName.toLowerCase().includes(studentName.value.trim().toLowerCase())
    );
  });
});

onMounted(()=>{
  fetchStudentList();
})

</script>

<style scoped>
.filter-header{
    padding: 25px 0 15px;
}

.tag-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.filter{
    display: flex;
    align-items: stretch;
    column-gap: 20px;
    padding: 0 0 25px 0;
}
.input-box{
    display: flex;
    align-items: baseline;
    column-gap: 5px;
}


label{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.tags{
    display: flex;
    column-gap: 3px;
    row-gap: 3px;
    flex-wrap: wrap;
}
.icon-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: aliceblue;
    border: none;
    padding: 5px;
    border-radius: 8px;
    border: 0.5px solid rgb(135, 135, 247);
    align-self: flex-end;
}

.filter-input{
    padding: 5px;
    border: none;
    border-bottom:1px solid rgb(206, 206, 255);
    outline: none;
    
}

.input-box:last-child{
    flex-grow: 1;
}

#student-name{
    flex-grow: 1;
    width: 100px;
}

.list-box{
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
}
</style>