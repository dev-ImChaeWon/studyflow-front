<template>
  <p class="title">수납정보 등록</p>
  <form class="auth-container" @submit.prevent="handleSubmit">
    <div class="register-box">
      <div class="input-container" :class="{ blurred: studentName }">
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

      <div class="input-container" v-if="selectedStudentId" :class="{ blurred: selectedSubjectId  }">
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

      <div class="input-container" v-if="selectedSubjectId" :class="{ blurred: selectedPay }">
        <div class="input-box">
          <label for="pay">납부금액 :</label>
          <input 
            class="filter-input"
            id="pay-id"
            v-model="selectedPay"
            type="text"
            placeholder="금액을 입력하세요"
          />
          <p v-if="validationErrors.pay" class="status-msg err">{{ validationErrors.pay }}</p>
        </div>
      </div>

      <div class="input-container" v-if="isFormValid">
        <button type="submit">등록</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from "vue";
import axios from "axios";

const studentList = ref([]);
const studentName = ref("");
const selectedStudentId = ref("");
const selectedSubjectId = ref("");
const selectedPay = ref("");
const validationErrors = reactive({
  studentId: "",
  subjectId: "",
  pay: "",
})
let studentSubject = ref(null);

watch([selectedStudentId, selectedSubjectId], async ([studentId, subjectId]) => {
  if (studentId && subjectId) {
    studentSubject.value = await fetchStudentSubject(studentId, subjectId);
  }
});

const fetchStudentList = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/all-student");
    studentList.value = response.data;
  } catch (e) {
    console.error("학생 정보를 가져오는 데 실패했습니다:", e);
  }
};

const filteredStudents = computed(() =>
  studentList.value.filter((student) =>
    student.studentName.toLowerCase().includes(studentName.value.toLowerCase())
  )
);

const selectedStudentSubjects = computed(() => {
  const student = studentList.value.find(
    (student) => student.studentId === selectedStudentId.value
  );
  return student?.subjects || [];
});

const fetchStudentSubject = async (studentId, subjectId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/student-subject/${studentId}/${subjectId}`
    );
    return response.data;
  } catch (e) {
    console.error("학생-과목 ID를 가져오는 데 실패했습니다: ", e);
    return null;
  }
}

const validateForm = () => {
  validationErrors.studentId = selectedStudentId.value ? "" : "학생을 선택하세요.";
  validationErrors.subjectId = selectedSubjectId.value ? "" : "과목을 선택하세요.";
  validationErrors.pay = selectedPay.value
    ? isNaN(Number(selectedPay.value))
      ? "납부금액은 숫자만 입력해주세요."
      : ""
    : "납부금액을 입력하세요.";
  return (
    !validationErrors.studentId &&
    !validationErrors.subjectId &&
    !validationErrors.selectedPay
  );
}

const isFormValid = computed(() => validateForm());

const handleSubmit = async () => {
  if (!validateForm()) {
    alert("입력값을 확인하세요.");
    return;
  }

  try {
    const payload = {
      billId: studentSubject.value.id,
      isPay: true,
      payDate: new Date().toISOString(),
      pay: selectedPay.value,
    };
    const res = await axios.post("http://localhost:8000/api/bill-management-update", payload);
    console.log("등록 성공: ", res.data);
    alert("등록(수정)됨");
    studentName.value = "";
    selectedStudentId.value = "";
    selectedSubjectId.value = "";
    selectedPay.value = "";
  } catch (e) {
    console.error("등록 실패: ", e);
    alert("등록에 실패했습니다. 다시 시도해주세요.");
  }
}

onMounted(() => {
  fetchStudentList();
})
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

.input-container {
  transition: filter 0.3s ease;
}

.input-container.blurred {
  /* filter: blur(1px); */
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