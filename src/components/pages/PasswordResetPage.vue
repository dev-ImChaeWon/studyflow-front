<template>
    <div id="form-box">
        <form>
            <div id="title-box">
                <h1>비밀번호 설정</h1>
                <p id="sub-text">내일의 가능성을 만드는 학습</p>
            </div>
            <div id="login-box">
                <InputBox type="text" placeholder="아이디"/>
                <div id="password-box">
                    <select>
                        <option>------비밀번호 찾기를 할 때 사용할 질문을 입력해 주세요------</option>
                        <option>나의 좌우명은?</option>
                        <option>내가 좋아하는 색은?</option>
                        <option>내가 태어난 도시는?</option>
                    </select>
                    <InputBox placeholder="답변 입력"/>
                </div>
                
                <div id="password-box">
                    <InputBox type="password" placeholder="새로운 비밀번호 설정"/>
                    <InputBox type="password" placeholder="비밀번호 확인"/>
                </div>
                
            </div>
            <div id="login-box">
                <Button text="비밀번호 재설정"/>
                <p id="create-account">이미 계정이 있으신가요? <router-link to="/login">로그인</router-link></p>
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

</style>