# Revue de code par Ilann Brodl

Revue de code de Simon Desjardins de la semaine 1 pour le TP02 pour le cours d'application web.

## Revue de code

### Code

#### Répétitions du composant **_Player_** dans **Mission.vue**
Répétitions du composant **_Player_**. On pourrais temporairement copier le contenu du composant **_Player_** et l'utiliser dans le composant **_Ennemy_** pour retirer cette duplication.

```js{4}
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
```
#### Utiliser de variables dans Player.vue
Pour afficher le nom du joueur, du vaisseau et le niveau du joueur, il faudrait directement utiliser des variables dans le composant Player.

```js{4}
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
```

### Autres

::: tip Point positif pour le reste du TP
- Les composants sont bien organisés tout comme les éléments HTML organisés à l'interieur des pages.
- Une excellente utlisation de Bootstrap qui fait en sorte que certains composants s'affichent correctement comme les barres de progression.
:::