# Revue de code par Simon Desjardins

Revue de code pour le TP02 de Ilann Brodl pour le cours d'application web.

## Semaine 1

### NavigationBar.vue

Ne pas oublier de mettre le titre du jeu dans la balise:

```html
<RouterLink class="nav-link margin-left" id="menu" to="/">#Titre du jeu#</RouterLink>
```

### App.vue

Faire le ménage des commentaires qui ont rapport avec le RouterView et qui ne sont pas pertinents

### routes.ts

Mettre à jour les commentaires pour qu'ils soient pertinents:
```js
    {
      // Route par défaut
      // La route / est associé au composant PostsView. C'est ce composant qui est chargé quand l'utilisateur navigue vers la page principale de l'application.
      path: '/',
      name: 'Menu',
      component: MainMenu
    },
```
```js
    {
      // Route 404
      // Dans l'exemple ci-dessous, le paramètre dynamique pathMatch est égal à la partie de l'url qui suit le caractère /. Par exemple, si l'url est /foo, alors le paramètre pathMatch sera égal à foo. L'expression régulière (.*)* qui suit le paramètre dynamique correspond à n'importe quel caractère. Donc, '/:pathMatch(.*)*' correspond à n'importe quel chemin de l'URL. C'est la façon dont on définit une route 404 dans Vue.js.
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
```

## Semaine 2

Faire des constantes au lieu des variables et changer les chaînes de caractères par défaut par des chaînes significatives.
```js
let playerName = ref('default')
let playerShip = ref('default')
```

Ne pas oublier de mettre le type de variable qui va dans le tableau.
Dans le MaineMenu.vue:
```js
const ships = ref([]);
```

Dans le Score.vue:
```js
const scores = ref([]);
```
## Semaine 3

### Test unitaires de NavigationBar.vue

Factorisation du code répétitif dans les tests.
```ts
const mountNavigationBar = async () => {
  router.push('/')
  await router.isReady()
  return mount(NavigationBar, {
    global: {
      plugins: [router]
    }
  })
}
```
au lieu de le mettre à chaque test.

### MainMenu.vue

Gestion des valeurs par défaut : "Entrez votre nom" pour le champ du nom et "Sélectionnez un vaisseau" pour le champ du vaisseau.
```ts
const playerName = ref('')
const playerShip = ref('')
```

### Score.vue

Typage de données: utilisez un type pour la fonction putScoresInOrder. (Par exemple "Scoree[]" au lieu de "any")

```ts
function putScoresInOrder(scores: any) {
    scores.value = scores.sort((a: any, b: any) => b.score - a.score);
}
```

### Commentaire

Le code est généralement bien structuré !