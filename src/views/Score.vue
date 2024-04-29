<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import DatabaseService from "../scripts/databaseService.ts"
import { onMounted, ref } from 'vue'

const databaseService = new DatabaseService();

interface Score {
    id: number
    name: string
    score: number
}

const scores = ref<Score[]>([]);

onMounted(async () => {
    try {
        scores.value = await databaseService.getRanking();
        putScoresInOrder(scores.value);
    } catch (error) {
        databaseErrorOccurred.value = true;
    }
});

const databaseErrorOccurred = ref(false);

function putScoresInOrder(scores: any) {
    scores.value = scores.sort((a: any, b: any) => b.score - a.score);
}

async function refreshScores() {
    scores.value = await databaseService.getRanking();
    putScoresInOrder(scores.value);
}

function closeError() {
  databaseErrorOccurred.value = false;
}

</script>

<template>
    <ul @load="refreshScores" class="list-group list-group-flush">
        <li class="list-group-item title text-center fw-bold">Pointage</li>
        <li class="list-group-item" v-for="score in scores" :key="score.id">{{ score.name }} - {{ score.score }} CG</li>
    </ul>
    <img v-if="databaseErrorOccurred" src="../assets/loading-waiting.gif" alt="Erreur de base de données" class="database-error-gif">
    <div v-if="databaseErrorOccurred" class="alert alert-danger position-fixed bottom-0 end-50" role="alert">
    <button type="button" class="btn-close" name="buttonCloseError" aria-label="Close" @click="closeError"></button>
    Une erreur s'est produite lors de la connexion à la base de données. Veuillez réessayer plus tard.
    </div>
</template>

<style scoped>
.database-error-gif {
    width: 50px; 
    height: 50px; 
    display: block;
    margin: 0 auto;
}
</style>
