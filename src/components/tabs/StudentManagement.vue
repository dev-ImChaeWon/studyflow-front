<template>
    <h1>원생관리</h1>
    <CalendarTab/>
    <div class="student-list">
        <div class="student">
            <span class="student-name">학생 A</span>
            <div class="attendance-box">
                <input type="checkbox" id="attendance-1-2024-10-26" />
                <label for="attendance-1-2024-10-26">출석</label>
            </div>
        </div>
        <div class="student">
            <span class="student-name">학생 B</span>
            <div class="attendance-box">
                <input type="checkbox" id="attendance-2-2024-10-26" />
                <label for="attendance-2-2024-10-26">출석</label>
            </div>
        </div>
        </div>
</template>
<script setup>
import CalendarTab from '../CalendarTab.vue';
</script>
<style scoped>
    h1{
        margin-bottom: 30px;
    }

    .attendance-checker {
    margin-top: 20px;
}

.student-list {
    margin-top: 10px;
}

.student {
    margin-bottom: 20px;
}

.student-name {
    font-weight: bold;
    margin-bottom: 10px;
}

.attendance-box {
    display: flex;
    align-items: center;
}

input[type="checkbox"] {
    margin-right: 5px;
    cursor: pointer;
}

</style>