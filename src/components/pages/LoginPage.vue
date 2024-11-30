<template>
    <div id="form-box">

        <form @submit.prevent="handleLogin">
            <div id="title-box">
                <h1>로그인</h1>
                <p id="sub-text">내일의 가능성을 만드는 학습</p>
            </div>
            <div id="login-box">
                <!-- 사용자 타입 선택 토글 -->
                <div class="toggle-wrapper" @click="toggleUserType">
                    <div class="toggle-item" :class="{ 'active': userType === 'P' }">학부모</div>
                    <div class="toggle-item" :class="{ 'active': userType === 'T' }">선생님</div>
                    <div class="toggle-indicator" :style="togglePosition"></div>
                </div>
                <InputBox @update-value="(v)=>userId = v" type="text" placeholder="아이디" />
                <InputBox @update-value="(v) => userPassword = v" :err-text="errMsg" :touched="true" type="password" placeholder="비밀번호" />
                <router-link id="find-password" to="/find-password">비밀번호를 잊으셨나요?</router-link>
            </div>
            <div id="login-box">
                <Button  text="로그인"   />
                <p id="create-account">계정이 없으신가요? <router-link to="/join">회원가입</router-link></p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../CustomButton.vue';
import InputBox from '../InputBox.vue';
import axios from 'axios';

// 사용자 타입 상태 (학부모/P, 선생님/T)
const userType = ref('P');
const errMsg = ref('');
const userId = ref('');
const userPassword = ref('');

const router = useRouter();

const handleLogin = async ()=>{
    const res = await axios.post('http://localhost:8000/api/auth/signin', {
        userId : userId.value, 
        userPassword : userPassword.value, 
        userRole: userType.value
    });

    if(!res.data){
        errMsg.value = '아이디 또는 비밀번호를 확인해주세요.'
        console.log(errMsg.value);
    }else{
        // console.log(res.data);
        errMsg.value = '';
        localStorage.setItem('authToken', res.data.authToken);
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('userRole', res.data.userRole);
        
        router.replace('/');
        
    }
}



// 토글을 클릭할 때마다 사용자 타입 변경
const toggleUserType = () => {
    userType.value = userType.value === 'P' ? 'T' : 'P';
};

// 토글 인디케이터의 위치를 동적으로 설정 (슬라이드 애니메이션)
const togglePosition = computed(() => {
    return userType.value === 'T'
        ? { transform: 'translateX(100%)' } // 선생님이 선택되면 오른쪽으로 이동
        : { transform: 'translateX(0%)' };  // 학부모가 선택되면 왼쪽에 고정
});
</script>

<style scoped>
/* 사용자 타입 토글 스타일 */
.toggle-wrapper {
    position: relative;
    width: 100%;
    height: 60px;
    background-color: #F5F9FE;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.toggle-item {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #61677D;
    transition: color 0.3s ease;
    position: relative;
    z-index: 100;
}

.toggle-item.active {
    color: #fff;
}

.toggle-indicator {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 48%;
    height: 50px;
    background-color: #2A4ECA;
    border-radius: 4px;
    transition: transform 0.3s ease;
    z-index: 1;
}

#form-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    padding: 80px 25px;
    row-gap: 35px;
    justify-content: center;
    width: 500px;
}

#title-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
}

h1 {
    color: #2A4ECA;
    font-weight: 900;
}

#sub-text {
    font-size: 14px;
    color: #61677D;
    font-weight: 500;
    line-height: 22px;
}

#login-box {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}

#find-password {
    align-self: flex-end;
}

#create-account {
    font-size: 14px;
    color: #3B4054;
}

#create-account a {
    font-size: 14px;
    color: #3461FD;
}
</style>