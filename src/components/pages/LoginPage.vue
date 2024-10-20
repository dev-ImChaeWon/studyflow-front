<template>
    <div id="form-box">

        <form>
            <div id="title-box">
                <h1>로그인</h1>
                <p id="sub-text">내일의 가능성을 만드는 학습</p>
            </div>
            <div id="login-box">
                <InputBox type="text" placeholder="아이디"/>
                <InputBox type="password" placeholder="비밀번호"/>
                <router-link id="find-password" to="/find-password">비밀번호를 잊으셨나요?</router-link>
            </div>
            <div id="login-box">
                <Button text="로그인"/>
                <p id="create-account">계정이 없으신가요? <router-link to="/join">회원가입</router-link></p>
            </div>
        </form>
    </div>
</template>

<script setup>
import Button from '../CustomButton.vue';
import InputBox from '../InputBox.vue';

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
</style>