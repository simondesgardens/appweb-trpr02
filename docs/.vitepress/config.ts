import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TP2 revue de code",
  description: "Revue de code pour le tp02",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Revue de code',
        items: [
          { text: 'Ilann Brodl Semaine 1', link: '/ilann-brodl' },
          { text: 'Ilann Brodl Semaine 2', link: '/ilann-brodl-s2' },
          { text: 'Ilann Brodl Semaine 3', link: '/ilann-brodl-s3' },
          { text: 'Simon Dejardins', link: '/simon-desjardins' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
