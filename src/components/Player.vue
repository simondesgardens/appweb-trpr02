<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { PropType, computed, ref } from "vue";

const props = defineProps({
  player:{
    type: Object as PropType<Character>,
    required: true
  },
  currentVitality:{
    type: Number,
    required: true
  }
})

const playerRank = ref<String>('')

const lifePercentage = computed(() => {
  return Math.round(props.currentVitality / props.player.ship.vitality * 100)
})

switch (props.player.experience) {
  case 1:
    playerRank.value = "Recrue"
    break;

  case 2:
    playerRank.value = "Novice"
    break;

  case 3:
    playerRank.value = "Intermédiaire"
    break;

  case 4:
    playerRank.value = "Expert"
    break;

  case 5:
    playerRank.value = "Master"
    break;

  default:
    break;
}

</script>


<template>
    <div id="playerInfos">
        <div class="container">
            <div class="p-3 bg-dark text-light shadow border border-5 border-primary">
                <h2>{{ props.player.name }}</h2>
                <div>
                    <p>{{ playerRank }} -  {{ props.player.credit }}CG</p>
                    <p class="d-flex justify-content-center">{{ props.player.ship.name }}</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{width: lifePercentage + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ lifePercentage }}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
