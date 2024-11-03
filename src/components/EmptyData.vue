<template>
  <div class="empty-state">
    <div class="empty-icon">
        <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#888"/>
            <path d="M11 15h2v2h-2zm0-10h2v8h-2z" fill="#888"/>
        </svg>
    </div>
    <p class="empty-message">현재 조회된 데이터가 없습니다.</p>
    <p class="empty-submessage">조건을 변경하여 다시 시도해 보세요.</p>
</div>

</template>

<script setup>
</script>

<style scoped>
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: #888;
    padding: 100px 0;
}

.empty-icon {
    margin-bottom: 15px;
}

.empty-message {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
}

.empty-submessage {
    font-size: 1rem;
    margin: 0;
}

</style>