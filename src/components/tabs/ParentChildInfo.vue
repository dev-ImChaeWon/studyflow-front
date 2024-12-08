<template>
  <h1>자녀 수강정보</h1>
  
  <RouterLink :to="'/student-subject/' + s.id " v-for="(s , idx) in subjects" v-bind:key="idx" class="box">
    <p class="student-name">{{ s.studentName }}</p>
    <p class="subject-name">{{s.subjectName}}</p>
  </RouterLink>

</template>

<script setup>
import { ref } from 'vue';


const subjects = ref([
  {id:21, subjectName:"영어단어",  studentName:"박아름"}, 
  {id:20, subjectName:"온라인영어",  studentName:"박아름"} , 
  {id:19, subjectName:"JAVA",  studentName:"홍길동"} , 
  {id:18, subjectName:"python",  studentName:"홍길동"}
]
);


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