<template>
  <div class="card">
    <div class="card-header">
      <h2 class="student-name">{{ student.studentName }}</h2>
    </div>
    <div class="card-body">
      <div class="bill-container">
        <div
          class="subject-container"
          v-for="subject in subjects"
          :key="subject.subjectId"
        >
          <div class="subject-inner-content">
            <h4 class="subject-name">{{ subject.subjectName }}</h4>
            <span
              v-if="subject.billData?.isPay"
              class="status-icon"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 1024 1024"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M511.9 183.1c-181.8 0-329.1 147.4-329.1 329.1 0 181.8 147.4 329.1 329.1 329.1C693.6 841.3 841 694 841 512.2S693.6 183.1 511.9 183.1z m0 585.1c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"
                  fill="green"
                />
                <path
                  d="M487.4 556.8l-97.8-87.6-48.8 54.4 153.1 137.2 192.2-221.2-55.2-48z"
                  fill="green"
                />
              </svg>
            </span>
          </div>
          <div class="subject-inner-content">
            <p>
              {{ formatDate(subject.billData?.payDate) || "납부 정보 없음" }}
            </p>
            <button type="button" @click="handlePay(subject)">
              납부하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import axios from "axios";

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
});

const subjects = ref([]);

// 날짜 형식을 YYYY-MM-DD로 변환하는 함수
function formatDate(dateString) {
  if (!dateString) return ""; // 빈 값 처리
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식 반환
}

// 학생-과목 데이터를 가져오는 함수
async function fetchStudentSubject(studentId, subjectId) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/student-subject/${studentId}/${subjectId}`
    );
    return response.data;
  } catch (e) {
    console.error(
      `학생-과목 데이터를 가져오는 데 실패했습니다: subjectId=${subjectId}`,
      e
    );
    return null;
  }
}

// 과목 리스트를 가져오는 함수
async function fetchSubjects(studentId) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/student-subject?studentId=${studentId}`
    );
    subjects.value = await Promise.all(
      response.data.map(async (subject) => {
        const studentSubjectData = await fetchStudentSubject(
          studentId,
          subject.subjectId
        );
        const billData = await fetchBillManagement(studentSubjectData);
        return {
          ...subject,
          additionalData: studentSubjectData,
          billData,
        };
      })
    );
  } catch (e) {
    console.error("과목 리스트를 가져오는 데 실패했습니다:", e);
  }
}

// 수납 정보를 가져오는 함수
async function fetchBillManagement(studentSubjectData) {
  try {
    const response = await axios.get("http://localhost:8000/api/bill-management");
    const filteredData = response.data.filter(
      (bill) => bill.billId === studentSubjectData.id
    );

    return filteredData[0] || null;
  } catch (e) {
    console.error("수납 정보를 가져오는 데 실패했습니다:", e);
  }
}

// 납부하기 버튼 클릭 핸들러
async function handlePay(subject) {
  const currentMonth = new Date().getMonth(); // 현재 월 (0부터 시작, 0=1월)
  
  if (subject.billData?.payDate) {
    const payDate = new Date(subject.billData.payDate);
    const payMonth = payDate.getMonth(); // 납부 월 (0부터 시작)

    if (currentMonth === payMonth) {
      alert("이미 납부된 과목입니다.");
      return;
    }
  }

  const studentSubjectData = await fetchStudentSubject(
    props.student.studentId,
    subject.subjectId
  );

  const payload = {
    billId: studentSubjectData.id,
    isPay: true,
    payDate: new Date().toISOString(),
    pay: 1, // 납부 금액이 1이면, 서버에서 해당 과목의 원래 수납액으로 알아서 저장
  };

  try {
    await axios.post(
      "http://localhost:8000/api/bill-management-update",
      payload
    );
    alert("납부되었습니다.");
    // 성공 후 UI 업데이트
    subject.billData.isPay = true;

    await fetchBillManagement(studentSubjectData);
  } catch (e) {
    console.error("납부 업데이트에 실패했습니다:", e);
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

.subject-inner-content {
  display: flex;

}

.subject-container {
  margin-left: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
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
  transition: background-color 0.2s, color 0.2s;
}

.subject-container button:hover {
  background-color: #2540a0;
}

</style>