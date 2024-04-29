import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OnGoingMission from '../OnGoingMission.vue'

describe('Actions.vue', () => {
    it('Par défaut, le texte ainsi que la mission courante sont affichés.', () => {
      const wrapper = mount(OnGoingMission, {
        props: { currentMission : 1 }
      })
      
      expect(wrapper.text()).toContain("1")
      expect(wrapper.text()).toContain("Objectifs: survivre à 5 missions en obtenant le plus de crédits")
    })

    it('Si la mission est différente, elle sera également affiché', () => {
        const wrapper = mount(OnGoingMission, {
          props: { currentMission : 4 }
        })
        
        expect(wrapper.text()).toContain("4")
      })
})