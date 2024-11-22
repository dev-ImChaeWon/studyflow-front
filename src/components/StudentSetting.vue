<template v-if="students.length">
  <p class="title">학생 정보 수정</p>

  <div class="filter">
    <div class="input-box">
      <label for="subject">과목</label>
      <select v-model="selectedSubject" class="filter-input" name="subject" id="subject">
        <option value="all">전체</option>
        <option v-for="s in subjects" :key="s.subjectId" :value="s.subjectName">{{s.subjectName}}</option>
      </select>
    </div>
    <div class="input-box">
      <label for="student-name">학생 : </label>
      <input v-model="studentName" placeholder="Enter를 눌러 검색하세요" class="filter-input" id="student-name"/>
    </div>
  </div>

  <div class="card" v-for="student in filteredStudents" v-bind:key="student.studentId">
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
      <div class="button-container">
        <button @click="showSubjectModal(student)">과목 추가하기</button>
        <button @click="showModal(student)">정보 수정</button>
      </div>
    </div>

    <div class="modal-wrapper active" v-if="selectedStudent === student">
      <div class="modal">
        <p>*클릭해서 수정하세요</p>
        
        <!-- 학생 이름 편집 -->
        <label 
          class="modal-content"
          v-if="!student.isEditingName"
          @click="student.isEditingName = true">{{ student.studentName }}
        </label>
        <input
          class="modal-content"
          v-if="student.isEditingName"
          v-model="student.studentName"
          @blur="student.isEditingName = false" 
        />

        <!-- 과목 편집 -->
        <ul>
          <li 
            v-for="subject in student.subjects" 
            :key="subject.subjectId"
          >
            <label
              v-if="!subject.isEditing"
              @click="subject.isEditing = true"
              class="modal-content"
            >
              {{ subject.subjectName }}
            </label>
            <div v-if="subject.isEditing" class="input-with-trashbin">
              <label 
                v-if="subject.isEditing"
                class="modal-content">
                {{ subject.subjectName }}
              </label>
              <button class="trashbin-button" @click="deleteSubject(subject, student)">
              🗑️
              </button>
            </div>
          </li>
        </ul>

        <div class="button-group">
          <button @click="updateStudent(student)">수정하기</button>
          <button @click="closePopup(student)">취소</button>
        </div>
      </div>
    </div>

    <div v-if="student.showSubjectModal" class="modal-wrapper active">
      <div class="modal">
        <label
        class="modal-content"
        v-if="!student.isAddingSubject"
        @click="student.isAddingSubject = true"
        for="subject-name"
        >
          추가할 과목
        </label>
        <select 
          class="modal-content"
          v-if="student.isAddingSubject"
          v-model="student.newSubjectName"
          @blur="student.isAddingSubject = false"
          @keyup.enter="addSubject(student)">
          <option v-for="s in subjects" :key="s.subjectId" :value="s.subjectName">{{s.subjectName}}</option>
        </select>
        <div class="button-container">
            <button @click="addSubject(student)">추가하기</button>
            <button @click="closePopup(student)">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';

const subjects = ref([]);
const students = ref([]);
const selectedSubject = ref('all');
const studentName = ref('');
const selectedStudent = ref(null);

const filteredStudents = computed(() => {
  return students.value.filter(student => {
    return (
      studentName.value.trim() === '' ||
      student.studentName.toLowerCase().includes(studentName.value.trim().toLowerCase())
    );
  });
});

watch([selectedSubject, studentName], () => {
  fetchStudentListBySubjectName();
});

async function fetchStudentListBySubjectName() {
  try {
    let url = `http://localhost:8000/api/student-by-subject`;
    if (selectedSubject.value !== 'all') {
      url += `?subjectName=${selectedSubject.value}`; // 과목 이름을 쿼리 파라미터로 전달
    }
    const res = await axios.get(url);

    // 서버에서 반환된 데이터를 students 배열에 저장
    students.value = res.data.map(student => ({
      ...student,
      isEditingName: false,
      subjects: student.subjects.map(subject => ({
        ...subject,
        isEditing: false
      }))
    }));
  } catch (e) {
    console.error('학생 정보를 가져오는 데 실패했습니다:', e);
    alert('학생 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
  }
}

async function fetchSubjectList() {
  try {
    const res = await axios.get('http://localhost:8000/api/subject');
    subjects.value = res.data;
  } catch (e) {
    alert('서버에서 알 수 없는 오류가 발생했습니다.');
  }
}

function showModal(student) {
  selectedStudent.value = student;
  document.body.style.overflow = 'hidden';
}

function showSubjectModal(student) {
  student.showSubjectModal = true;
}

function closePopup(student) {
  selectedStudent.value = null;
  student.showSubjectModal = false;
  document.body.style.overflow = 'auto';
}

async function addSubject(student) {
  try {
    if (!student.newSubjectName) {
      alert('추가할 과목을 선택해주세요.');
      return;
    }

    // POST 요청 데이터 준비
    const newSubject = {
      subject: {
        subjectName: student.newSubjectName,
      },
      student: {
        studentId: student.studentId,
      },
    };

    // POST 요청 전송
    const res = await axios.post('http://localhost:8000/api/student-subject', newSubject);

    // 추가된 과목을 학생 리스트에 반영
    student.subjects = [
      ...student.subjects,
      {
        subjectId: res.data.subjectId,
        subjectName: res.data.subjectName,
        isEditing: false,
      },
    ];

    // 상태 초기화 및 모달 닫기
    student.newSubjectName = '';
    student.isAddingSubject = false;
    closePopup(student);

    console.log('과목이 성공적으로 추가되었습니다:', res.data);
    alert('과목이 성공적으로 추가되었습니다.');

    await fetchStudentListBySubjectName();
  } catch (e) {
    console.error('과목 추가에 실패했습니다:', e);
    alert('과목 추가에 실패했습니다. 다시 시도해주세요.');
  }
}

async function updateStudent(student) {
  try {
    const payload = {
      studentName: student.studentName,
      subjects: student.subjects.map(subject => ({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName
      }))
    };
    await axios.put(`http://localhost:8000/api/student/${student.studentId}`, payload);
    alert('학생 정보가 성공적으로 수정되었습니다.');
    closePopup();
    fetchStudentListBySubjectName();
  } catch (e) {
    alert('학생 정보 수정 중 오류가 발생했습니다.', e);
  }
}

// 과목 삭제 함수
async function deleteSubject(subject, student) {
  if (confirm(`정말로 과목 "${subject.subjectName}"을(를) 삭제하시겠습니까?`)) {
    try {
      await axios.delete(`http://localhost:8000/api/subject/${subject.subjectId}`);
      // 삭제 성공 시, student.subject 배열에서 해당 과목 제거
      student.subjects = student.subjects.filter(s => s.subjectId !== subject.subjectId);
      alert('과목이 성공적으로 삭제되었습니다.');

      await fetchStudentListBySubjectName();
      closePopup(student);
    } catch (error) {
      console.error('과목 삭제에 실패했습니다:', error);
      alert('과목 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }
}



onMounted(() => {
  fetchSubjectList();
  fetchStudentListBySubjectName();
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

.input-with-trashbin {
  display: flex;
  align-items: center;
  justify-content: center;
}

.trashbin-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ff4d4f;
}

.trashbin-button:hover {
  color: #d32f2f; 
}

</style>