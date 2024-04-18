<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

</script>


<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <RouterLink class="nav-link margin-left" id="menu" to="/">#Titre du jeu#</RouterLink>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" id="menu" to="/">Accueil</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" id="score" :to="{ name: 'Score' }">Score</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </template>

<style scoped>
</style>
