<template>
    <TabBar :user-role="userRole" :tab-no="tabNo" :change-tab="changeTab"/>
    <main>
        <StudentManagement v-if="tabNo === 1"/>
        <StudyManagement v-else-if="tabNo===2"/>
        <BillManagement v-else-if="tabNo===3"/>
        <SettingManagement v-else-if="tabNo===4"/>
        <ParentTest v-else-if="tabNo===5"/>
        <ParentChildInfo v-else-if="tabNo===6"/>
        <ParentChildAttendance v-else-if="tabNo===7"/>
    </main>
</template>

<script setup>
import TabBar from '../TabBar.vue';

import {  onMounted, ref } from 'vue';
import StudentManagement from '../tabs/StudentManagement.vue';
import StudyManagement from '../tabs/StudyManagement.vue';
import BillManagement from '../tabs/BillManagement.vue';
import SettingManagement from '../tabs/SettingManagement.vue';
import ParentTest from '../tabs/ParentTest.vue';
import ParentChildInfo from '../tabs/ParentChildInfo.vue';
import ParentChildAttendance from '../tabs/ParentChildAttendance.vue';


    const userRole = ref('');
    const tabNo = ref(2);

    let changeTab = (targetNo)=>{
        tabNo.value = targetNo
    }

onMounted(()=>{
    userRole.value = localStorage.getItem("userRole");
    if(userRole.value === 'P'){
        tabNo.value = 5;
    }
});

</script>

<style scoped>
    main{
        padding: 20px 30px;
    }
</style>