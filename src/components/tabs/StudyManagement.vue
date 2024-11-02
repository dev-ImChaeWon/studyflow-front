<template>
    <h1>학습관리</h1>
    <div class="filter-header">
        <p>검색 조건</p>
        <div class="tag-container">
            <div class="tags">
                <SearchTag v-for="t in searchTags" :key="t.id" :label="t.type" :value="t.value"
                 :id="t.id"
                  @click-tag="removeTag"
                />
            </div>
            <button @click="()=>{studentName= ''; selectedTeacher=''}" class="icon-btn"><svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
        </div>
    </div>
    <div class="filter">
        <div class="input-box">
            <label for="teacher">교사</label>
            <select v-model="selectedTeacher" class="filter-input" name="teacher" id="teacher">
                <option value="all">전체</option>
                <option v-for="t in teachers" :key="t.userId" :value="t.userId">{{t.userName}}</option>
            </select>
        </div>
        <div class="input-box">
            <label for="student-name">학생 : </label>
            <input v-model="studentName" placeholder="Enter를 눌러 검색하세요" class="filter-input" id="student-name"/>
        </div>
    </div>
    <CalendarTab :today="today" :defaultDate="selectedDate" @update-date="fetchStudentListByDate"/>
    <StatusToggle @update-status="fetchStudentListByStatus"/>
    <div class="list-box">
        <StudentCard/>
        <StudentCard/>
        <StudentPagination 
            :totalItems="30" 
            :itemsPerPage="5" 
            @update-page="fetchStudentListByPage"
        />
    </div>
</template>
<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import CalendarTab from '../CalendarTab.vue';
import SearchTag from '../SearchTag.vue';
import StudentCard from '../StudentCard.vue';
import axios from 'axios';
import StatusToggle from '../StatusToggle.vue';
import StudentPagination from '../StudentPagination.vue';


const searchTags = computed(()=>{
    const res = [];
    let id = 1;
    if(selectedTeacher.value !== '' && selectedTeacher.value !== 'all'){
        res.push({id, type:'교사', value:selectedTeacher.value});
        id++;
    }
    if(studentName.value != ''){
        res.push({id, type:'학생', value:studentName.value});
    }
    return res;
});

const selectedTeacher = ref('');
const studentName = ref('');
const currentPage = ref(1);
const status = ref('completed');
let dateToString = (target) => {
    let year = target.getFullYear();
    let month = target.getMonth() + 1;
    let date = target.getDate();

    return '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
}
let date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);


const teachers = ref([]);

watch([selectedTeacher, studentName, currentPage, selectedDate,status], (current)=>{
    console.log(current);
})

async function removeTag(tagType){
    if(tagType === '교사'){
        selectedTeacher.value = '';
    }else{
        studentName.value = '';
    }
}

async function fetchStudentListByPage(page){
    console.log('page', page);
    currentPage.value = page;
}

async function fetchStudentListByDate(date){
    console.log('date', date);
    selectedDate.value = date;
}

async function fetchStudentListByStatus(newStatus){
    console.log('status', newStatus);
    status.value=newStatus
}

async function fetchTeacherList(){
    try{
        let res = await axios.get('http://localhost:8000/api/teacher');
        teachers.value = res.data;
    }catch(e){
        alert('서버에서 알 수 없는 오류가 발생했습니다. 잠시후 다시 시도해주세요');
    }
}

onMounted(()=>{
    fetchTeacherList();
})

</script>
<style scoped>
.filter-header{
    padding: 25px 0 15px;
}

.tag-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
.tags{
    display: flex;
    column-gap: 3px;
    row-gap: 3px;
    flex-wrap: wrap;
}
.icon-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: aliceblue;
    border: none;
    padding: 5px;
    border-radius: 8px;
    border: 0.5px solid rgb(135, 135, 247);
    align-self: flex-end;
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

.list-box{
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
}
</style>