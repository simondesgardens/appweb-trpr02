<script setup lang="ts">
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { computed, onMounted, onBeforeMount, ref } from 'vue'
import Player from '../components/Player.vue'
import Actions from "../components/Actions.vue"
import OnGoingMission from "../components/OnGoingMission.vue"
import DatabaseService from "../scripts/databaseService.ts";
import Enemy from '../components/Enemy.vue'

const databaseService = new DatabaseService();

const router = useRouter()

const enemies = ref<Enemy[]>([])
const choosenEnemy = ref<number>()
const enemy = ref<Enemy>()

onBeforeMount(async () => {
    enemies.value = await databaseService.getCharacters()
    chooseRandomEnemy()
});

function chooseRandomEnemy() {
    choosenEnemy.value = Math.floor(Math.random() * enemies.value.length)
    enemy.value = enemies.value[choosenEnemy.value]
}

const currentMission = ref(1)
const player : string = router.currentRoute.value.fullPath.split('/')[2].split(',')[0]
const ship : string = router.currentRoute.value.fullPath.split('/')[2].split(',')[1].replace('%20',' ')

</script>


<template>
    <div class="container">
        <div class="row justify-content-around align-items-stretch p-3">
            <Actions class="col-7"/>
            <OnGoingMission :current-mission="currentMission" class="col-5"/>
        </div>
        <div class="row justify-content-around p-3">
            <Player :player-name="player" :ship-name="ship" class="col-6"/>
            <Player :player-name="enemy.name" :ship-name="enemy.ship" class="col-6"/>
        </div>
        <div>
        </div>
    </div>
</template>

<style scoped></style>
