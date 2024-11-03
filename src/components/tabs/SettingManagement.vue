<template>
    <h1>환경설정</h1>
        <div v-if="showComponent === 'default'">
            <div class="student-manage">
                <button >학생 등록</button>
                <button @click="showStudentSetting">학생 정보 수정</button>
            </div>
            <div class="teacher-manage">
                <button >교사 등록</button>
                <button @click="showTeacherSetting">교사 정보 수정</button>
            </div>
        </div>
    <StudentSetting v-else-if="showComponent === 'student'" />
    <TeacherSetting v-else-if="showComponent === 'teacher'" />
</template>
<script setup>
import { ref } from 'vue'
import StudentSetting from '../StudentSetting.vue'
import TeacherSetting from '../TeacherSetting.vue';

const showComponent = ref('default');

function showStudentSetting() {
    showComponent.value = 'student';
}

function showTeacherSetting() {
    showComponent.value = 'teacher';
}
</script>
<style scoped>
.teacher-manage, .student-manage {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}

.student-manage button {
    border-radius: 7px;
    border-style: hidden;
    margin: 10px 20%;
    flex: auto;
    padding: 10px;
    font-size: large;
    color: #dbe3ff;
    background-color: #3461FD;
    transition: background-color 0.25s, color 0.25s;
}

.student-manage button:hover {
    cursor: pointer;
    background-color: #3150c0;
}

.teacher-manage button {
    border-radius: 10px;
    border-style: hidden;
    margin: 10px 30%;
    flex: auto;
    padding: 5px;
    background-color: #e1e7ff;
    transition: background-color 0.3s, color 0.3s;
}

.teacher-manage button:hover {
    cursor: pointer;
    background-color: #c8d4ff;
}
</style>