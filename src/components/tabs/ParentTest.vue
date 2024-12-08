<template>
  <h1>주간평가</h1>
  <CalendarTab :today="today" :default-date="selectedDate" @update-date="onDateChanged"/>
  <TestCard/>
</template>

<script setup>
import { ref } from 'vue';
import CalendarTab from '../CalendarTab.vue';
import TestCard from '../TestCard.vue';

let dateToString = (target) => {
    let year = target.getFullYear();
    let month = target.getMonth() + 1;
    let date = target.getDate();

    return '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
}
let date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);

const onDateChanged = (newDate) => {
    selectedDate.value = newDate;
};
</script>

<style scoped>

</style>