<template>
    <p class="title">교사 등록</p>
    <form class="auth-container">
        <div class="register-box">
            <div class="input-box">
                <label for="teacher-name">이름</label>
                <input id="teacher-name" v-model="teacherName" type="text" placeholder="이름 입력">
                <p id="teacher-name-msg" class="status-msg err">필수입력값입니다.</p>
            </div>
            <div class="input-box">
                <label for="teacher-role">역할</label>
                <select v-model="selectedRole" class="filter-input" name="teacher-role" id="teacher-role">
                    <option value="T">T</option>
                    <option value="M">M</option>
                </select>
                <p id="teacher-role-msg" class="status-msg err">필수입력값입니다.</p>
            </div>
            <div class="input-box">
                <label for="user-id">아이디</label>
                <input id="user-id" v-model="userId" type="text" placeholder="아이디 입력">
                <p id="user-id-msg" class="status-msg err">필수입력값입니다.</p>
            </div>
            <div class="input-box">
                <label for="password">비밀번호</label>
                <input id="password" v-model="password" type="password" placeholder="비밀번호 입력">
                <p id="password-msg" class="status-msg err">필수입력값입니다.</p>
            </div>
            <div class="input-box">
                <label for="password-check">비밀번호 확인</label>
                <input id="password-check" type="password" placeholder="비밀번호 확인">
                <p id="password-check-msg" class="status-msg err">비밀번호가 일치하지 않습니다.</p>
            </div>
            <button>교사 등록</button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import axios from 'axios';

const teacherName = ref('');
const userId = ref('');
const password = ref('');
const selectedRole = ref('');

// const router = useRouter();

let inputs = {
  teacherName : {isErr : true , errMsg : "필수 입력 값입니다."},
  teacherRole : {isErr : true , errMsg : "필수 입력 값입니다."},
  userId : {isErr : true, errMsg : "필수 입력 값입니다."},
  password : {isErr : true , errMsg : "필수 입력 값입니다."},
  passwordCheck : {isErr : true , errMsg : "필수 입력 값입니다."}
}

