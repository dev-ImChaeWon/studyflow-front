<template>
  <div class="pagination">
      <button 
          :disabled="currentPage === 1" 
          @click="onPageChage(currentPage-1)">
          이전
      </button>
      
      <button 
          v-for="page in pages" 
          :key="page" 
          :class="{ active: currentPage === page }" 
          @click="onPageChage(page)">
          {{ page }}
      </button>
      
      <button 
          :disabled="currentPage === totalPages" 
          @click="onPageChage(currentPage+1)">
          다음
      </button>
  </div>
</template>

<script setup>
import { ref, computed ,defineProps,defineEmits} from 'vue';

const props = defineProps([
  'totalItems',
  'itemsPerPage',
  'currentPage'
]);

const emit = defineEmits(['updatePage']);

const currentPage = ref(props.currentPage);

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

// 페이지 번호 계산
const pages = computed(() => {
  const groupSize = 5; // 페이지 그룹 크기
    const groupStart = Math.floor((currentPage.value - 1) / groupSize) * groupSize + 1;
    
    return Array.from({ length: Math.min(groupSize, totalPages.value - groupStart + 1) }, (_, i) => groupStart + i);
  
  });

const onPageChage = (target)=>{
  currentPage.value = target;
  emit('updatePage', target);
}


</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  background-color: #f1f4ff;
  color: black;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  border:2px solid #5A8BFF; /* 현재 페이지 강조 */
  color: #0a2c7a;
  font-weight: bolder;
}

.pagination button:disabled {
  background-color: #f1f1f1;
  cursor: not-allowed;
  color: #7e7e7e;
}
</style>
