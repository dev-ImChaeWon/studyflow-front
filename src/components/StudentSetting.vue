<template>
    <p class="title">학생 정보 수정</p>
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
    <div class="card">
        <div class="card-header">
            <h2 class="student-name">김철수</h2>
        </div>
        <div class="card-body">
          <div class="subject">
            <li>초5수학</li> <!-- v-for로 해당학생 과목 불러와서 반복 -->
            <li>영어</li>
            <li>국어</li>
          </div>
            <button @click="showModal">정보 수정</button>
        </div>
    </div>
    <div class="modal-wrapper">
        <div class="modal">
            <label for="student-name">학생 : </label>
            <input placeholder="김철수">
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const subjects = ref([]);

function showModal(){
    let modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.classList.add('active');
    
    document.body.style.overflow = 'hidden';
}

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
.title {
    margin: 10px 0 10px;
    font-weight: 500;
    font-size: large;
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

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;

}

.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}

.card-body {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  row-gap: 15px;
  font-size: 14px;
}

.subject {
  display: flex;
}

button {
  margin-left: 5px;
  font-size: medium;
  border-style: hidden;
  border-radius: 8px;
  padding: 2px 4px;
  background-color: #3461FD;
  color: #dbe3ff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #2540a0;
}

li {
  list-style: none;
  margin: 0 5px;
}

.modal-wrapper{
  position: fixed;
  backdrop-filter: blur(1px);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  align-items: center;
  justify-content: center;

  display: none;
}

.modal-wrapper.active {
  display: flex;
}

.modal{
  border: 2px solid 3461FD;
  border-radius: 7px;
  background-color: rgb(237, 239, 255);
  padding: 30px;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  row-gap: 25px;
}
</style>