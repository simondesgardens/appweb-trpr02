import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Player from '../Player.vue'

describe('Actions.vue', () => {
    it('Par défaut, le composant est bien initialisé avec les données du personnage passé en props', () => {
      const wrapper = mount(Player, {
        props: { 
            player : {
                id: 0,
                credit: 150,
                experience: 4,
                name: "Simon",
                ship: {
                    id: 0,
                    name: "Bip bip boop boop",
                    vitality: 100
                }
            },
            currentVitality : 50
         }
      })
      
      expect(wrapper.text()).toContain("Simon")
      expect(wrapper.text()).toContain("Expert - 150CG")
      expect(wrapper.text()).toContain("50%")
      expect(wrapper.text()).toContain("Bip bip boop boop")
    })
})