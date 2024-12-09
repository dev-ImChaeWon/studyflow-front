<template>
  <h1>자녀 수강정보</h1>
  <RouterLink  :to="'/student-subject/' + s.id " v-for="(s , idx) in subjects" v-bind:key="idx" class="box">
    <p class="student-name">{{ s.student.studentName }}</p>
    <p class="subject-name">{{s.subject.subjectName}}</p>
  </RouterLink>

</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const subjects = ref([]);


onMounted(async ()=>{
  const res  = await axios.get("http://localhost:8000/api/parent-student-info?parentId=" + localStorage.getItem("userId"));
  subjects.value = res.data;
});
</script>


<style scoped>
.box{
  border: 3px solid black;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
}

.student-name{
  border: 3px solid red;
}

.subject-name{
  border: 3px solid green;
}

</style>