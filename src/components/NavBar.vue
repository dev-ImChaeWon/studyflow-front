<template>
    <nav>
        <div>
            <router-link to="/">
                <h1>로고</h1>
            </router-link>
        </div>
        <div>
            {{userId}}
            <button class="add-button" @click="logout">로그아웃</button>
        </div>
    </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = ref('');

const logout = () => {
  // localStorage에서 authToken을 제거
  localStorage.removeItem('authToken');
  
  // 로그아웃 후 로그인 페이지로 리디렉션
  router.push('/login');
};

onMounted(()=>{
    userId.value = localStorage.getItem("userId");
})
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    align-items: center;
}

div {
    display: flex;
    align-items: center;
    column-gap: 15px;
}


.add-button {
    background-color: #3461FD;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}
</style>