import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Actions from '../Actions.vue'

describe('Actions.vue', () => {
    it('Par défaut, les boutons sont affichés dans le composant.', () => {
      const wrapper = mount(Actions)
  
      expect(wrapper.text()).toContain("Combattre")
      expect(wrapper.text()).toContain("Terminer la mission")
      expect(wrapper.text()).toContain("Terminer la mission et réparer le vaisseau")
    })
})