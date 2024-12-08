<template>
    <p class="title">학부모 자녀 등록</p>
    <form class="auth-container">
        <div class="register-box">
            <div class="input-box">
                <label for="부모 이름">부모 이름</label>
                <select class="input-content" v-model="selectedParentId" name="parent-id" id="parent-id">
                  <option v-for="p in parents" :key="p.userId" :value="p.userId">{{ p.userName }}</option>
                  <p id="parent-id-msg" class="status-msg err">필수입력값입니다.</p>
                </select>
            </div>
            <div class="input-box">
                <label for="학생 이름">학생 이름</label>
                <select class="input-content" v-model="selectedStudent" name="student-name" id="student-id">
                  <option v-for="s in students" :key="s.studentId" :value="s.studentId">{{ s.studentName }}</option>
                  <p id="student-id-msg" class="status-msg err">필수입력값입니다.</p>
                </select>
            </div>
            <button>등록</button>
        </div>  
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const parents = ref([]);
const students = ref([]);
const selectedParentId = ref('');
const selectedStudent = ref('');

let inputs = {
  selectedParentId : {isErr : true, errMsg : "필수 입력 값입니다."},
  selectedStudent : {isErr : true, errMsg : "필수 입력 값입니다."}
}

async function fetchParentList() {
  try {
    const res = await axios.get('http://localhost:8000/api/parent');
    parents.value = res.data;
  } catch (e) {
    console.error('부모 정보를 가져오는데 실패했습니다: ', e);
  }
}

async function fetchStudentList() {
  try {
    const res = await axios.get('http://localhost:8000/api/all-student');
    students.value = res.data;
  } catch (e) {
    console.error('학생 정보를 가져오는데 실패했습니다: ', e);
  }
}

onMounted(() => {
  fetchParentList();
  fetchStudentList();
  let selectedParentIdInput = document.querySelector('#parent-id');
  let selectedStudentInput = document.querySelector('#student-id');

  selectedParentIdInput.oninput = async (e) => {
    let parentIdMsg = document.querySelector('#parent-id-msg');

    if(e.target.value == '') {
      parentIdMsg.classList.add('active');
      parentIdMsg.innerText = '필수 입력 값입니다.';
      inputs.selectedParentId.isErr = true;
      inputs.selectedParentId.errMsg = '필수 입력 값입니다.';
    } else {
      parentIdMsg.classList.remove('active');
      inputs.selectedParentId.isErr = false;
    }
  }

  selectedStudentInput.oninput = async (e) => {
    let studentMsg = document.querySelector('#student-id-msg');

    if(e.target.value == '') {
      studentMsg.classList.add('active');
      studentMsg.innerText = '필수 입력 값입니다.';
      inputs.selectedStudent.isErr = true;
      inputs.selectedStudent.errMsg = '필수 입력 값입니다.';
    } else {
      studentMsg.classList.remove('active');
      inputs.selectedStudent.isErr = false;
    }
  }

  let authForm = document.querySelector('.auth-container');
  authForm.onsubmit = async (e) => {
    e.preventDefault();

    let parentMsg = document.querySelector('#parent-id-msg');
    let studentMsg = document.querySelector('#student-id-msg');

    if(inputs.selectedParentId.isErr) {
      parentMsg.classList.add('active');
      parentMsg.innerText = inputs.selectedParentId.errMsg;
    } else {
      parentMsg.classList.remove('active');
    }

    if(inputs.selectedStudent.isErr) {
      studentMsg.classList.add('active');
      studentMsg.innerText = inputs.selectedStudent.errMsg;
    }

    if(inputs.selectedParentId.isErr == false && inputs.selectedStudent.isErr == false) {
      try {
        const data = {
          parent : {
            userId : selectedParentId.value
          },

          student : {
            studentId : selectedStudent.value
          }
        }

        const res = await axios.post('http://localhost:8000/api/parent-student', data);
        console.log('등록 성공: ', res.data);
        alert('신규 등록 성공');
      } catch (e) {
        console.error('등록 실패: ', e);
        alert('등록에 실패했습니다. 다시 시도해주세요.');
      }
    }
  }
});
</script>

<style scoped>
.auth-container {
    display:flex;
    flex-direction: column;
    align-items: center;
}

.title {
    margin: 10px 0 10px;
    font-weight: 500;
    font-size: large;
}

.input-box {
    display: flex;
    flex-direction: row;
    /* align-items: */
    justify-content: space-between;
    column-gap: 5px;
    margin-bottom: 10px;
}

.input-box label {
  padding-top: 10%;
}

.filter-input {
    padding: 5px;
    border: none;
    border-bottom:1px solid rgb(206, 206, 255);
    outline: none;
}

p {
    font-weight: 500;
}

.register-box button {
    font-size: large;
    font-weight: 500;
    width: 100%;
    height: 50px;
    border-style: hidden;
    border-radius: 5px;
    padding: 1px 2px;
    margin-top: 20px;
    background-color: #3461FD;
    color: #dbe3ff;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

button:hover{
    background-color: #3756c7;
}

li {
    display: inline;
}

.register-box {
    border: 1px solid rgb(172, 199, 213);
    border-radius: 5px;
    padding: 10%;
    margin: 0 10%;
}

.input-content{
  padding: 5px;
  border: none;
  border-bottom:1px solid rgb(206, 206, 255);
  outline: none;
  margin: 10px;
  flex: 1;
  margin-right: 8px;
}

/* Auth Style */
.status-msg{
  font-size: 14px;
  padding-left: 10px;
  display: none;
}

.status-msg.active{
  display: block;
}

.err {
    color: red;
}
</style>