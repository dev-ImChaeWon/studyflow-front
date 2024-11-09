<template>
    <p class="title">학생 등록</p>
    <form class="auth-container">
        <div class="register-box">
            <div class="input-box">
                <label for="student-name">이름</label>
                <input id="student-name" v-model="studentName" type="text" placeholder="이름 입력">
                <p id="student-name-msg" class="status-msg err">필수입력값입니다.</p>
            </div>
            <button>학생 등록</button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const studentName = ref('');

let inputs = {
    studentName : {isErr : true, errMsg : "필수 입력 값입니다."}
}

onMounted(() => {
    let studentNameInput = document.querySelector('#student-name');
    studentNameInput.oninput = async (e) => {
        let studentNameMsg = document.querySelector('#student-name-msg');

        if(e.target.value == ''){
            studentNameMsg.classList.add('active');
            studentNameMsg.innnerText = '필수 입력 값입니다.';
            inputs.studentName.isErr = true;
            inputs.studentName.errMsg = '필수 입력 값입니다.';
        } else {
            studentNameMsg.classList.remove('active');
            inputs.studentName.isErr = false;
        }
    }

    let authForm = document.querySelector('.auth-container');
    authForm.onsubmit = async (e) => {
        e.preventDefault();

        let studentNameMsg = document.querySelector('#student-name-msg');

        if(inputs.studentName.isErr){
            studentNameMsg.classList.add('active');
            studentNameMsg.innerText = inputs.studentName.errMsg;
        } else {
            studentNameMsg.classList.remove('active');
        }

        if(inputs.studentName.isErr == false){
            try {
                const data = {
                    studentName: studentName.value
                };

                const res = await axios.post('http://localhost:8000/api/student', data);
                console.log('학생 등록 성공: ', res.data);
                alert('신규 등록 성공');
            } catch (e) {
            console.error('학생 등록 실패', e);
            alert('등록에 실패했습니다. 다시 시도해주세요.')
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
    flex-direction: column;
    /* align-items: */
    justify-content: space-between;
    column-gap: 5px;
    margin-bottom: 10px;
}

.input-box input {
    padding: 5px;
    border: none;
    border-bottom: 1px solid rgb(206, 206, 255);
    outline: none;
    width: 90%;
    margin-bottom: 10%px;
}

p {
    font-weight: 500;
}

.register-box {
    border: 1px solid rgb(172, 199, 213);
    border-radius: 5px;
    padding: 10%;
    margin: 0 10%;
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