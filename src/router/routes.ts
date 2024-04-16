import type { RouteRecordRaw } from 'vue-router'
import MainMenu from '../components/MainMenu.vue'

const routes: Array<RouteRecordRaw> = [
    {
      // Route par défaut
      // La route / est associé au composant PostsView. C'est ce composant qui est chargé quand l'utilisateur navigue vers la page principale de l'application.
      path: '/',
      name: 'Menu',
      component: MainMenu
    },
    {
      path: '/score',
      name: 'Score',
      component: () => import('../views/Score.vue')
    },
    {
      path: '/mission/:name,:ship',
      name: 'Mission',
      component: () => import('../views/Mission.vue'),
      props: true
    },
    {
      // Route 404
      // Dans l'exemple ci-dessous, le paramètre dynamique pathMatch est égal à la partie de l'url qui suit le caractère /. Par exemple, si l'url est /foo, alors le paramètre pathMatch sera égal à foo. L'expression régulière (.*)* qui suit le paramètre dynamique correspond à n'importe quel caractère. Donc, '/:pathMatch(.*)*' correspond à n'importe quel chemin de l'URL. C'est la façon dont on définit une route 404 dans Vue.js.
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
  
  export default routes