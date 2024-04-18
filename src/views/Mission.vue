<script setup lang="ts">
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Player from '../components/Player.vue'
import Actions from "../components/Actions.vue"
import OnGoingMission from "../components/OnGoingMission.vue"
import DatabaseService from "../scripts/databaseService.ts";

const databaseService = new DatabaseService();

const router = useRouter()

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
        <div>
        </div>
    </div>
</template>

<style scoped></style>
