<template>
    <h1>원생관리</h1>
    <CalendarTab :today="today" :default-date="selectedDate" @update-date="onDateChanged"/>
    <div class="student-list">
        <div class="grid-header student-name">학생이름(id)</div>
        <div class="grid-header">-</div>
        <div class="grid-header">출석</div>
        <div class="grid-header">결석</div>
        <div class="grid-header">지각</div>
        <div class="grid-header">조퇴</div>
        <AttendanceCard v-for="student in students" v-bind:key="student.studentId"
            :student-id="student.studentId"
            :student-name="student.student.studentName"
            :is-attend="student.isAttend"
            @update-attendance="updateAttendance"
        />
    </div>
</template>
<script setup>
import {watch , ref } from 'vue';
import axios from 'axios';
import AttendanceCard from '../AttendanceCard.vue';
import CalendarTab from '../CalendarTab.vue';
const students = ref([]);

let dateToString = (target) => {
    let year = target.getFullYear();
    let month = target.getMonth() + 1;
    let date = target.getDate();

    return '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
}
let date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);

// 날짜가 변경되면 호출되는 함수
const onDateChanged = (newDate) => {
    selectedDate.value = newDate;
};


// API 요청 함수
const fetchStudents = async (date) => {
    try {
        // 여기서 API 호출 예시
        const response = await axios.get(`http://localhost:8000/api/attendance`, {
            params: { date }
        });
        students.value = response.data;
    } catch (error) {
        console.error('학생 데이터 로딩 실패', error);
    }
};

// watch로 selectedDate를 감시하여 변경될 때마다 API 호출
watch(selectedDate, (newDate) => {
    console.log(newDate)
    fetchStudents(newDate);
}, { immediate: true });  // 컴포넌트가 마운트될 때 바로 호출

// 출석 상태 업데이트 함수
const updateAttendance = async (studentId, status) => {
    // console.log(studentId, status);
if(status === '-'){
    try{
        await axios.delete(`http://localhost:8000/api/attendance-delete/${studentId}/${selectedDate.value}`);

    }catch(e){
        alert('출석체크 변경 문제 발생');
        console.log(e);
    }
    return;
}

  try {
    const response = await axios.post(`http://localhost:8000/api/attendance-update`, 
        { studentId, isAttend:status, attendanceDate: selectedDate.value}
    );
    // 서버에서 상태 업데이트 완료 후, 학생 목록을 갱신
    const updatedStudent = students.value.find(student => student.studentId === studentId);
    updatedStudent.isAttend = status;
    console.log('출석 상태 업데이트 완료', response.data);
  } catch (error) {
    console.error('출석 상태 업데이트 실패', error);
    alert('출석 상태 업데이트 실패');
  }
};


</script>
<style scoped>
h1 {
    margin-bottom: 30px;
}

.student-list {
    display: grid;
    flex-direction: column;
    padding: 50px 0;
    grid-template-columns: auto 1fr 1fr 1fr 1fr 1fr;
}


.grid-header,
.grid-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    /* border-bottom 추가 */
}



.grid-cell.student-name {
    justify-content: flex-start;
}

.student-row {
    display: contents;
}


</style>