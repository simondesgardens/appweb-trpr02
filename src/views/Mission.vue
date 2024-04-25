<script setup lang="ts">
import { useRouter } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { onBeforeMount, ref } from 'vue'
import Player from '../components/Player.vue'
import Actions from "../components/Actions.vue"
import OnGoingMission from "../components/OnGoingMission.vue"
import DatabaseService from "../scripts/databaseService.ts";
import Popup from "../components/Popup.vue";

const databaseService = new DatabaseService();
const router = useRouter()

const enemy = ref<Character>({
    id: 0,
    credit: 0,
    experience: 1,
    name: "",
    ship: {
        id: 0,
        name: "",
        vitality: 0
    }
})
const player = ref<Character>({
    id: 0,
    credit: 0,
    experience: 5,
    name: router.currentRoute.value.fullPath.split('/')[2].split(',')[0],
    ship: {
        id: 0,
        name: router.currentRoute.value.fullPath.split('/')[2].split(',')[1].replace(/%20/g,' '),
        vitality: 100
    }
})

const enemies = ref<Character[]>([])

const choosenEnemy = ref<number>()
const enemyLife = ref<number>(0)
const enemyDied = ref<boolean>(false)

const playerLife = ref<number>(player.value.ship.vitality)
const playerDied = ref<boolean>(false)
const playerWon = ref<boolean>(false)

const currentMission = ref(1)
const hasEnounghCredit = ref<boolean>(true)

onBeforeMount(async () => {
    enemies.value = await databaseService.getCharacters()
    chooseRandomEnemy()
});

function chooseRandomEnemy() {
    choosenEnemy.value = Math.floor(Math.random() * enemies.value.length)
    enemy.value = enemies.value[choosenEnemy.value]
    enemyLife.value = enemy.value.ship.vitality
}

function getDamageDone(damageDealer : Character) : number {
    let damageMultiplicator : number = 0

    switch (damageDealer.experience) {
        case 1:
            damageMultiplicator = 1.0
            break;
        
        case 2:
            damageMultiplicator = 1.2
            break;
        
        case 3:
            damageMultiplicator = 1.4
            break;

        case 4:
            damageMultiplicator = 1.6
            break;

        case 5:
            damageMultiplicator = 1.8
            break;
    }

    return Math.floor(Math.random() * (5 * damageMultiplicator) + 5)
}

function fight() {
    let damageFromPlayer : number = getDamageDone(player.value)
    let damageFromEnemy : number = getDamageDone(enemy.value)

    playerLife.value -= damageFromEnemy
    enemyLife.value -= damageFromPlayer

    verifyFightState()
}

function finish() {
    currentMission.value++
    chooseRandomEnemy()

    verifyFightState()
}

function finishAndRepair() {
    let price : number = 0

    if (playerLife.value <= 25) {
        price = 40
    } else if (playerLife.value <= 50) {
        price = 30
    } else if (playerLife.value <= 75) {
        price = 20
    } else {
        price = 10
    }

    if (price > player.value.credit) {
        hasEnounghCredit.value = false
    } else {
        player.value.credit -= price
        playerLife.value = player.value.ship.vitality
    }

    chooseRandomEnemy()

    currentMission.value++

    verifyFightState()
}

function verifyFightState() {
    if (enemyLife.value <= 0) {
        enemyLife.value = 0
        enemyDied.value = true
        currentMission.value++
        player.value.credit += enemy.value.credit

        if (player.value.experience <= enemy.value.experience && player.value.experience < 5) {
            player.value.experience++
        }

        chooseRandomEnemy()
    }

    if (playerLife.value <= 0) {
        playerLife.value = 0
        playerDied.value = true
    }

    verifyMissionState()
}

function verifyMissionState() {
    if (currentMission.value == 5) {
        playerWon.value = true
    }
}

function closeEnemyPopup() {
    enemyDied.value = false
}

function closePlayerPopup() {
    playerDied.value = false
    player.value.credit -= 100
    router.push('/score')
}

function closeWinPopup() {
    playerWon.value = false
    databaseService.postScore(player.value.name, player.value.credit)
    router.push('/score')
}

function closeCreditPopup() {
    hasEnounghCredit.value = false
}

</script>


<template>
    <div class="container">
        <div class="row justify-content-around align-items-stretch p-3">
            <Actions @fight="fight" @finish="finish" @finish-and-repair="finishAndRepair" class="col-7"/>
            <OnGoingMission :current-mission="currentMission" class="col-5"/>
        </div>
        <div class="row justify-content-around p-3">
            <Player :player="player" :current-vitality="playerLife" class="col-6"/>
            <Player :player="enemy" :current-vitality="enemyLife" class="col-6"/>
        </div>
        <Popup v-if="enemyDied" :button-message="'Fermer'" @close-popup="closeEnemyPopup">
            <h2>Mission réussie !</h2>
            <p>
                Vous avez gagné la mission ! Vous avez récupéré {{ enemy.credit }} crédits !
            </p>
        </Popup>
        <Popup v-if="playerDied" :button-message="'Accéder au tableau des scores'" @close-popup="closePlayerPopup">
            <h2>Mission échouée ...</h2>
            <p>
                Vous avez perdu la mission...
            </p>
        </Popup>
        <Popup v-if="playerWon && !enemyDied" :button-message="'Accéder au tableau des scores'" @close-popup="closeWinPopup">
            <h2>Mission réussie !</h2>
            <p>
                Vous avez complété 5 missions !
            </p>
        </Popup>
        <Popup v-if="!hasEnounghCredit" :button-message="'Fermer'" @close-popup="closeCreditPopup">
            <h2>Fonds insufisants</h2>
            <p>
                Vous n'avez pas assez de crédit pour réparer votre vaisseau...
            </p>
        </Popup>
    </div>
</template>

<style scoped></style>