// 유효성 검사
onMounted(() => {
    // 티쳐 이름 검사
    let teacherNameInput = document.querySelector('#teacher-name');
    teacherNameInput.oninput = (e)=>{
        let teacherNameMsg = document.querySelector('#teacher-name-msg');
    
        if(e.target.value == ''){
            teacherNameMsg.classList.add('active');
            teacherNameMsg.innerText = '필수 입력 값입니다.';
            inputs.teacherName.isErr = true;
            inputs.teacherName.errMsg = '필수 입력 값입니다.';
        } else{
            teacherNameMsg.classList.remove('active');
            inputs.teacherName.isErr = false;
        }
    }

    // 티쳐 역할 검사
    let teacherRoleInput = document.querySelector('#teacher-role');
    teacherRoleInput.oninput = (e)=>{
        let teacherRoleMsg = document.querySelector('#teacher-role-msg');

        if(e.target.value == ''){
            teacherRoleMsg.classList.add('active');
            teacherRoleMsg.innerText = '필수 입력 값입니다.';
            inputs.teacherRole.isErr = true;
            inputs.teacherRole.errMsg = '필수 입력 값입니다.';
        } else {
            teacherRoleMsg.classList.remove('active');
            inputs.teacherRole.isErr = false;
        }
    }

    // 아이디 검사
    let userIdInput = document.querySelector('#user-id');
    userIdInput.oninput = (e)=>{
        let userIdMsg = document.querySelector('#user-id-msg');

        if(e.target.value == ''){
            userIdMsg.classList.add('active');
            userIdMsg.innerText = '필수 입력 값입니다.';
            inputs.userId.isErr = true;
            inputs.userId.errMsg = '필수 입력 값입니다.';
        } else{
            userIdMsg.classList.remove('active');
            inputs.userId.isErr = false;
        }
    }

    // 비밀번호 검사
    let passwordInput = document.querySelector('#password');
    passwordInput.oninput = (e)=>{
        let passwordMsg = document.querySelector('#password-msg');

        if(e.target.value == ''){
            passwordMsg.classList.add('active');
            passwordMsg.innerText = '필수 입력 값입니다.';
            inputs.password.isErr = true;
            inputs.password.errMsg = '필수 입력 값입니다.';
        }else{
            passwordMsg.classList.remove('active');
            inputs.password.isErr = false;
        }
    }

    // 비밀번호 확인 검사
    let passwordCheckInput = document.querySelector('#password-check');
    passwordCheckInput.oninput = (e)=>{
        let passwordCheckMsg = document.querySelector('#password-check-msg');
        let password = document.querySelector('#password');

        if(e.target.value == ''){
            passwordCheckMsg.classList.add('active');
            passwordCheckMsg.innerText = '필수 입력 값입니다.';
            inputs.passwordCheck.isErr = true;
            inputs.passwordCheck.errMsg = '필수 입력 값입니다.';
        }else if(e.target.value != password.value){
            passwordCheckMsg.classList.add('active');
            passwordCheckMsg.innerText = '비밀번호가 일치하지 않습니다.';
            inputs.passwordCheck.isErr = true;
            inputs.passwordCheck.errMsg = '비밀번호가 일치하지 않습니다.';
        }else{
            passwordCheckMsg.classList.remove('active');
            inputs.passwordCheck.isErr = false;
        }   
    }

    let authForm = document.querySelector('.auth-container');
    authForm.onsubmit = async (e)=>{
    e.preventDefault();
    
    let teacherNameMsg = document.querySelector('#teacher-name-msg');
    let teacherRoleMsg = document.querySelector('#teacher-role-msg');
    let userIdMsg = document.querySelector('#user-id-msg');
    let passwordMsg = document.querySelector('#password-msg');
    let passwordCheckMsg = document.querySelector('#password-check-msg');
    
    if(inputs.teacherName.isErr){
        // teacherName 오류 메시지 보여주기
        teacherNameMsg.classList.add('active');
        teacherNameMsg.innerText = inputs.teacherName.errMsg;
    }else{
        teacherNameMsg.classList.remove('active');
    }

    if(inputs.teacherRole.isErr){
        // teacherRole 오류 메시지 보여주기
        teacherRoleMsg.classList.add('active');
        teacherRoleMsg.innerText = inputs.teacherRole.errMsg;
    }else{
        teacherRoleMsg.classList.remove('active');
    }

    if(inputs.userId.isErr){
        // userId 오류 메시지 보여주시
        userIdMsg.classList.add('active');
        userIdMsg.innerText = inputs.userId.errMsg;
    }else{
        userIdMsg.classList.remove('active');
    }

    if(inputs.password.isErr){
        // password 오류 메시지 보여주기
        passwordMsg.classList.add('active');
        passwordMsg.innerText = inputs.password.errMsg;
    }else{
        passwordMsg.classList.remove('active');
    }

    if(inputs.passwordCheck.isErr){
        // passwordCheck 오류 메시지 보여주기
        passwordCheckMsg.classList.add('active');
        passwordCheckMsg.innerText = inputs.passwordCheck.errMsg;
    }else{
        passwordCheckMsg.classList.remove('active');
    }

    if(
        inputs.teacherName.isErr == false &&
        inputs.teacherRole.isErr == false &&
        inputs.userId.isErr == false &&
        inputs.password.isErr == false &&
        inputs.passwordCheck.isErr == false
    ){
        // 여기서부터 백엔드로 POST 요청
        try {
            const data = {
                userId: userId.value,
                userPassword: password.value,
                userRole: selectedRole.value,
                userName: teacherName.value,
                subject: null
            };

            const res = await axios.post('http://localhost:8000/api/teacher', data);
            console.log('교사 등록 성공: ', res.data);
            alert('신규 등록 성공');

        } catch (e) {
            console.error('교사 등록 실패', e);
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