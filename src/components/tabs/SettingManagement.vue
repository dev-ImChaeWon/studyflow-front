<template>
    <h1>환경설정</h1>
        <div v-if="showComponent === 'default'">
            <div class="student-manage">
                <button @click="showStudentRegister">새로운 학생 등록</button>
                <button @click="showStudentSetting">학생 정보 수정</button>
            </div>
            <div class="teacher-manage">
                <button @click="showTeacherRegister">새로운 교사 등록</button>
                <button @click="showTeacherSetting">교사 정보 수정</button>
            </div>
            <div class="parent-manage">
                <button @click="showParentRegister">학부모 자녀 등록</button>
                <button @click="showTestScoreRegister">주간평가 점수 등록</button>
            </div>
            <div class="bill-manage">
                <button @click="showBillRegister">수납정보 등록 및 수정</button>
            </div>
        </div>
    <StudentRegister v-else-if="showComponent === 'studentRegister'" />
    <StudentSetting v-else-if="showComponent === 'studentSetting'" />
    <TeacherRegister v-else-if="showComponent === 'teacherRegister'" />
    <TeacherSetting v-else-if="showComponent === 'teacherSetting'" />
    <ParentRegister v-else-if="showComponent === 'parentRegister'" />
    <TestScoreRegister v-else-if="showComponent === 'testScoreRegister'" />
    <BillRegister v-else-if="showComponent === 'billRegister'" />
</template>
<script setup>
import { ref } from 'vue'
import StudentRegister from '../StudentRegister.vue';
import StudentSetting from '../StudentSetting.vue';
import TeacherSetting from '../TeacherSetting.vue';
import TeacherRegister from '../TeacherRegister.vue';
import ParentRegister from '../ParentRegister.vue';
import TestScoreRegister from '../TestScoreRegister.vue';
import BillRegister from '../BillRegister.vue';

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

function showParentRegister() {
    showComponent.value = 'parentRegister';
}

function showTestScoreRegister() {
    showComponent.value = 'testScoreRegister';
}

function showBillRegister() {
    showComponent.value = 'billRegister';
}
</script>
<style scoped>
.teacher-manage, .student-manage, .parent-manage, .bill-manage {
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

.parent-manage button {
    border-radius: 7px;
    border-style: hidden;
    margin: 10px 20%;
    flex: auto;
    padding: 10px;
    font-size: large;
    color: #dbe3ff;
    background-color: #5c85ff;
    transition: background-color 0.25s, color 0.25s;
}

.parent-manage button:hover {
    cursor: pointer;
    background-color: #5176e3;
}

.bill-manage button {
    border-radius: 7px;
    border-style: hidden;
    margin: 10px 20%;
    flex: auto;
    padding: 10px;
    font-size: large;
    color: #000000;
    background-color: #e7ff87;
    transition: background-color 0.25s, color 0.25s;
}

.bill-manage button:hover {
    cursor: pointer;
    background-color: #fff184;
}
</style>