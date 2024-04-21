Revue de code de Simon Desjardins de la semaine 2 pour le TP02 pour le cours d'application web.

## Revue de code

### Code

#### Différencier les composants **_Player_** et **_Ennemy_**
Pour afficher le nom de l'ennemi et du vaisseau, il faudrait directement utiliser des variables dans le composant Ennemy.

```js{4}
<template>
    <div class="container">
        <div class="row justify-content-around align-items-stretch p-3">
            <Actions class="col-7"/>
            <OnGoingMission :current-mission="currentMission" class="col-5"/>
        </div>
        <div class="row justify-content-around p-3">
            <Player :player-name="player" :ship-name="ship" class="col-6"/>
            <Player :player-name="enemy.name" :ship-name="enemy.ship" class="col-6"/>
        </div>
        <div>
        </div>
    </div>
</template>
```
#### Manque de commentaires pour certaines fonctions
Certaines fonctions auraint besoin de commentaires pour comprendre plus facilement leurs utilisations.

```js{4}
onBeforeMount(async () => {
    enemies.value = await databaseService.getCharacters()
    chooseRandomEnemy()
});
```

### Autres

::: tip Point positif pour le reste du TP
- La récupération des informations du joueur fonctionne correctement sans modifier les valeurs envoyées par la page principale.
:::