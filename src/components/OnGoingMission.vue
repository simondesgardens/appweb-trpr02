<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const props = defineProps({
  currentMission:{
    type: Number,
    required: true
  }
})

</script>


<template>
    <div id="onGoingMission">
        <div class="container">
            <div class="p-3 bg-dark text-light shadow border border-5 border-primary">
                <h2>Mission en cours</h2>
                <div class="row d-flex justify-content-around">
                    <p>{{ props.currentMission }}/5</p>
                    <p>Objectifs: survivre à 5 missions en obtenant le plus de crédits</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
