<template>
  <main>
    <CalendarTab :today="today" :defaultDate="selectedDate" @update-date="fetchStudentListByDate" />
    <div class="student-header">
      <h2 class="student-info">김철수(13)</h2>
      <button>추가</button>
    </div>
    <div class="subject-box">
      <div class="box-header">
        <div class="subject">국어</div>
      </div>
      <div class="subjext-list">

        <div class="contents-container">
          <div class="page-box">
            <span class="label">못한 숙제</span>
            <span class="page">5</span>
          </div>
          <span class="plus">+</span>
          <div class="page-box">
            <span class="label">오늘 숙제</span>
            <span class="page">5</span>
          </div>
          <span class="plus">-</span>
          <div class="page-box">
            <span class="label">완료</span>
            <span class="page">5</span>
          </div>
          <span class="plus">=</span>
          <div class="result-box">
            <span class="status">미완료</span>
            <span class="remaining-pages">2page</span>
          </div>
        </div>
        <div class="comment-box">
          <div class="comment-header">
            <span class="username">선생님 코멘트</span>
            <span class="timestamp">2024-01-01 17:05:36</span>
          </div>
          <p class="comment-content">아파서 못했어요</p>
        </div>
      </div>
      <div class="subjext-list">

        <div class="contents-container">
          <div class="page-box">
            <span class="label">못한 숙제</span>
            <span class="page">5</span>
          </div>
          <span class="plus">+</span>
          <div class="page-box">
            <span class="label">오늘 숙제</span>
            <span class="page">5</span>
          </div>
          <span class="plus">-</span>
          <div class="page-box">
            <span class="label">완료</span>
            <span class="page">5</span>
          </div>
          <span class="plus">=</span>
          <div class="result-box">
            <span class="status">미완료</span>
            <span class="remaining-pages">2page</span>
          </div>
        </div>
        <div class="comment-box">
          <div class="comment-header">
            <span class="username">선생님 코멘트</span>
            <span class="timestamp">2024-01-01 17:05:36</span>
          </div>
          <p class="comment-content">아파서 못했어요</p>
        </div>
      </div>
    </div>
    <div class="subject-box">
      <div class="box-header">
        <div class="subject">국어</div>
      </div>
      <div class="subjext-list">

        <div class="contents-container">
          <div class="page-box">
            <span class="label">못한 숙제</span>
            <span class="page">5</span>
          </div>
          <span class="plus">+</span>
          <div class="page-box">
            <span class="label">오늘 숙제</span>
            <span class="page">5</span>
          </div>
          <span class="plus">-</span>
          <div class="page-box">
            <span class="label">완료</span>
            <span class="page">5</span>
          </div>
          <span class="plus">=</span>
          <div class="result-box">
            <span class="status">미완료</span>
            <span class="remaining-pages">2page</span>
          </div>
        </div>
        <div class="comment-box">
          <div class="comment-header">
            <span class="username">선생님 코멘트</span>
            <span class="timestamp">2024-01-01 17:05:36</span>
          </div>
          <p class="comment-content">아파서 못했어요</p>
        </div>
      </div>
      <div class="subjext-list">

        <div class="contents-container">
          <PageBox label="못한 숙제" page="5"/>
          <span class="plus">+</span>
          <div class="page-box">
            <span class="label">오늘 숙제</span>
            <span class="page">5</span>
          </div>
          <span class="plus">-</span>
          <div class="page-box">
            <span class="label">완료</span>
            <span class="page">5</span>
          </div>
          <span class="plus">=</span>
          <div class="result-box">
            <span class="status">미완료</span>
            <span class="remaining-pages">2page</span>
          </div>
        </div>
        <div class="comment-box">
          <div class="comment-header">
            <span class="username">선생님 코멘트</span>
            <span class="timestamp">2024-01-01 17:05:36</span>
          </div>
          <p class="comment-content">아파서 못했어요</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import CalendarTab from '../CalendarTab.vue';
import { ref } from 'vue';
import PageBox from '../PageBox.vue';

let dateToString = (target) => {
  let year = target.getFullYear();
  let month = target.getMonth() + 1;
  let date = target.getDate();
  return '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
};

let date = new Date();
let today = dateToString(date);
let selectedDate = ref(today);

</script>

<style scoped>
main {
  padding: 20px 30px;
}

.student-header{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.student-info {
  padding: 20px 0;
}

.subject-box {
  /* border: 1px solid black; */
  margin-bottom: 60px;
}

.box-header {
  display: flex;
  flex-direction: row;
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

/* Styling for plus and equals signs */
.plus {
  font-size: 30px;
  font-weight: 900;
  color: #717da9;
  margin: 0 8px;
}

/* Adding some padding and color to the result-box */
.result-box {
  font-size: 18px;
  font-weight: bold;
  color: #d9534f;
  /* Red for emphasis */
  padding: 5px 10px;
  border: 1px solid #d9534f;
  border-radius: 8px;
  background-color: #fdecea;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.comment-box {
  border: 1px solid #e1e8ed;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 15px 20px;
  margin: 10px 0 30px 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
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
