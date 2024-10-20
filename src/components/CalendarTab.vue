<template>
    <div class="month-picker">
        <div class="month-box">

                <button @click="onMonthClick('left')">
                    &lt;
                </button>
                <div class="month">{{selectedDate.split('-')[1]}}</div>
                <button @click="onMonthClick('right')">
                    &gt;
                </button>
            
            <div class="label">월</div>
        </div>
        <button @click="setToday">오늘</button>
    </div>
    <div class="calendar-container">
        <div class="arrow box" @click="onWeekClick('left')">&lt;</div>
        <div v-for="d in visibleDates" v-bind:key="d" class="date box" 
        :class="{ today : d === today, selected : d === selectedDate}"
        @click="clickDate(d)"
        >
            <span class="date">{{d.split('-')[2]}}</span>
            <div class="dot"></div>
        </div>
        <div class="arrow box" @click="onWeekClick('right')">&gt;</div>
        
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';



let dateToString = (target)=>{
    let year = target.getFullYear();
    let month = target.getMonth() + 1;
    let date = target.getDate();

    return '' + year + '-' + (month <10 ? '0'+month  : month) + '-' + (date < 10 ? '0'+date : date);
}
let date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);

// 주간 날짜 배열 생성
let visibleDates = computed(() => {
    const weekDates = [];
    const now = new Date(selectedDate.value);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // 주의 시작일 (일요일)

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek); // 새로운 날짜 객체 생성
        currentDay.setDate(startOfWeek.getDate() + i); // i일 후의 날짜
        weekDates.push(dateToString(currentDay));
    }
    return weekDates;
});
// 주 변경 함수
let onWeekClick = (direction) => {
    let now = new Date(selectedDate.value);
    if (direction === 'left') {
        now.setDate(now.getDate() - 7); // 이전 주로 이동
    } else {
        now.setDate(now.getDate() + 7); // 다음 주로 이동
    }
    selectedDate.value = dateToString(now);

    
};




let clickDate = (target)=>{
    selectedDate.value=target;
}

let onMonthClick = (target)=>{
    let now = new Date(selectedDate.value);
    if(target === 'left'){
        now.setDate(0);
    }else{
        now.setMonth(now.getMonth() +1);
        now.setDate(1);
    }

    console.log((now));
    selectedDate.value = dateToString(now);
}

let setToday = () => {
    selectedDate.value = today; // 오늘 날짜로 설정
};

</script>

<style scoped>


.month-picker{
    display: flex;
    justify-content: space-between;
}

.month-box{
    display: flex;
}

.calendar-container{
    display: flex;
}

div.box{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 4px;
    cursor: pointer;
    padding: 8px;
}

div.box.selected, div.box:hover{
    font-weight: bold;
    color: #3461FD;
    background-color: #F5F9FE;
    
}

div.box.today .dot{
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: #d4d3d3;
}

div.box.selected .dot{
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: #3461FD;
}

</style>