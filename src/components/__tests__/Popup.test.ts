import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Popup from '../Popup.vue'

describe('Actions.vue', () => {
    it("Par défaut, le popup s'affiche et le message sur le bouton est le bon", () => {
      const wrapper = mount(Popup, {
        props: { buttonMessage : "Fermer" }
      })
      
      expect(wrapper.text()).toContain("Fermer")
    })
})