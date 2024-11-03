<template>
  <router-link class="card link-reset" :to="`/student/${student.studentId}/homework`">
    <div class="card-header">
      <h2 class="student-name">
        {{ student.studentName }}({{ student.studentId }})
      </h2>
      <div v-if="percentage === 100" class="status complete">
        <span class="percentage">{{ percentage }}%</span>
        <span class="status-icon"><svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M511.9 183.1c-181.8 0-329.1 147.4-329.1 329.1 0 181.8 147.4 329.1 329.1 329.1C693.6 841.3 841 694 841 512.2S693.6 183.1 511.9 183.1z m0 585.1c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"
              fill="green" />
            <path d="M487.4 556.8l-97.8-87.6-48.8 54.4 153.1 137.2 192.2-221.2-55.2-48z" fill="green" />
          </svg></span>
      </div>
      <div v-else class="status not-complete">
        <span class="percentage">{{ percentage }}%</span>
        <span class="status-icon">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="20px" height="20px" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

        </span>
      </div>
    </div>
    <div class="card-body">
      <div v-for="subject in student.subjects" v-bind:key="subject.subjectId" class="homework-container">
        <h4>{{ subject.subjectName }}</h4>
        <div class="grid-container">
          <p class="grid-header">전체</p>
          <p class="grid-header">완료</p>
          <p class="grid-header">Comment</p>
          <div v-for="h in subject.homeworks" v-bind:key="h.homeworkId" style="display: contents;">
            <p>{{ h.homeworkPage }}</p>
            <p>{{ h.completedPage }}</p>
            <p>
              <span style="flex-grow: 1;">
                아파서 미완료했음
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps(['student']);

const percentage = computed(() => {
  let totalHomeworkPages = 0;
  let totalCompletedPages = 0;

  for (const subject of props.student.subjects) {
    for (const homework of subject.homeworks) {
      totalHomeworkPages += homework.homeworkPage;
      totalCompletedPages += homework.completedPage;
    }
  }

  return totalHomeworkPages > 0 ? Math.round((totalCompletedPages / totalHomeworkPages) * 100) : 0;
});


</script>

<style scoped>

.link-reset {
  text-decoration: none; /* 링크의 기본 밑줄 제거 */
  color: inherit; /* 부모 요소의 색상 상속 */
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;

  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.status {
  display: flex;
  column-gap: 5px;
  align-items: center;
}

.status.complete {
  color: green;
}

.status.not-complete {
  color: rgb(195, 7, 7);
}


.status-icon {
  display: flex;
  justify-content: center;
  align-items: center;

}

.grid-container {
  margin-left: 20px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  justify-items: stretch;
  row-gap: 5px;
}

.grid-container p {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-header {
  color: rgb(133, 133, 133);
  border-bottom: 1px solid rgb(161, 161, 161);

}

.card-body {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  font-size: 14px;
}
</style>