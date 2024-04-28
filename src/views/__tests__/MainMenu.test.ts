/*import { describe, it, expect, vi } from 'vitest';
import { ref, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import MainMenu from '../MainMenu.vue'

describe('MainMenu.vue', async () => {

    it('Doit avoir une méthode playGame', () => {
        const wrapper = mount(MainMenu); // Montage du composant
        expect(typeof wrapper.vm.playGame).toBe('function'); // Vérifiez que playGame est une fonction
      });

    it('Doit mettre playerValueIsInvalid a true si playerName ou playerShip sont vides', async () => {
        const wrapper = mount(MainMenu);
        wrapper.vm.playGame();
        expect(wrapper.vm.playerValueIsInvalid).toBe(true);
    });

    it('Doit mettre playerValueIsInvalid a true si uniquement playerName est vide', async () => {
      const wrapper = mount(MainMenu);
      wrapper.vm.playerShip.value = 'Vaisseau1';
      wrapper.vm.playGame();
      expect(wrapper.vm.playerValueIsInvalid).toBe(true);
  });

    
  });
  

  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import { ref } from 'vue';
  import { mount } from '@vue/test-utils';
  import MainMenu from '../MainMenu.vue';
  import { useRouter } from 'vue-router';
  
  // Mocking the router for navigation tests
  vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  }));
  
  describe('MainMenu.vue', () => {
    let wrapper;
    let router;
  
    beforeEach(() => {
      wrapper = mount(MainMenu, {
        data() {
          return {
            playerValueIsInvalid: ref(false),
            playerName: ref(''), // Assurez-vous que c'est un ref
            playerShip: ref(''), // Assurez-vous que c'est un ref
          };
        },
      });
      router = useRouter(); // Router mock
    });
  
    it('Doit avoir une méthode playGame', () => {
      expect(typeof wrapper.vm.playGame).toBe('function'); // Vérifiez que playGame est une fonction
    });
  
    it('Doit mettre playerValueIsInvalid à true si playerName ou playerShip sont vides', async () => {
      //wrapper.vm.playerName = ref(''); // Vide
      //wrapper.vm.playerShip = ref(''); // Vide
  
      wrapper.vm.playGame(); // Appel de la fonction
  
      expect(wrapper.vm.playerValueIsInvalid.value).toBe(true);
    });
  
    it('Devrait mettre playerValueIsInvalid à true si uniquement playerName est vide', async () => {
      // Assurez-vous que playerShip est un ref
      wrapper.vm.playerShip = ref('Vaisseau1'); // Assigner directement à l'objet ref
      wrapper.vm.playerName = ref(''); // Vide

      wrapper.vm.playGame(); // Appel de la fonction

      expect(wrapper.vm.playerValueIsInvalid.value).toBe(true); // Attendu si playerName est vide
    });
  
    it('Devrait naviguer vers le nom de route "Mission" si playerName et playerShip sont remplis', async () => {
      wrapper.vm.playerName.value = 'John';
      wrapper.vm.playerShip.value = 'Vaisseau1';
  
      wrapper.vm.playGame(); // Appel de la fonction
  
      expect(router().push).toHaveBeenCalledWith({
        name: 'Mission',
        params: {
          name: 'John',
          ship: 'Vaisseau1',
        },
      });
    });
  
    it('Devrait afficher le Popup si playerValueIsInvalid est true', async () => {
      wrapper.vm.playerValueIsInvalid.value = true; // Simuler un état où la popup devrait s'afficher
  
      await wrapper.vm.$nextTick(); // Attendre le rendu du composant
  
      expect(wrapper.findComponent({ name: 'Popup' }).exists()).toBe(true); // Vérifiez que le Popup est affiché
    });
  
    it('Devrait fermer le Popup lorsque closeWinPopup est appelé', async () => {
      wrapper.vm.playerValueIsInvalid.value = true; // Popup est affiché
  
      await wrapper.vm.closeWinPopup(); // Appel de la fonction
  
      expect(wrapper.vm.playerValueIsInvalid.value).toBe(false); // Popup devrait être fermé
    });
  
    it('Devrait rendre le contenu correctement', async () => {
      expect(wrapper.find('h1').text()).toContain('Votre objectif: survivre à 5 missions'); // Vérifiez le contenu du composant
    });
  
    it('Devrait avoir un champ de saisie pour le nom du joueur', async () => {
      expect(wrapper.find('input#textInput').exists()).toBe(true); // Vérifiez que le champ de saisie existe
    });
  
    it('Devrait avoir un bouton pour débuter la partie', async () => {
      expect(wrapper.find('button').exists()).toBe(true); // Vérifiez que le bouton existe
    });
  });
  */

import { describe, expect, vi, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../MainMenu.vue'
import DatabaseService from "../../scripts/databaseService.ts"
import Popup from "../../components/Popup.vue";
import routes from '../../router/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes : routes
})

describe('MainMenu.vue', async () => {

  let wrapper;

  beforeEach(async () => {
    router.push('/');
    await router.isReady();

    wrapper = mount(MainMenu, {   //Wrapper généré a l'aide de ChatGPT
      global: {
        plugins: [router],
      },
      data() {
        return {
          playerName: 'Luke Skywalker',
          playerShip: 'X-Wing',
        };
      },
    });
  });

  it('Doit avoir une méthode playGame', () => {
      const wrapper = mount(MainMenu);
      expect(typeof wrapper.vm.playGame).toBe('function');
    });

  it('Doit mettre playerValueIsInvalid a true si playerName ou playerShip sont vides', async () => {
      const wrapper = mount(MainMenu);
      wrapper.vm.playGame('', '');
      expect(wrapper.vm.playerValueIsInvalid).toBe(true);
  });

  it('Doit mettre playerValueIsInvalid a true si uniquement playerName est vide', async () => {
    const wrapper = mount(MainMenu);
    const playerName = '';
    const playerShip = 'Vaisseau1';

    wrapper.vm.playGame(playerName, playerShip);
    expect(wrapper.vm.playerValueIsInvalid).toBe(true);
  });

  it('Doit naviguer vers le nom de route "Mission" si playerName et playerShip sont remplis', async () => {
    const playerName = 'Joueur1';
    const playerShip = 'Vaisseau1';

    wrapper.vm.playGame(playerName, playerShip);
    await router.isReady();
    expect(wrapper.vm.playerValueIsInvalid).toBe(false);
    console.log('Current Route:', router.currentRoute.value); // Débogage pour voir la route actuelle
    expect(router.currentRoute.value.name).toBe('Mission'); // Doit naviguer vers "Mission"
    //Je n'ai pas la raison pour laquelle le test ne passe pas ici 
  });

  it('Doit rester sur la page MainMenu si playerName ou playerShip est vide', async () => {
    const playerName = '';
    const playerShip = '';

    wrapper.vm.playGame(playerName, playerShip);
    await router.isReady();

    expect(router.currentRoute.value.name).toBe('Menu');
  });  

  it('Devrait afficher le Popup si playerValueIsInvalid est true', async () => {
    wrapper.vm.playerValueIsInvalid = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Popup).exists()).toBe(true);
  });

  it('Devrait fermer le Popup lorsque closeWinPopup est appelé', async () => {
    wrapper.vm.playerValueIsInvalid = true;

    await wrapper.vm.closeWinPopup();

    expect(wrapper.vm.playerValueIsInvalid).toBe(false);
  });

  it('Devrait avoir un champ de saisie pour le nom du joueur', async () => {
    expect(wrapper.find('input#textInput').exists()).toBe(true);
  });

  it('Devrait avoir un bouton pour commencer la partie', async () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });
})