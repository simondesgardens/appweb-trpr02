import { describe, expect, vi, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../MainMenu.vue'
import Popup from "../../components/Popup.vue";
import routes from '../../router/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes : routes
})

describe('MainMenu.vue', async () => {
  let wrapper: any;

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

  it('Devrait afficher le message d\'erreur si databaseErrorOccurred est vrai', async () => {
    wrapper.vm.databaseErrorOccurred = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.alert.alert-danger').exists()).toBe(true);
  });

  it('Devrait appeler la méthode closeError lorsqu\'on clique sur le bouton de fermeture', async () => {
    wrapper.vm.databaseErrorOccurred = true;

    await wrapper.vm.$nextTick();
    const closeButton = wrapper.find('button[name="buttonCloseError"]');
    await closeButton.trigger('click');

    expect(wrapper.find('.alert.alert-danger').exists()).toBe(false);
  });
})