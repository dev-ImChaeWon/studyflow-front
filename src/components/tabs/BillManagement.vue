<template>
    <h1>수납관리</h1>
    <div class="filter-header">
        
    </div>
    <div class="filter">
        <div class="input-box">
            <label for="teacher">과목</label>
            <select class="filter-input" name="subject" id="subject">
                <option value="all">전체</option>
                <option v-for="s in subjects" :key="s.subjectId" :value="s.subjectId">{{s.subjectName}}</option>
            </select>
        </div>
        <div class="input-box">
            <label for="student-name">학생 : </label>
            <input placeholder="Enter를 눌러 검색하세요" class="filter-input" id="student-name"/>
        </div>
    </div>

    <CalendarTab/>
    <BillStatusCard/>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import BillStatusCard from '../BillStatusCard.vue';
import CalendarTab from '../CalendarTab.vue';

const subjects = ref([]);

async function fetchSubjectList(){
    try{
        let res = await axios.get('http://localhost:8000/api/subject');
        subjects.value = res.data;
    }catch(e){
        alert('서버에서 알 수 없는 오류가 발생했습니다. 잠시후 다시 시도해주세요');
    }
}

onMounted(()=>{
    fetchSubjectList();
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