<template>
  <div v-if="visible" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <h2 class="popup-title">회원가입 성공!</h2>
      <p class="popup-message">축하합니다! 회원가입이 성공적으로 완료되었습니다.</p>
      <button class="popup-button" @click="closePopup">확인</button>
    </div>
  </div>
</template>

<script setup>
import { ref , defineExpose} from 'vue';
import { useRouter } from 'vue-router';

const route = useRouter();
// 팝업의 보이기/숨기기 상태
const visible = ref(false);

// 팝업을 여는 함수
const openPopup = () => {
  console.log('openopen')
  visible.value = true;
};

// 팝업을 닫는 함수
const closePopup = () => {
  visible.value = false;
  route.replace('/login')
};

// 부모에서 이벤트로 팝업을 여는 함수 호출
defineExpose({ openPopup });
</script>

<style scoped>
/* 전체 화면 오버레이 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.popup-overlay[v-cloak] {
  display: none;
}

/* 팝업 콘텐츠 */
.popup-content {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(0.8);
  transition: transform 0.3s ease-out, opacity 0.3s ease-in-out;
  opacity: 1;
}

.popup-overlay .popup-content {
  opacity: 1;
  transform: scale(1);
}

/* 팝업 제목 스타일 */
.popup-title {
  font-size: 24px;
  color: #2a4eca;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 팝업 메시지 스타일 */
.popup-message {
  font-size: 16px;
  color: #61677d;
  margin-bottom: 20px;
}

/* 확인 버튼 */
.popup-button {
  background-color: #3461fd;
  color: #fff;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup-button:hover {
  background-color: #2a4eca;
}
</style>
