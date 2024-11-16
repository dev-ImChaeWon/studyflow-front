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
      <div class="button-container">
        <button @click="showSubjectModal(teacher)">과목 추가하기</button>
        <button @click="showModal(teacher)">정보 수정</button>
      </div>
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

        <li v-for="subject in teacher.subject || []" :key="subject.subjectId">
          <label
            class="modal-content"
            v-if="!subject.isEditing"
            @click="subject.isEditing = true"
            for="subject-name">
            {{ subject.subjectName }}
          </label>
          <div v-if="subject.isEditing" class="input-with-trashbin">
            <input
              class="modal-content"
              v-model="subject.subjectName"
              @blur="subject.isEditing = false"
              @keyup.enter="subject.isEditing = false"
            />
            <button class="trashbin-button" @click="deleteSubject(subject, teacher)">
            🗑️
            </button>
          </div>
        </li>

        <div class="button-container">
          <button @click="updateTeacher(teacher)">수정하기</button>
          <button @click="closePopup(teacher)">취소</button>
        </div>
      </div>
    </div>

    <div v-if="teacher.showSubjectModal" class="modal-wrapper active">
      <div class="modal">
        <label
        class="modal-content"
        v-if="!teacher.isAddingSubject"
        @click="teacher.isAddingSubject = true"
        for="subject-name"
      >
          추가할 과목 이름
        </label>
        <input
          type="text"
          v-if="teacher.isAddingSubject"
          v-model="teacher.newSubjectName"
          class="modal-content"
          @blur="teacher.isAddingSubject = false"
          @keyup.enter="addSubject(teacher)"
          placeholder="과목 이름 입력"
        />
        <div class="button-container">
            <button @click="addSubject(teacher)">추가하기</button>
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
    teachers.value = await Promise.all(
      res.data.map(async teacher => {
        const subjects = await fetchTeacherSubjects(teacher.userId);
        return {
          ...teacher,
          isEditing: false,
          showModal: false,
          newSubjectName: '',
          isAddingSubject: false,
          showSubjectModal: false,
          subjects: subjects.map(subject => ({
            ...subject,
            isEditing: false, // 각 subject 객체에 isEditing 초기화
          })),
          selectedSubject: subjects.length > 0 ? subjects[0].subjectId : null,
        };
      })
    );
  } catch (e) {
    console.error('교사 데이터를 가져오는 데 실패했습니다:', e);
  }
}

async function fetchAllSubjects() {
  try {
    const res = await axios.get('http://localhost:8000/api/subject');
    allSubjects.value = res.data.map(subject => ({
      ...subject,
      isEditing: false,
      showModal: false
    }));
  } catch (e) {
    console.error('전체 과목 목록을 가져오는 데 실패했습니다:', e);
  }
}

async function fetchTeacherSubjects(userId) {
  try {
    const res = await axios.get(`http://localhost:8000/api/teacher-subject/${userId}`);
    return res.data.map(subject => ({
      ...subject,
      isEditing: false, // 각 subject 객체에 isEditing 속성 추가
    }));
  } catch (e) {
    console.error('과목을 가져오는 데 실패했습니다:', e);
    return [];
  }
}

function showModal(teacher) {
  teacher.showModal = true;

  fetchTeacherSubjects(teacher.userId).then(subjects => {
    teacher.subjects = subjects;
    teacher.selectedSubject = subjects.length > 0 ? subjects[0].subjectId : null;
  });
}

function showSubjectModal(teacher) {
  teacher.showSubjectModal = true;

}

function closePopup(teacher) {
  teacher.showModal = false;
  teacher.showSubjectModal = false;

  setTimeout(() => {
    document.body.style.overflow = 'auto'; 
    document.documentElement.style.overflow = 'auto';
  }, 30); 
}

async function updateTeacher(teacher) {
  try {
    const updatedTeacher = {
      userId: teacher.userId,
      userName: teacher.userName,
      userRole: teacher.userRole,
      userPassword: teacher.userPassword,
      subjectId: teacher.selectedSubject,
      subject: teacher.subject.map(subject => ({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName
      }))
    };

    // PUT 요청을 통해 교사 정보 업데이트
    const res = await axios.put(`http://localhost:8000/api/teacher/${teacher.userId}`, updatedTeacher);

    teacher.showModal = false;
    console.log('교사 정보가 수정되었습니다:', res.data);
    alert('교사 정보가 수정되었습니다.');
  } catch (e) {
    console.error('교사 정보 수정에 실패했습니다:', e);
    alert('수정에 실패했습니다. 다시 시도해주세요.');
  }
}

async function addSubject(teacher) {
  try {
    // POST 요청 데이터 준비
    const newSubject = {
      subjectName: teacher.newSubjectName,
      teacher: {
        userId: teacher.userId,
      },
    };

    // POST 요청 전송
    const res = await axios.post('http://localhost:8000/api/subject', newSubject);

    // 추가된 과목을 교사 리스트에 반영
    teacher.subjects = [
      ...teacher.subjects,
      {
        subjectId: res.data.subjectId,
        subjectName: res.data.subjectName,
        isEditing: false,
      },
    ];

    // 상태 초기화 및 모달 닫기
    teacher.newSubjectName = '';
    teacher.isAddingSubject = false;
    closePopup(teacher);

    console.log('과목이 성공적으로 추가되었습니다:', res.data);
    alert('과목이 성공적으로 추가되었습니다.');

    await fetchTeacherList();
  } catch (e) {
    console.error('과목 추가에 실패했습니다:', e);
    alert('과목 추가에 실패했습니다. 다시 시도해주세요.');
  }
}

// 과목 삭제 함수
async function deleteSubject(subject, teacher) {
  if (confirm(`정말로 과목 "${subject.subjectName}"을(를) 삭제하시겠습니까?`)) {
    try {
      await axios.delete(`http://localhost:8000/api/subject/${subject.subjectId}`);
      // 삭제 성공 시, teacher.subject 배열에서 해당 과목 제거
      teacher.subjects = teacher.subjects.filter(s => s.subjectId !== subject.subjectId);
      alert('과목이 성공적으로 삭제되었습니다.');

      await fetchTeacherList();
      closePopup(teacher);
    } catch (error) {
      console.error('과목 삭제에 실패했습니다:', error);
      alert('과목 삭제에 실패했습니다. 다시 시도해주세요.');
    }
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

.input-with-trashbin {
  display: flex;
  align-items: center;
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

.teacher-subject {
  display: flex;
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

.button-container {
  
}

.button-container button {
  margin-left: 5px;
  font-size: medium;
  border-style: hidden;
  border-radius: 8px;
  padding: 2px 4px;
  background-color: #3461FD;
  box-shadow: 0 10px 30px -10px #3460fdc4;
  color: #dbe3ff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.button-container button:hover {
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
  flex: 1;
  margin-right: 8px;
}

.trashbin-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ff4d4f;
}

.trash-button:hover {
  color: #d32f2f; 
}

</style>