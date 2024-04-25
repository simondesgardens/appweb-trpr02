import { describe, afterEach, expect, vi, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'
import NavigationBar from '../NavigationBar.vue'

const router = createRouter({
  history: createWebHistory(),
  routes : routes
})

describe('NavigationBar.vue', () => {

    it('Doit pouvoir naviguer sur la page du menu.', async () => {
        router.push('/')
        await router.isReady()
    
        const wrapper = mount(NavigationBar, {
          global: {
            plugins: [router]
          }
        })
    
        const routerSpy = vi.spyOn(router, 'push')
    
        const linkAboutEl = wrapper.find('#menu')
        await linkAboutEl.trigger('click')
    
        expect(routerSpy).toHaveBeenCalledWith('/')
      })
    
    
  it('Doit pouvoir naviguer sur la page des scores.', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    const linkPostsEl = wrapper.find('#score')
    await linkPostsEl.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith({ name: 'Score' })
  })
})
