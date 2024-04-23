<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const props = defineProps({
  playerName:{
    type: String,
    required: true
  },
  shipName:{
    type: String,
    required: true
  }
})

</script>


<template>
    <div id="playerInfos">
        <div class="container">
            <div class="p-3 bg-dark text-light shadow border border-5 border-primary">
                <h2>{{ props.playerName }}</h2>
                <div>
                    <p>Niveau - 0 CG</p>
                    <p class="d-flex justify-content-center">{{ props.shipName }}</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">50%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
