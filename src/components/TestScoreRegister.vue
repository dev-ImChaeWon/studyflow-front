<template>
  <p class="title">주간평가 점수 등록</p>
  <form class="auth-container" @submit.prevent="handleSubmit">
    <div class="register-box">
      <div class="input-container">
        <div class="input-box">
          <label for="student-name">학생 : </label>
          <input v-model="studentName" placeholder="Enter를 눌러 검색하세요" class="filter-input" id="student-name" />
        </div>
        <div class="input-box">
          <select class="input-content" id="student-id" v-model="selectedStudentId">
            <option v-for="student in filteredStudents" :key="student.studentId" :value="student.studentId">
              {{ student.studentName }}
            </option>
          </select>
          <p v-if="validationErrors.studentId" class="status-msg err">{{ validationErrors.studentId }}</p>
        </div>
      </div>

      <div class="input-container" v-if="selectedStudentId">
        <div class="input-box">
          <label for="subject-name">과목 : </label>
          <select id="subject-id" class="input-content" v-model="selectedSubjectId">
            <option
              v-for="subject in selectedStudentSubjects"
              :key="subject.subjectId"
              :value="subject.subjectId"
            >
              {{ subject.subjectName }}
            </option>
          </select>
          <p v-if="validationErrors.subjectId" class="status-msg err">{{ validationErrors.subjectId }}</p>
        </div>
      </div>

      <div class="input-container" v-if="selectedSubjectId">
        <div class="input-box">
          <label for="test-score">점수 입력 : </label>
          <input
            class="filter-input"
            id="test-score-id"
            v-model="selectedTestScore"
            type="text"
            placeholder="점수를 입력하세요"
          />
          <p v-if="validationErrors.testScore" class="status-msg err">{{ validationErrors.testScore }}</p>
        </div>
      </div>

      <div class="input-container" v-if="isFormValid">
        <button type="submit">점수 등록</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import axios from "axios";

const studentList = ref([]);
const studentName = ref("");
const selectedStudentId = ref("");
const selectedSubjectId = ref("");
const selectedTestScore = ref("");
const validationErrors = reactive({
  studentId: "",
  subjectId: "",
  testScore: "",
});

// 학생 목록 가져오기
const fetchStudentList = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/all-student");
    studentList.value = response.data;
  } catch (e) {
    console.error("학생 정보를 가져오는 데 실패했습니다:", e);
  }
};

onMounted(() => {
  fetchStudentList();
});

// 입력값 필터링
const filteredStudents = computed(() =>
  studentList.value.filter((student) =>
    student.studentName.toLowerCase().includes(studentName.value.toLowerCase())
  )
);

// 선택된 학생의 과목 목록
const selectedStudentSubjects = computed(() => {
  const student = studentList.value.find(
    (student) => student.studentId === selectedStudentId.value
  );
  return student?.subjects || [];
});

// 유효성 검사 메서드
const validateForm = () => {
  validationErrors.studentId = selectedStudentId.value ? "" : "학생을 선택하세요.";
  validationErrors.subjectId = selectedSubjectId.value ? "" : "과목을 선택하세요.";
  validationErrors.testScore = selectedTestScore.value
    ? isNaN(Number(selectedTestScore.value))
      ? "점수는 숫자여야 합니다."
      : ""
    : "점수를 입력하세요.";
  return (
    !validationErrors.studentId &&
    !validationErrors.subjectId &&
    !validationErrors.testScore
  );
};

// 폼 유효성 검사 상태
const isFormValid = computed(() => validateForm());

// 폼 제출 처리
const handleSubmit = async () => {
  if (!validateForm()) {
    alert("입력값을 확인하세요.");
    return;
  }
  try {
    const data = {
      student: { studentId: selectedStudentId.value },
      subject: { subjectId: selectedSubjectId.value },
      score: selectedTestScore.value,
    };
    const res = await axios.post("http://localhost:8000/api/test-score", data);
    console.log("등록 성공:", res.data);
    alert("점수 등록됨");
    // 폼 초기화
    studentName.value = "";
    selectedStudentId.value = "";
    selectedSubjectId.value = "";
    selectedTestScore.value = "";
  } catch (e) {
    console.error("등록 실패:", e);
    alert("등록에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>


<style scoped>
.auth-container {
    display:flex;
    flex-direction: column;
    align-items: center;
}

.title {
    margin: 10px 0 10px;
    font-weight: 500;
    font-size: large;
}

.input-box {
    display: flex;
    flex-direction: row;
    /* align-items: */
    justify-content: space-between;
    column-gap: 5px;
    margin-bottom: 10px;
}

.input-box label {
  padding-top: 5px;
  vertical-align: middle;
}

.filter-input {
    padding: 5px;
    border: none;
    border-bottom:1px solid rgb(206, 206, 255);
    outline: none;
}

p {
    font-weight: 500;
}

.register-box button {
    font-size: large;
    font-weight: 500;
    width: 100%;
    height: 50px;
    border-style: hidden;
    border-radius: 5px;
    padding: 1px 2px;
    margin-top: 20px;
    background-color: #3461FD;
    color: #dbe3ff;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

button:hover{
    background-color: #3756c7;
}

li {
    display: inline;
}

.register-box {
    border: 1px solid rgb(172, 199, 213);
    border-radius: 5px;
    padding: 10%;
    margin: 0 10%;
}

.input-content{
  padding: 5px;
  border: none;
  border-bottom:1px solid rgb(206, 206, 255);
  outline: none;
  margin: 10px;
  flex: 1;
  margin-right: 8px;
}

/* Auth Style */
.status-msg{
  font-size: 14px;
  padding-left: 10px;
  display: none;
}

.status-msg.active{
  display: block;
}

.err {
    color: red;
}
</style>