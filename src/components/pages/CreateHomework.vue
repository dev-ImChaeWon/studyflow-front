<template>
  <main v-if="student">
    <CalendarTab :today="today" :defaultDate="selectedDate" @update-date="updateDate" />
      <div class="student-header">
        <h2 class="student-info">{{ student.studentName }} ({{ student.studentId }})</h2>
        <button v-if="student.subjects.length > 0" @click="openPopup(null)" class="add-button">추가</button>
      </div>

      <!-- Subject and Homework Display -->
      <div v-for="subject in student.subjects" :key="subject.subjectId" class="subject-box">
        <div class="box-header">
          <div class="subject">{{ subject.subjectName }}</div>
        </div>
        <div v-for="hw in subject.homework" :key="hw.homeworkId" class="subjext-list">
          <div class="contents-container">
            <PageBox :limit-page="hw.completedPage" @update-page="(page) => updateHomeworkPage(hw, page)" label="숙제 Page" :page="hw.homeworkPage" />
            <span class="plus">-</span>
            <PageBox :limit-page="hw.homeworkPage" @update-page="(page) => updateCompletedPage(hw, page)" label="완료 Page" :page="hw.completedPage" />
            <span class="plus">=</span>
            <div class="result-box"
              :class="{ 'completed': hw.homeworkPage === hw.completedPage, 'incomplete': hw.homeworkPage !== hw.completedPage }">
              <span class="status">{{ hw.homeworkPage === hw.completedPage ? '완료' : '미완료' }}</span>
              <span class="remaining-pages">{{ hw.homeworkPage - hw.completedPage }} left</span>
            </div>
          </div>
          <CommetBox :hw="hw" v-on:update-comment="(comment) => updateComment(hw, comment)" />
        </div>
        <div v-if="subject.homework == null || subject.homework.length < 1" class="no-homework-box" @click="openPopup(subject.subjectId)">
          <div class="no-homework-message">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <p>숙제를 추가하세요!</p>
          </div>
          <p class="instruction">이 과목에 대한 숙제를 아직 추가하지 않았습니다. 숙제를 추가해주세요.</p>
        </div>
      </div>

      <!-- Empty Data Component -->
      <EmptyData v-if="student.subjects === null || student.subjects.length < 1" message="수강 중인 강좌가 없습니다" 
        submessage="강좌를 먼저 등록하세요"
      />

      <!-- Homework Popup Component -->
      <HomeworkPopup v-if="isPopupVisible" :isVisible="isPopupVisible" :subjects="student.subjects"
        :selected-subject-id="selectedSubjectId" @close="closePopup" @addHomework="addHomework" />

  </main>
  <main v-else>
    존재하지 않는 학생입니다!

  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CalendarTab from '../CalendarTab.vue';
import PageBox from '../PageBox.vue';
import CommetBox from '../CommetBox.vue';
import EmptyData from '../EmptyData.vue';
import HomeworkPopup from '../HomeworkPopup.vue';
import axios from 'axios';

const route = useRoute();

let dateToString = (target) => {
  let year = target.getFullYear();
  let month = target.getMonth() + 1;
  let date = target.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
};

let date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);
const selectedSubjectId = ref(null);

const student = ref({ studentId: '', studentName: '', subjects: [] });

const isPopupVisible = ref(false);

const openPopup = (sid) => {
  isPopupVisible.value = true;
  selectedSubjectId.value = sid
};

const closePopup = () => {
  isPopupVisible.value = false;
};

const addHomework = async ({ subjectId, page }) => {
  const res = await axios.post(`http://localhost:8000/api/homework-create`, {
    subject: { subjectId: subjectId },
    student: { studentId: student.value?.studentId },
    homeworkPage: page
  });

  if (!student.value || !student.value.subjects) {
    console.error('Student or subjects data is not initialized');
    return;
  }

  const subject = student.value.subjects.find(subj => subj.subjectId === subjectId);
  if (!subject) {
    console.error('Subject not found');
    return;
  }

  if (!subject.homework) {
    subject.homework = []; // homework 배열 초기화
  }

  subject.homework.push({
    homeworkId: res.data.homeworkId,
    homeworkPage: res.data.homeworkPage,
    completedPage: res.data.completedPage,
    comment: res.data.comment,
    homeworkDatetime: res.data.homeworkDatetime,
    completeDatetime: res.data.completeDatetime
  });
};

const updateDate = (newDate) => {
  selectedDate.value = newDate;
}


watch([selectedDate], async ([newDate]) => {
  const res = await axios.get(`http://localhost:8000/api/student-homework?id=${route.params.studentId}&date=${newDate}`)
  
  student.value = res.data;
  console.log(student.value)
 
}, { immediate: true });
const updateHomeworkPage = async (hw, page)=>{
  if(page >= hw.completedPage){
    await axios.post("http://localhost:8000/api/homework-update", {
      "homeworkId" : hw.homeworkId,
      "homeworkPage" : page
    });

    hw.homeworkPage = page;
  }
}

const updateCompletedPage = async (hw, page)=>{
  if(page <= hw.homeworkPage){
    await axios.post("http://localhost:8000/api/homework-update", {
      "homeworkId" : hw.homeworkId,
      "completedPage" : page
    });
    hw.completedPage = page;
  }
}
const updateComment = async (hw, comment)=>{
  const res = await axios.post("http://localhost:8000/api/homework-update", {
      "homeworkId" : hw.homeworkId,
      "comment" : comment
    });
  hw.comment = comment;
  hw.completeDatetime = res.data.completeDatetime;
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
  color: #28a745;
  /* 초록색 */
  border: 1px solid #28a745;
  background-color: #d4edda;
  /* 부드러운 초록색 배경 */
}

.result-box.incomplete {
  color: #d9534f;
  /* 붉은색 */
  border: 1px solid #d9534f;
  background-color: #fdecea;
  /* 부드러운 붉은색 배경 */
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



.no-homework-box {
  padding: 20px;
  background-color: #f1f3f5;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
}

.no-homework-message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.no-homework-message .icon {
  fill: #007bff;
  margin-right: 10px;
}

.no-homework-message p {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.instruction {
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}

.add-button {
  background-color: #3461FD;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>
