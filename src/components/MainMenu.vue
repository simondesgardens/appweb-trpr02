<script setup lang="ts">
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const router = useRouter()

function startGame() {
  router.push({ name: 'Mission', params: { name: 'YourName', ship: 'YourShip' } })
}
</script>


<template>
    <h1>Votre objectif: survivre a 5 missions en obtenant le plus de credits galactiques.</h1>
    <form>
  <fieldset>
    <div class="mb-3">
      <label for="textInput" class="form-label">Votre nom:</label>
      <input type="text" id="disabledTextInput" class="form-control">
    </div>
    <div class="mb-3">
      <label for="select" class="form-label">Votre vaisseau:</label>
      <select id="select" class="form-select">
        <option>Test</option>
        <option>Test</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary" @click="startGame()">Debuter la partie</button>
  </fieldset>
</form>
</template>

<style scoped>

</style>
