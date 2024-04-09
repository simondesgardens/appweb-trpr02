<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

</script>


<template>
    <div id="playerInfos">
        <div class="container">
            <div class="p-3 bg-dark text-light shadow border border-5 border-primary">
                <h2>NOM DU JOUEUR</h2>
                <div>
                    <p>Niveau - 0 CG</p>
                    <p class="d-flex justify-content-center">Nom du vaisseau</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">50%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
