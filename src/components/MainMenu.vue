<script setup lang="ts">
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { ref, onMounted } from 'vue'
import DatabaseService from "../scripts/databaseService.ts"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const router = useRouter()
const databaseService = new DatabaseService();

let playerName = ref('default')
let playerShip = ref('default')

const ships = ref([]);

onMounted(async () => {
  ships.value = await databaseService.getShips();
  console.log(ships.value);
});

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
        <router-link :to="{ name: 'Mission', params: { name: playerName, ship: playerShip } }" tag="button" class="btn btn-primary w-100">Débuter la partie</router-link>
      </fieldset>
    </form>
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
