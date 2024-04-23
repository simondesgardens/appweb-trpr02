import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MainMenu from '../src/components/MainMenu.vue'
import { Modal } from 'bootstrap'

describe('MainMenu.vue', () => {

  it('Sur lancement de la partie, doit émettre un événement.', async () => {
    const wrapper = mount(MainMenu, {
      props: {
        playButton: 'mon bouton play'
      }
    })

    await wrapper.find('button[name="play"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('startGame')
  })
})