<template>
  <main>
    <CalendarTab :today="today" :defaultDate="selectedDate" @update-date="fetchStudentListByDate" />
    <div class="student-header">
      <h2 class="student-info">{{ student.studentName }} ({{ student.studentId }})</h2>
      <button>추가</button>
    </div>
    <div v-for="subject in student.subjects" :key="subject.subjectId" class="subject-box">
      <div class="box-header">
        <div class="subject">{{ subject.subjectName }}</div>
      </div>
      <div v-for="hw in subject.homeworks" :key="hw.homeworkId" class="subjext-list">
        <div class="contents-container">
          <PageBox @update-page="(page) => updateHomeworkPage(hw, page)" label="숙제 Page" :page="hw.homeworkPage" />
          <span class="plus">-</span>
          <PageBox @update-page="(page) => updateCompletedPage(hw, page)" label="완료 Page" :page="hw.completedPage" />
          <span class="plus">=</span>
          <div class="result-box" :class="{'completed': hw.homeworkPage === hw.completedPage, 'incomplete': hw.homeworkPage !== hw.completedPage}">
            <span class="status">{{ hw.homeworkPage === hw.completedPage ? '완료' : '미완료' }}</span>
            <span class="remaining-pages">{{ hw.homeworkPage - hw.completedPage }} left</span>
          </div>
        </div>
        <CommetBox :hw="hw" v-on:update-comment="(comment)=>updateComment(hw, comment)"/>
      </div>
    </div>
    <EmptyData v-if="student.subjects.length < 1"/>
  </main>
</template>

<script setup>
import CalendarTab from '../CalendarTab.vue';
import { ref } from 'vue';
import PageBox from '../PageBox.vue';
import CommetBox from '../CommetBox.vue';
import EmptyData from '../EmptyData.vue';

let dateToString = (target) => {
  let year = target.getFullYear();
  let month = target.getMonth() + 1;
  let date = target.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
};

let date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);

const student = ref({
  studentId: 1,
  studentName: "김철수",
  subjects: [
    {
      subjectId: 1,
      subjectName: "초6수학",
      homeworks: [
        {
          homeworkId: 2,
          homeworkPage: 5,
          completedPage: 5,
          comment: "숙제 잘 했습니다.",
        },
        {
          homeworkId: 3,
          homeworkPage: 9,
          completedPage: 9,
          comment: "숙제 잘 했습니다.",
        },
      ],
    },
    {
      subjectId: 2,
      subjectName: "국어",
      homeworks: [
        {
          homeworkId: 4,
          homeworkPage: 9,
          completedPage: 0,
          comment: "",
        },
      ],
    },
  ],
});

const updateHomeworkPage = (hw, page) => {
  hw.homeworkPage = page;
};

const updateCompletedPage = (hw, page) => {
  hw.completedPage = page;
};

const updateComment = (hw, comment)=>{
  hw.comment = comment
}
</script>

<style scoped>
main {
  padding: 20px 30px;
}

.student-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.student-info {
  padding: 20px 0;
}

.subject-box {
  margin-bottom: 60px;
}

.box-header {
  display: flex;
  justify-content: space-between;
}

.subject {
  border-bottom: 1px solid #3461FD;
  padding: 3px 10px 1px;
  font-weight: bold;
  margin-bottom: 20px;
}

.contents-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.plus {
  font-size: 30px;
  font-weight: 900;
  color: #717da9;
  margin: 0 8px;
}

.result-box {
  font-size: 18px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-box.completed {
  color: #28a745; /* 초록색 */
  border: 1px solid #28a745;
  background-color: #d4edda; /* 부드러운 초록색 배경 */
}

.result-box.incomplete {
  color: #d9534f; /* 붉은색 */
  border: 1px solid #d9534f;
  background-color: #fdecea; /* 부드러운 붉은색 배경 */
}

.comment-box {
  border: 1px solid #e1e8ed;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 15px 20px;
  margin: 10px 0 30px 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #657786;
  margin-bottom: 8px;
}

.username {
  font-weight: bold;
  color: #14171a;
}

.timestamp {
  font-size: 12px;
  color: #aab8c2;
}

.comment-content {
  font-size: 16px;
  color: #14171a;
  line-height: 1.5;
}
</style>
