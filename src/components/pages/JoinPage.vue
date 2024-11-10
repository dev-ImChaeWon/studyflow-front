<template>
    <div id="form-box">
        <form @submit.prevent="handleSubmit">
            <div id="title-box">
                <h1>회원가입</h1>
                <p id="sub-text">내일의 가능성을 만드는 학습</p>
            </div>
            <div id="login-box">
                <InputBox :touched="touchedId" @update-value="updateId" :err-text="idErrMsg" type="text" placeholder="아이디"/>
                <div id="password-box">
                    <InputBox :touched="touchedPassword" @update-value="updatePassword" :err-text="passwordErrMsg" type="password" placeholder="비밀번호"/>
                    <InputBox :touched="touchedPasswordConfirm" @update-value="updatePasswordConfirm" :err-text="passwordConfirmErrMsg" type="password" placeholder="비밀번호 확인"/>
                </div>
                <InputBox :touched="touchedUserName" @update-value="updateUserName" :err-text="userNameErrMsg" type="text" placeholder="이름"/>
                <!-- <div id="password-box">
                    <select>
                        <option>------비밀번호 찾기를 할 때 사용할 질문을 입력해 주세요------</option>
                        <option>나의 좌우명은?</option>
                        <option>내가 좋아하는 색은?</option>
                        <option>내가 태어난 도시는?</option>
                    </select>
                    <InputBox placeholder="답변 입력"/>
                </div>
                <div id="radio-box">
                    
                        <input type="radio" name="user-type" id="parent" value="p" checked>
                        <label for="parent"> 학부모
                    </label>
                    
                        <input type="radio" name="user-type" id="teacher" value="t">
                        <label for="teacher">교사
                    </label>
                </div> -->
            </div>
            <div id="login-box">
                <Button text="회원가입" />
                <p id="create-account">이미 계정이 있으신가요? <router-link to="/login">로그인</router-link></p>
            </div>
        </form>
    </div>
    <SignupPopup ref="popup"/>
</template>

<script setup>
import { ref } from 'vue';
import Button from '../CustomButton.vue';
import InputBox from '../InputBox.vue';
import axios from 'axios';
import SignupPopup from '../SignupPopup.vue';
const id = ref('');
const password = ref('');
const passwordConfirm = ref('');
const userName = ref('');
const idErrMsg = ref('필수 입력 값입니다.');
const passwordErrMsg = ref('필수 입력 값입니다.');
const passwordConfirmErrMsg = ref('필수 입력 값입니다.');
const userNameErrMsg = ref('필수 입력 값입니다.');
// 각 필드에 대한 touched 상태 추가
const touchedId = ref(false);
const touchedPassword = ref(false);
const touchedPasswordConfirm = ref(false);
const touchedUserName = ref(false);

// 팝업 컴포넌트 참조
const popup = ref(null);

const updateId = async (newId)=>{
    id.value = newId;
    const res = await axios.get(`http://localhost:8000/api/auth/signup?id=${newId}&userRole=P`);
    if(newId.length === 0){
        idErrMsg.value = '필수 입력 값입니다.';
    }else if(res.data){
        idErrMsg.value = '이미 존재하는 id입니다.';
    }else if(newId.length > 10){
        idErrMsg.value = '10글자 이하로 설정해 주세요'
    }else{
        idErrMsg.value = '';
    }
}

const updatePassword = async (newValue)=>{
    password.value = newValue;
    if(newValue.length ==0){
        passwordErrMsg.value = '필수 입력 값입니다.';
    }else if(newValue.length < 8){
        passwordErrMsg.value = '8글자 이상으로 입력해 주세요.';
    }else if(newValue.length > 20){
        passwordErrMsg.value = '20글자 이하로 설정해 주세요.'
    }else{
        passwordErrMsg.value = '';
    }
}

const updatePasswordConfirm = async (newValue)=>{
    passwordConfirm.value = newValue;
    if(newValue.length === 0){
        passwordConfirmErrMsg.value = '필수 입력 값입니다.'
    }else if(password.value !== newValue){
        passwordConfirmErrMsg.value = '비밀번호가 일치하지 않습니다.';
    }else{
        passwordConfirmErrMsg.value = '';
    }
}

const updateUserName = async (newValue)=>{
    userName.value = newValue;
    if(newValue.length === 0){
        userNameErrMsg.value = '필수 입력 값입니다.'
    }else if(newValue.length > 20){
        userNameErrMsg.value = '20글자 이하로 설정해 주세요.';
    }else{
        userNameErrMsg.value = '';
    }
}

const handleSubmit = async ()=>{
    touchedId.value = true;
    touchedPassword.value = true;
    touchedPasswordConfirm.value = true;
    touchedUserName.value = true;
    await updateId(id.value);
     updatePassword(password.value);
     updatePasswordConfirm(passwordConfirm.value)
     updateUserName(userName.value)

    if (!idErrMsg.value && !passwordErrMsg.value && !passwordConfirmErrMsg.value && !userNameErrMsg.value) {
        try {
            await axios.post('http://localhost:8000/api/auth/signup', {
                userId: id.value,
                userPassword: password.value,
                userRole: 'P',
                userName: userName.value
            });
            popup.value.openPopup();
        } catch (error) {
            console.error("회원가입 실패", error);
        }
    }
}

</script>

<style scoped>
#form-box{
    display: flex;
    justify-content: center;
    align-items: center;
}
form{
    display: flex;
    flex-direction: column;
    padding:80px 25px;
    row-gap: 35px;
    justify-content: center;
    width: 500px;
}

#title-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
}
h1{
    color: #2A4ECA;
    font-weight: 900;
}
#sub-text{
    font-size: 14px;
    color: #61677D;
    font-weight: 500;
    line-height: 22px;
}

#login-box{
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}
#find-password{
    align-self: flex-end;
}
#create-account{
    font-size: 14px;
    color: #3B4054;
}
#create-account a{
    font-size: 14px;
    color: #3461FD;
}

#password-box{
    display: flex;
    flex-direction: column;
    row-gap: 5px;
}
select{
    height: 60px;
    padding: 18px;
    border: 1px solid #7C8BA0;
    outline: none;
    border-radius: 14px;
}

#radio-box{
    display: flex;
    justify-content: center;
    column-gap: 10px;
}

input[type="radio"]{
    display: none;
}

label{
    background-color: #F5F9FE;
    flex-grow: 1;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    cursor: pointer;
    transition: 0.3s;
}

input[type="radio"]:checked + label{
    box-shadow: 0 0 0 2px #2A4ECA inset;
}

</style>