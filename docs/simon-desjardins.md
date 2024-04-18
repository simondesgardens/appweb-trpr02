# Revue de code par Simon Desjardins

Revue de code pour le TP02 de Ilann Brodl pour le cours d'application web.

## Commentaires générals

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