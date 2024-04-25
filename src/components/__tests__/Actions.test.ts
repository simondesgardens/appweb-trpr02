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

    it("Les emits sont envoyés lorsqu'on appuit sur les boutons.", async () => {
        const wrapper = mount(Actions)
        
        wrapper.vm.$emit('fight')
        wrapper.vm.$emit('finish')
        wrapper.vm.$emit('finishAndRepair')

        wrapper.find('#btnFight').trigger('click')
        wrapper.find('#btnFinish').trigger('click')
        wrapper.find('#btnFinishAndRepair').trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().fight).toBeTruthy()
        expect(wrapper.emitted().finish).toBeTruthy()
        expect(wrapper.emitted().finishAndRepair).toBeTruthy()
      })
})