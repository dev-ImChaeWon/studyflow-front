<template>
  <h1>출석률</h1>
  <div v-if="attendanceList.length > 0">
    <p>총 출석률: {{ attendanceRate.toFixed(2) }}%</p>
    <ul>
      <li>출석: {{ presence }}</li>
      <li>지각: {{ late }}</li>
      <li>조퇴: {{ leaveEarly }}</li>
      <li>결석: {{ absence }}</li>
    </ul>
  </div>
  <div v-else>
    <p>출석 데이터가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const attendanceList = ref([]);
const presence = ref(0);
const late = ref(0);
const leaveEarly = ref(0);
const absence = ref(0);

// 출석률 계산
const attendanceRate = computed(() => {
  if (attendanceList.value.length === 0) return 0;

  // "결석"이 아닌 경우 1, "결석"인 경우 0으로 계산
  const presentCount = attendanceList.value.reduce((count, item) => {
    return count + (item.isAttend === "결석" ? 0 : 1);
  }, 0);

  
  return (presentCount / attendanceList.value.length) * 100;
});



const loadAttendanceData = async () => {
  try {
    const student  = await axios.get("http://localhost:8000/api/parent-student-info?parentId=" + localStorage.getItem("userId"));
    const studentId = student.data[0].student.studentId;
    const response = await axios.get(`http://localhost:8000/api/attendance/${studentId}`);

    presence.value = 0;
    absence.value = 0;
    late.value = 0;
    leaveEarly.value = 0;
    
    // "isAttend" 값에 따라 항목 계산
    response.data.forEach(item => {
      if (item.isAttend === "출석") {
        presence.value++;
      } else if (item.isAttend === "결석") {
        absence.value++;
      } else if (item.isAttend === "지각") {
        late.value++;
      } else if (item.isAttend === "조퇴") {
        leaveEarly.value++;
      }
    });

    attendanceList.value = response.data;
  } catch (e) {
    console.error("출석 데이터를 불러오는 중 오류 발생:", e);
  }
};

onMounted(() => {
  loadAttendanceData();
});
</script>

<style scoped>
h1 {
  color: #333;
}

p {
  font-size: 1.2em;
  margin: 0.5em 0;
}
</style>