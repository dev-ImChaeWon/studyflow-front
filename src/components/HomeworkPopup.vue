<!-- HomeworkPopup.vue -->
<template>
  <div class="popup-overlay" v-if="isVisible">
    <div class="popup-content">
      <h3>숙제 추가하기</h3>
      <label for="subject">과목</label>
      <select v-model="selectedSubjectId">
        <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
          {{ subject.subjectName }}
        </option>
      </select>
      
      <label for="page">숙제 Page</label>
      <input type="number" v-model="homeworkPage" min="1" placeholder="Enter homework page" />

      <div class="button-group">
        <button @click="submitHomework">추가</button>
        <button @click="closePopup">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
defineProps({
  isVisible: Boolean,
  subjects: Array,
});
const emits = defineEmits(['close', 'addHomework']);

const selectedSubjectId = ref(null);
const homeworkPage = ref(null);

const submitHomework = () => {
  if (selectedSubjectId.value && homeworkPage.value) {
    emits('addHomework', { subjectId: selectedSubjectId.value, page: homeworkPage.value });
    closePopup();
  }
};

const closePopup = () => {
  emits('close');
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px 30px;
  width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.popup-content h3 {
  margin-bottom: 20px;
  color: #3461FD;
}

.popup-content label {
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  text-align: left;
}

.popup-content select,
.popup-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background-color: #3461FD;
  color: #fff;
}

button:last-child {
  background-color: #cccccc;
}
</style>
