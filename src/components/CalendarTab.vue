<template>
    <div class="month-picker">
        <div class="month-box">

            <button class="icon-btn" @click="onMonthClick('left')">
                <svg width="14px" height="14px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                    <path d="M31 36L19 24L31 12" stroke="#000000" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
            <div class="month">{{ selectedDate.split('-')[1] }}</div>
            <button class="icon-btn" @click="onMonthClick('right')">
                <svg width="14px" height="14px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                    <path d="M19 12L31 24L19 36" stroke="#000000" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>

            <div class="label">월</div>
        </div>
        <button class="icon-btn" @click="setToday">
            <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.793 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L14.086 7H12.5C8.952 7 6 9.952 6 13.5S8.952 20 12.5 20s6.5-2.952 6.5-6.5a1 1 0 1 1 2 0c0 4.652-3.848 8.5-8.5 8.5S4 18.152 4 13.5 7.848 5 12.5 5h1.586l-1.293-1.293a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
            오늘
        </button>
    </div>
    <div class="calendar-container">
        <div class="arrow " @click="onWeekClick('left')"><svg width="20px" height="20px" viewBox="0 0 48 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path d="M31 36L19 24L31 12" stroke="#000000" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg></div>
        <div v-for="d in visibleDates" v-bind:key="d" class="date box"
            :class="{ today: d === today, selected: d === selectedDate }" @click="clickDate(d)">
            <span class="date">{{ d.split('-')[2] }}</span>
            <div class="dot"></div>
        </div>
        <div class="arrow " @click="onWeekClick('right')"><svg width="20px" height="20px" viewBox="0 0 48 48"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path d="M19 12L31 24L19 36" stroke="#000000" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg></div>

    </div>
</template>

<script setup>
import { ref, defineEmits,computed } from 'vue';

const emit = defineEmits(['updateDate']);



let dateToString = (target) => {
    let year = target.getFullYear();
    let month = target.getMonth() + 1;
    let date = target.getDate();

    return '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
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

    emit('updateDate', selectedDate.value);

};




let clickDate = (target) => {
    selectedDate.value = target;
    emit('updateDate', selectedDate.value);
}

let onMonthClick = (target) => {
    let now = new Date(selectedDate.value);
    if (target === 'left') {
        now.setDate(0);
    } else {
        now.setMonth(now.getMonth() + 1);
        now.setDate(1);
    }

    selectedDate.value = dateToString(now);
    emit('updateDate', selectedDate.value);
}

let setToday = () => {
    selectedDate.value = today; // 오늘 날짜로 설정
    emit('updateDate', selectedDate.value);
};

</script>

<style scoped>
.month-picker {
    display: flex;
    justify-content: space-between;
}

.month-box {
    display: flex;
}

.calendar-container {
    display: flex;
}

div.box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 4px;
    cursor: pointer;
    padding: 8px;
}

div.box.selected,
div.box:hover {
    font-weight: bold;
    color: #3461FD;
    background-color: #F5F9FE;

}

div.box.today .dot {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: #d4d3d3;
}

div.box.selected .dot {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: #3461FD;
}


.icon-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;

}

.arrow {
    align-self: center;
}
</style>