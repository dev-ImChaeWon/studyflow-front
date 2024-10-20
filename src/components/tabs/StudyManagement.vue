<template>
    <h1>학습관리</h1>
    <div class="filter-header">
        <p>검색 조건</p>
        <div class="tag-container">
            <div class="tags">
                <SearchTag label="교사" value="김철수"/>
                <SearchTag label="상태" value="O"/>
                <SearchTag label="학생" value="홍길동"/>
            </div>
            <button class="icon-btn"><svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
        </div>
    </div>
    <div class="filter">
        <div class="input-box">
            <label for="teacher">교사</label>
            <select class="filter-input" name="teacher" id="teacher">
                <option>전체</option>
                <option>김철수</option>
                <option>홍길동</option>
                <option>박영희</option>
            </select>
        </div>
        <div class="input-box">
            <label for="complete">상태</label>
            <select class="filter-input" name="complete" id="complete">
                <option>전체</option>
                <option>O</option>
                <option>X</option>
                <option>△</option>
            </select>
        </div>
        <div class="input-box">
            <label for="student-name">학생 : </label>
            <input placeholder="Enter를 눌러 검색하세요" class="filter-input" id="student-name"/>
        </div>
    </div>
    <CalendarTab/>
    <div class="list-box">
        <StudentCard/>
        <StudentCard/>
    </div>
</template>
<script setup>
import CalendarTab from '../CalendarTab.vue';
import SearchTag from '../SearchTag.vue';
import StudentCard from '../StudentCard.vue';

</script>
<style scoped>
.filter-header{
    padding: 25px 0 15px;
}

.tag-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.filter{
    display: flex;
    align-items: stretch;
    column-gap: 20px;
    padding: 0 0 25px 0;
}
.input-box{
    display: flex;
    align-items: baseline;
    column-gap: 5px;
}


label{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.tags{
    display: flex;
    column-gap: 3px;
    row-gap: 3px;
    flex-wrap: wrap;
}
.icon-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: aliceblue;
    border: none;
    padding: 5px;
    border-radius: 8px;
    border: 0.5px solid rgb(135, 135, 247);
    align-self: flex-end;
}

.filter-input{
    padding: 5px;
    border: none;
    border-bottom:1px solid rgb(206, 206, 255);
    outline: none;
    
}

.input-box:last-child{
    flex-grow: 1;
}

#student-name{
    flex-grow: 1;
    width: 100px;
}

.list-box{
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
}
</style>