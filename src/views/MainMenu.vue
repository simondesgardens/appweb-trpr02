<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import DatabaseService from "../scripts/databaseService.ts"
import Popup from "../components/Popup.vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const router = useRouter()
const databaseService = new DatabaseService();
const playerValueIsInvalid = ref(false)

interface Ship {
  id: number
  name: string
}
const playerName = ref('')
const playerShip = ref('')
const databaseErrorOccurred = ref(false);


const ships = ref<Ship[]>([]);

onMounted(async () => {
  try {
    ships.value = await databaseService.getShips();
  } catch (error) {
    databaseErrorOccurred.value = true;
  }
});

function playGame(playerName: string, playerShip: string) {
  if (playerName == '' || playerShip == '') {
    playerValueIsInvalid.value = true
  } else {
   router.push({ name: 'Mission', params: { name: playerName, player: playerName, ship: playerShip }});
  }
}

async function closeWinPopup() {
  playerValueIsInvalid.value = false
}

function closeError() {
  databaseErrorOccurred.value = false;
}

</script>


<template>
  <h1>Votre objectif: survivre à 5 missions en obtenant le plus de crédits galactiques.</h1>
  <div class="container">
    <form>
      <fieldset>
        <div class="mb-3">
          <label for="textInput" class="form-label">Votre nom:</label>
          <input type="text" id="textInput" class="form-control" v-model="playerName">
        </div>
        <div class="mb-3">
          <label for="select" class="form-label">Votre vaisseau:</label>
          <select id="select" class="form-select" v-model="playerShip">
            <option v-for="ship in ships" :key="ship.id" :value="ship.name">{{ ship.name }}</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary w-100" @click="playGame(playerName, playerShip)">Débuter la partie</button>
      </fieldset>
    </form>
  </div>

  <Popup v-if="playerValueIsInvalid" :button-message="'Accepter'" @close-popup="closeWinPopup">
    <h2>Manque de renseignement !</h2>
            <p>
                Veuillez entrer votre nom et choisir un vaisseau.
            </p>
  </Popup>
  <div v-if="databaseErrorOccurred" class="alert alert-danger position-fixed bottom-0 end-50" role="alert">
    <button type="button" class="btn-close" name="buttonCloseError" aria-label="Close" @click="closeError"></button>
    Une erreur s'est produite lors de la connexion à la base de données. Veuillez réessayer plus tard.
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
