<template>
    <h1>환경설정</h1>
        <div v-if="showComponent === 'default'">
            <div class="student-manage">
                <button @click="showStudentRegister">학생 등록</button>
                <button @click="showStudentSetting">학생 정보 수정</button>
            </div>
            <div class="teacher-manage">
                <button @click="showTeacherRegister">교사 등록</button>
                <button @click="showTeacherSetting">교사 정보 수정</button>
            </div>
        </div>
    <StudentRegister v-else-if="showComponenet === 'studentRegister'" />
    <StudentSetting v-else-if="showComponent === 'studentSetting'" />
    <TeacherRegister v-else-if="showComponent === 'teacherRegister'" />
    <TeacherSetting v-else-if="showComponent === 'teacherSetting'" />
</template>
<script setup>
import { ref } from 'vue'
import StudentRegister from '../StudentRegister.vue';
import StudentSetting from '../StudentSetting.vue';
import TeacherSetting from '../TeacherSetting.vue';
import TeacherRegister from '../TeacherRegister.vue';

const showComponent = ref('default');

function showStudentRegister() {
    showComponent.value = 'studentRegister';
}

function showStudentSetting() {
    showComponent.value = 'studentSetting';
}

function showTeacherRegister() {
    showComponent.value = 'teacherRegister';
}

function showTeacherSetting() {
    showComponent.value = 'teacherSetting';
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
    background-color: #3657cf;
}

.teacher-manage button {
    border-radius: 7px;
    border-style: hidden;
    margin: 10px 20%;
    flex: auto;
    padding: 10px;
    font-size: large;
    color: #dbe3ff;
    background-color: #556dc5;
    transition: background-color 0.25s, color 0.25s;
}

.teacher-manage button:hover {
    cursor: pointer;
    background-color: #465ba7;
}
</style>