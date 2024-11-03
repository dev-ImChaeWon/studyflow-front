<template>
  <div class="comment-box">
      <div class="comment-header">
        <span class="username">선생님 코멘트</span>
        <span class="timestamp">{{ hw.completeDatetime }}</span>
      </div>
      <p @click="changeEditStatus" v-if="!isEditing" class="comment-content">
        <span :class="{placeholder : !hw.comment }">
          {{ hw.comment || '코멘트를 추가하세요!' }}
        </span>
      </p>
      <input 
        class="comment-input" 
        ref="inputField"
        v-model="newComment" 
        @blur="changeEditStatus" 
        v-else 
        type="text"
        @keydown.enter="enterClick"
      >
    </div>
</template>

<script setup>
import { ref, defineProps, nextTick , defineEmits} from 'vue';
const props = defineProps(['hw']);
const isEditing = ref(false);
const newComment = ref(props.hw.comment);

const inputField = ref(null); // Ref to input element

const emits = defineEmits(['updateComment'])
const changeEditStatus = ()=>{
  isEditing.value = !isEditing.value;

  if (isEditing.value) {
    nextTick(() => inputField.value.focus()); // Focus on input when edit mode is activated
  }else{
    emits('updateComment', newComment.value);
  }
}


function enterClick() {
  nextTick(() => {
    inputField.value.blur(); // 포커스를 해제
  });

}


</script>

<style scoped>

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



.comment-input {
  width: 100%;
  border: 1px solid #d0d4db;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.comment-input:focus {
  border-color: #3461fd; /* 포커스 시 강조 색상 */
}

.placeholder {
  color: #aaa; /* 플레이스홀더 색상 */
  font-style: italic; /* 기울임꼴 */
  /* 여기에 추가적인 스타일을 더할 수 있습니다. */
}
</style>
