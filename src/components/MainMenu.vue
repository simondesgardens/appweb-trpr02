<script setup lang="ts">
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const router = useRouter()
let name = ref('default')
let ship = ref('default')


</script>


<template>
    <h1>Votre objectif: survivre a 5 missions en obtenant le plus de credits galactiques.</h1>
    <form>
      <fieldset>
        <div class="mb-3">
          <label for="textInput" class="form-label">Votre nom:</label>
          <input type="text" id="textInput" class="form-control" v-model="name">
        </div>
        <div class="mb-3">
          <label for="select" class="form-label">Votre vaisseau:</label>
         <select id="select" class="form-select" v-model="ship">
            <option value="default">Test</option>
            <option>Test2</option>
          </select>
        </div>
       <router-link :to="{ name: 'Mission', params: { name: name, ship: ship } }" tag="button" class="btn btn-primary">Debuter la partie</router-link>
     </fieldset>
    </form>
</template>

<style scoped>

</style>
