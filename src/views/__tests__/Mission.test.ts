import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Mission from '../Mission.vue'
import routes from '../../router/routes'
import { createRouter, createWebHistory } from 'vue-router'
import Actions from "../../components/Actions.vue";
import OnGoingMission from "../../components/OnGoingMission.vue";
import Player from "../../components/Player.vue";
import Popup from '../../components/Popup.vue'

const router = createRouter({
    history: createWebHistory(),
    routes : routes
  })

const setupEnemy = (wrapper) => {
    wrapper.vm.enemy = {
        id: 1,
        credit: 100,
        experience: 5,
        name: "The Enemy",
        ship: {
            id: 1,
            name: "The Ship",
            vitality: 100
        }
    }
    wrapper.vm.enemyLife = 100
    wrapper.vm.enemies = [{
        id: 1,
        credit: 100,
        experience: 5,
        name: "The Enemy",
        ship: {
            id: 1,
            name: "The Ship",
            vitality: 100
        }
    }]
}

describe('Mission.vue', () => {

    it("Par défaut, les composants se charge avec les bonnes valeurs", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        const actionsComp = wrapper.findComponent(Actions)
        const onGoingMissionComp = wrapper.findComponent(OnGoingMission)
        const playerComp = wrapper.findAllComponents(Player)

      
        await router.isReady()

        // Le composant Player du joueur
        expect(playerComp[0].text()).toContain("Simon")
        expect(playerComp[0].text()).toContain("Master - 0CG")
        expect(playerComp[0].text()).toContain("100%")
        expect(playerComp[0].text()).toContain("CR90 corvette")

        // Le composant Player de l'ennemi
        expect(playerComp[1]).toBeDefined()

        // Le composant Actions
        expect(actionsComp.text()).toContain("Combattre")
        expect(actionsComp.text()).toContain("Terminer la mission")
        expect(actionsComp.text()).toContain("Terminer la mission et réparer le vaisseau")

        // Le composant OnGoingMission
        expect(onGoingMissionComp.text()).toContain("1")
        expect(onGoingMissionComp.text()).toContain("Objectifs: survivre à 5 missions en obtenant le plus de crédits")
    })

    it("Lorqu'il y a un combat, la vie du joueur et de l'ennemi diminue", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();
        const vm = wrapper.vm as any;

        // Mettre des valeurs à l'ennemi
        setupEnemy(wrapper)

        const actionsComp = wrapper.findComponent(Actions)
        const playerComp = wrapper.findAllComponents(Player)

        actionsComp.find("#btnFight").trigger('click')

        await wrapper.vm.$nextTick();



        expect(playerComp[0].text()).toContain(vm.playerLife)
        expect(playerComp[1].text()).toContain(wrapper.vm.enemyLife)
    })

    it("Lorsque le joueur meurt, un popup pour la défaite apparaît", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();
        const vm = wrapper.vm as any;

        // Mettre des valeurs à l'ennemi
        setupEnemy(wrapper)

        // Mettre la vie du joueur à 1
        vm.playerLife = 1

        const actionsComp = wrapper.findComponent(Actions)

        actionsComp.find("#btnFight").trigger('click')

        await wrapper.vm.$nextTick();

        const popup = wrapper.findComponent(Popup)

        expect(popup.text()).toContain("Vous avez perdu la mission...")
    })

    it("Lorsque l'ennemi meurt, un popup pour la victoire apparaît", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();

        // Mettre des valeurs à l'ennemi
        setupEnemy(wrapper)
        wrapper.vm.enemyLife = 1

        const actionsComp = wrapper.findComponent(Actions)

        actionsComp.find("#btnFight").trigger('click')

        await wrapper.vm.$nextTick();

        const popup = wrapper.findComponent(Popup)

        expect(popup.text()).toContain("Vous avez gagné la mission !")
    })

    it("Lorsque l'ennemi meurt, le compte du nombre de mission augmente", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();

        setupEnemy(wrapper)

        wrapper.vm.enemyLife = 1

        wrapper.findComponent(Actions).find("#btnFight").trigger('click')
        await wrapper.vm.$nextTick();

        wrapper.findComponent(Popup).find('#btnClose').trigger('click')

        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(OnGoingMission).text()).toContain("2/5")
    })

    it("Lorsqu'on fini la mission, le compte du nombre de mission augmente", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();

        setupEnemy(wrapper)

        wrapper.findComponent(Actions).find("#btnFinish").trigger('click')
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(OnGoingMission).text()).toContain("2/5")
    })

    it("Lorsqu'on fini la mission et qu'on répare le vaisseau, le compte du nombre de mission augmente et le vaisseau est réparé", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();

        setupEnemy(wrapper)
        const vm = wrapper.vm as any;
        vm.playerLife = 80
        vm.player.credit = 100

        wrapper.findComponent(Actions).find("#btnFinishAndRepair").trigger('click')
        await wrapper.vm.$nextTick();

        expect(wrapper.findAllComponents(Player)[0].text()).toContain('100%')
        expect(wrapper.findComponent(OnGoingMission).text()).toContain("2/5")
    })

    it("Lorsqu'on fini la mission et qu'on répare le vaisseau, un popup apparît si nous n'avons pas assez de credit", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();

        setupEnemy(wrapper)
        const vm = wrapper.vm as any;
        vm.playerLife = 80

        wrapper.findComponent(Actions).find("#btnFinishAndRepair").trigger('click')
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(Popup).text()).toContain("Vous n'avez pas assez de crédit pour réparer votre vaisseau...")
    })

    it("Lorsqu'on atteint 5 missions, on a un message de victoire", async () => {
        router.push('mission/Simon,CR90%20corvette')
        await router.isReady()

        const wrapper = mount(Mission, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick();

        setupEnemy(wrapper)
        wrapper.vm.currentMission = 4

        wrapper.findComponent(Actions).find("#btnFinish").trigger('click')
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(Popup).text()).toContain('Vous avez complété 5 missions !')
    })
})