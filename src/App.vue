<script setup lang="ts">
//import { RouterLink, RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import NavigationBar from "./components/NavigationBar.vue";
import { ref } from 'vue'

</script>


<template>
    <div class="margin">
    <header>
        <div>
            <NavigationBar />
        </div>
    </header>
    <main>
    <!-- RouterView (ou router-link) est la balise fournie par Vue Router qui permet d'afficher dynamiquement la "view" correspondante à la route actuelle de l'application. Cette directive ne devrait être présente qu'une seule fois. Lorsque l'utilisateur clique sur un des liens de navigation, Vue Router charge la "view" correspondante et l'affiche automatiquement à l'emplacement de la balise RouterView. -->
    <RouterView /> 
  </main>
  </div>
</template>

<style scoped>
.margin{
    margin-left: 250px;
    margin-right: 250px;
}
</style>
