<template v-if="students.length">
  <p class="title">학생 정보 수정</p>
  <div class="filter">
    <div class="input-box">
      <label for="subject">과목</label>
      <select v-model="selectedSubject" class="filter-input" name="subject" id="subject">
        <option value="all">전체</option>
        <option v-for="s in subjects" :key="s.subjectId" :value="s.subjectId">{{s.subjectName}}</option>
      </select>
    </div>
    <div class="input-box">
      <label for="student-name">학생 : </label>
      <input v-model="studentName" placeholder="Enter를 눌러 검색하세요" class="filter-input" id="student-name"/>
    </div>
  </div>

  <div class="card" v-for="student in students" v-bind:key="student.studentId">
    <div class="card-header">
      <h2 class="student-name">{{ student.studentName }}</h2>
    </div>
    <div class="card-body">
      <div>
        <ul class="student-subject">
          <li v-for="subject in student.subjects" :key="subject.subjectId">
            {{ subject.subjectName }}
          </li>
        </ul>
      </div>
      <button @click="showModal(student)">정보 수정</button>
    </div>

    <div class="modal-wrapper active" v-if="selectedStudent">
      <div class="modal">
        <p>*클릭해서 수정하세요</p>
        <label 
          class="modal-content"
          v-if="!student.isEditing"
          @click="student.isEditing = true"
          for="student-name">{{ student.studentName }}
        </label>
        <input
          class="modal-content"
          v-if="student.isEditing"
          v-model="student.studentName"
          @blur="student.isEditing = false" 
        />

        <div class="button-group">
          <button @click="updateTeacher(student)">수정하기</button>
          <button @click="closePopup(student)">취소</button>
        </div>

      </div>
    </div>


  </div>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

const subjects = ref([]);
const students = ref([]);
const selectedSubject = ref('all');
const studentName = ref('');
const selectedStudent = ref(null);

watch([selectedSubject, studentName], () => {
  fetchStudentListBySubjectName();
});

async function fetchStudentListBySubjectName() {
  try {
    let url = `http://localhost:8000/api/student-by-subject`;  // 기본적으로 전체 학생을 가져옴
    if (selectedSubject.value !== 'all') {
      url = `http://localhost:8000/api/student-by-subject?subjectName=${selectedSubject.value}`;
    }
    const res = await axios.get(url);
    students.value = res.data.map(student => ({
      ...student,
      isEditing: false,
      showModal: false
    }));
    console.log(res.data);
  } catch (e) {
    alert('서버에서 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요');
  }
}

async function fetchSubjectListByStudentId(studentId) {
  try {
    const res = await axios.get(`http://localhost:8000/api/student-subject?studentId=${studentId}`);
    const student = students.value.find(s => s.studentId === studentId);
    if (student) {
      student.subjects = res.data;  // student.subjects에 과목 목록 저장
    }
    console.log(res.data);
  } catch (e) {
    alert('서버에서 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요');
  }
}

function showModal(student) {
  selectedStudent.value = student;
  document.body.style.overflow = 'hidden';
  fetchSubjectListByStudentId(student.studentId);
}

function closePopup(student) {
  student.showModal = false;
}

async function fetchSubjectList() {
  try {
    const res = await axios.get('http://localhost:8000/api/subject');
    subjects.value = res.data;
  } catch (e) {
    alert('서버에서 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요');
  }
}

onMounted(() => {
  fetchSubjectList();
  fetchStudentListBySubjectName();  // 페이지가 로드되면 전체 학생 목록을 가져오도록 호출
});
</script>



<style scoped>
.title {
    margin: 10px 0 10px;
    font-weight: 500;
    font-size: large;
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

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 5px 0px;
}

.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}

.card-body {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  row-gap: 15px;
  font-size: 14px;
}

.student-subject {
  display: flex;
  flex-direction: row;
}

.subject {
  display: flex;
}

button {
  margin-left: 5px;
  font-size: medium;
  border-style: hidden;
  border-radius: 8px;
  padding: 2px 4px;
  background-color: #3461FD;
  color: #dbe3ff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #2540a0;
}

li {
  list-style: none;
  margin: 0 5px;
}

.modal-wrapper{
  position: fixed;
  backdrop-filter: brightness(0.9);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-wrapper.active {
  display: flex;
}

.modal{
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px 30px;
  width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
}

.modal p{
  font-size: large;
  font-weight: 800;
}

.modal-content{
  padding: 5px;
  border: none;
  border-bottom:1px solid rgb(206, 206, 255);
  outline: none;
  margin: 10px;
}
</style>