<template>
  <p class="title">교사 정보 수정</p>
  <div class="card" v-for="teacher in teachers" :key="teacher.userId">
    <div class="card-header">
      <h2 class="teacher-name">{{ teacher.userName }}</h2>

      <h2 class="teacher-role">{{ teacher.userRole }}</h2>
    </div>
    <div class="card-body">
      <div class="teacher-subject">
        <li v-for="subject in teacher.subject" :key="subject.subjectId">
          {{ subject.subjectName }}
        </li>
      </div>
      <button @click="showModal(teacher)">정보 수정</button>
    </div>

    <div v-if="teacher.showModal" class="modal-wrapper active">
      <div class="modal">
        <p>*클릭해서 수정하세요</p>
        <label 
          class="modal-content"
          v-if="!teacher.isEditing"
          @click="teacher.isEditing = true" 
          for="teacher-name">{{ teacher.userName }}
        </label>
        <input 
          class="modal-content"
          v-if="teacher.isEditing" 
          v-model="teacher.userName" 
          @blur="teacher.isEditing = false" 
          @keyup.enter="teacher.isEditing = false"
        />

        <label
          class="modal-content"
          v-if="!teacher.isEditing"
          @click="teacher.isEditing = true" 
          for="teacher-role">{{ teacher.userRole }}
        </label>
        <select 
          class="modal-content"
          v-if="teacher.isEditing"
          v-model="teacher.userRole"
          @blur="teacher.isEditing = false"
          @keyup.enter="teacher.isEditing = false">
            <option value="T">T</option>
            <option value="M">M</option>
        </select>

        <label 
          class="modal-content"
          v-for="subject in teacher.subject" :key="subject.subjectId">
          {{ subject.subjectName }}
          <input 
            class="modal-content"
            v-if="teacher.isEditing"
            v-model="subject.subjectName"
            @blur="teacher.isEditing = false"
            @keyup.enter="teacher.isEditing = false"/>
        </label>

        <!-- <div v-if="teacher.subjects && allSubjects.length > 0" class="teacher-subject-edit">
          <label v-if="!teacher.isEditing" @click="teacher.isEditing = true">과목 수정</label>
          <select v-if="teacher.isEditing" v-model="teacher.selectedSubject" class="modal-content">
            <option v-for="subject in allSubjects" :key="subject.subjectId" :value="subject.subjectId">
              {{ subject.subjectName }}
            </option>
          </select>
        </div> -->

        <div class="button-group">
          <button @click="updateTeacher(teacher)">수정하기</button>
          <button @click="closePopup(teacher)">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const teachers = ref([]);
const allSubjects = ref([]); 

// 서버에서 교사 목록을 가져오는 함수
async function fetchTeacherList() {
  try {
    const res = await axios.get('http://localhost:8000/api/teacher');
    teachers.value = res.data.map(teacher => ({
      ...teacher,
      isEditing: false,  // 편집 상태 관리
      showModal: false,   // 모달 상태 관리
      subjects: [],
      selectedSubject: null
    }));
  } catch (e) {
    alert('서버에서 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요');
  }
}

async function fetchAllSubjects() {
  try {
    const res = await axios.get('http://localhost:8000/api/subject');
    allSubjects.value = res.data;
  } catch (e) {
    console.error('전체 과목 목록을 가져오는 데 실패했습니다:', e);
  }
}

async function fetchTeacherSubjects(userId) {
  try {
    const res = await axios.get(`http://localhost:8000/api/teacher-subject/${userId}`);
    return res.data;
  } catch (e) {
    console.error('과목을 가져오는 데 실패했습니다:', e);
    return [];
  }
}

function showModal(teacher) {
  teacher.showModal = true;
  document.body.style.overflow = 'hidden';

  fetchTeacherSubjects(teacher.userId).then(subjects => {
    teacher.subjects = subjects;
    teacher.selectedSubject = subjects.length > 0 ? subjects[0].subjectId : null;
  });
}

function closePopup(teacher) {
  teacher.showModal = false;
  document.body.style.overflow = 'auto';
}

async function updateTeacher(teacher) {
  try {
    const updatedTeacher = {
      userId: teacher.userId,
      userName: teacher.userName,
      userRole: teacher.userRole,
      userPassword: teacher.userPassword,
      subjectId: teacher.selectedSubject
    };

    // PUT 요청을 통해 교사 정보 업데이트
    const res = await axios.put(`http://localhost:8000/api/teacher/${teacher.userId}`, updatedTeacher);

    teacher.showModal = false;
    console.log('교사 정보가 수정되었습니다:', res.data);
  } catch (e) {
    console.error('교사 정보 수정에 실패했습니다:', e);
    alert('수정에 실패했습니다. 다시 시도해주세요.');
  }
}

onMounted(() => {
  fetchTeacherList();
  fetchAllSubjects();
});
</script>

<style scoped>
.title {
    margin: 10px 0 10px;
    font-weight: 500;
    font-size: large;
}

.input-box{
    display: flex;
    align-items: baseline;
    column-gap: 5px;
}

li{
  list-style: none;
  margin: 0 5px;
  display: inline;
}

label{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.input-box:last-child{
    flex-grow: 1;
}

#teacher-name{
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