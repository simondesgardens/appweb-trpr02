<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

</script>


<template>
    <div id="actions">
        <div class="container">
            <div class="p-3 bg-dark text-light shadow border border-5 border-primary">
                <h2>Actions</h2>
                <div class="col d-flex justify-content-around">
                    <button id="btnFight" type="button" class="btn btn-primary p-3">Combattre</button>
                    <button id="btnFinish" type="button" class="btn btn-primary p-3">Terminer la mission</button>
                    <button id="btnFinishAndRepair" type="button" class="btn btn-primary p-3">Terminer la mission et réparer le vaisseau</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
