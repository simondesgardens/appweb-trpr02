<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import DatabaseService from "../scripts/databaseService.ts"
import { onMounted, ref } from 'vue'

const databaseService = new DatabaseService();

const scores = ref([]);

onMounted(async () => {
    scores.value = await databaseService.getRanking();
    putScoresInOrder(scores.value);
});

function putScoresInOrder(scores: any) {
    scores.value = scores.sort((a: any, b: any) => b.score - a.score);
}

</script>

<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item title text-center fw-bold">Pointage</li>
        <li class="list-group-item" v-for="score in scores" :key="score.id">{{ score.name }} - {{ score.score }} CG</li>
    </ul>
</template>

<style scoped>

</style>
