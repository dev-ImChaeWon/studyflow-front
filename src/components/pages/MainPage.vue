<template>
    <TabBar :tab-no="tabNo" :change-tab="changeTab"/>
    <main>
        <StudentManagement v-if="tabNo === 1"/>
        <StudyManagement v-else-if="tabNo===2"/>
        <BillManagement v-else-if="tabNo===3"/>
        <SettingManagement v-else-if="tabNo===4"/>
    </main>
</template>

<script setup>
import TabBar from '../TabBar.vue';

import { ref } from 'vue';
import StudentManagement from '../tabs/StudentManagement.vue';
import StudyManagement from '../tabs/StudyManagement.vue';
import BillManagement from '../tabs/BillManagement.vue';
import SettingManagement from '../tabs/SettingManagement.vue';


    const tabNo = ref(2);

    let changeTab = (targetNo)=>{
        tabNo.value = targetNo
    }

</script>

<style scoped>
    main{
        padding: 20px 30px;
    }
</style>