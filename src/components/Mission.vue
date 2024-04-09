<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Player from './Player.vue'
import Actions from "./Actions.vue"
import OnGoingMission from "./OnGoingMission.vue"


</script>


<template>
    <div class="container">
        <div class="row justify-content-around align-items-stretch p-3">
            <Actions class="col-7"/>
            <OnGoingMission class="col-5"/>
        </div>
        <div class="row justify-content-around p-3">
            <Player class="col-6"/>
            <Player class="col-6"/>
        </div>
    </div>
</template>

<style scoped></style>
