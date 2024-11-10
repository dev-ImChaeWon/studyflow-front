<template>
    <nav>
        <div>
            <router-link to="/">
                <h1>로고</h1>
            </router-link>
        </div>
        <div>
            <router-link to="/login">
                <button class="add-button">로그인</button>
            </router-link>
        </div>
    </nav>
</template>

<script setup></script>

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