Revue de code de Simon Desjardins de la semaine 3 pour le TP02 pour le cours d'application web.

## Revue de code

### Code

#### Ajouter des constantes au lieu des variables
Ajouter des constantes au lieu des variables pour faciliter la modification des valeurs et evité des erreurs de duplication.

```js{0}
function finishAndRepair() {
    let price : number = 0

    if (playerLife.value <= 25) {
        price = 40
    } else if (playerLife.value <= 50) {
        price = 30
    } else if (playerLife.value <= 75) {
        price = 20
    } else {
        price = 10
    }

    if (price > player.value.credit) {
        hasEnounghCredit.value = false
    } else {
        player.value.credit -= price
        playerLife.value = player.value.ship.vitality
    }
```
#### Ajouter un "name" pour les différents Popup
Les Popup doivent avoir un nom pour pouvoir plus facilement les modifier et les tester cas par cas.

```js{0}
<Popup v-if="enemyDied" :button-message="'Fermer'" @close-popup="closeEnemyPopup">
    <h2>Mission réussie !</h2>
    <p>
        Vous avez gagné la mission ! Vous avez récupéré {{ enemy.credit }} crédits !
    </p>
</Popup>
<Popup v-if="playerDied" :button-message="'Accéder au tableau des scores'" @close-popup="closePlayerPopup">
    <h2>Mission échouée ...</h2>
    <p>
        Vous avez perdu la mission...
    </p>
</Popup>
```

### Tests unitaires

#### Description des tests unitaires
La description des tests unitaires est un peu trop longues. On pourrai les raccourcir plus simplement tout en gardant une description suffisement claire pour les autres usagers.


#### Un test par composants
On pourrai utiliser un test par composant pour réduire la taille des tests et faciliter le débogage de chaque composant.

```js{0}
it("Par défaut, les composants se charge avec les bonnes valeurs", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        const actionsComp = wrapper.findComponent(Actions)
        const onGoingMissionComp = wrapper.findComponent(OnGoingMission)
        const playerComp = wrapper.findAllComponents(Player)

      
        await router.isReady()

        // Le composant Player du joueur
        expect(playerComp[0].text()).toContain("Simon")
        expect(playerComp[0].text()).toContain("Master - 0CG")
        expect(playerComp[0].text()).toContain("100%")
        expect(playerComp[0].text()).toContain("CR90 corvette")

        // Le composant Player de l'ennemi
        expect(playerComp[1]).toBeDefined()

        // Le composant Actions
        expect(actionsComp.text()).toContain("Combattre")
        expect(actionsComp.text()).toContain("Terminer la mission")
        expect(actionsComp.text()).toContain("Terminer la mission et réparer le vaisseau")

        // Le composant OnGoingMission
        expect(onGoingMissionComp.text()).toContain("1")
        expect(onGoingMissionComp.text()).toContain("Objectifs: survivre à 5 missions en obtenant le plus de crédits")
    })
```

#### Manque de commentaires
Certains tests auront besoin de commentaires pour comprendre plus facilement leurs utilisations et leurs étapes.


### Autres

::: tip Point positif pour le reste du TP
- Pour la totalité des fichier il y a presque aucun code non utilisé.
- Le code à une très bonne couverture pour les erreurs.
- Les variables et fonctions sont bien nommées et correspondantes à la description de l'usage.
- Le code est bien ordonné et facilement lisible. 
:::