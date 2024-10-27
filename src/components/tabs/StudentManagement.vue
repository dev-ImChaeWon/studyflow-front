<template>
    <h1>원생관리</h1>
    <CalendarTab />
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
        />
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import AttendanceCard from '../AttendanceCard.vue';
import CalendarTab from '../CalendarTab.vue';
const students = reactive([
    {
        "studentId": 1,
        "isAttend": "출석",
        "attendanceDate": null,
        "student": {
            "studentId": null,
            "studentName": "김철수",
            "homework": null
        }
    },
    {
        "studentId": 2,
        "isAttend": "출석",
        "attendanceDate": null,
        "student": {
            "studentId": null,
            "studentName": "이영희",
            "homework": null
        }
    },
    {
        "studentId": 3,
        "isAttend": "조퇴",
        "attendanceDate": null,
        "student": {
            "studentId": null,
            "studentName": "박지민",
            "homework": null
        }
    },
    {
        "studentId": 4,
        "isAttend": "결석",
        "attendanceDate": null,
        "student": {
            "studentId": null,
            "studentName": "최민호",
            "homework": null
        }
    },
    {
        "studentId": 5,
        "isAttend": "조퇴",
        "attendanceDate": null,
        "student": {
            "studentId": null,
            "studentName": "정수연",
            "homework": null
        }
    },
]);

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