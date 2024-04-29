import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Score from '../Score.vue'

describe('Score.vue', async () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(Score);
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

  it('Devrait afficher l\'image si databaseErrorOccurred est vrai', async () => {
    wrapper.vm.databaseErrorOccurred = true;

    await wrapper.vm.$nextTick();
    expect(wrapper.find('img').exists()).toBe(true);
  });
})