<template>
  <h1>주간평가</h1>
  <TestCard/>
</template>

<script setup>
// import { ref } from 'vue';
import TestCard from '../TestCard.vue';
import { useRoute } from 'vue-router';

let route = useRoute();
console.log(route.params.id);

</script>

<style scoped>

</style>