export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Visionautik Akademie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://app.snipcart.com' },
      { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css',
      },
    ],
    script: [
      { src: 'https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js' },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'blue' },

  router: {
    extendRoutes(routes, resolve) {
      // Configure type param before offer single page
      routes = routes.map((route) => {
        if (route.name === 'offers-offer') {
          route.name = 'offers-type-offer'
          route.path = '/offers/:type/:offer'
        }
        return route
      })
    },
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/classes.scss',
    '@/assets/scss/fonts.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/nuxt-i18n-fetch', '@/plugins/api'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // modules for full static before `nuxt export` (coming in v2.12)
    // '@/modules/static',
    // '@/modules/crawler',
    // Prismic
    '@nuxtjs/prismic',
    // Global styles
    '@nuxtjs/style-resources',
    // i18n
    'nuxt-i18n',
  ],

  // Prismic - configuration
  prismic: {
    endpoint: 'https://visionautikde.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
  },

  // Global styles - configuration
  styleResources: {
    scss: ['@/assets/scss/variables.scss', '@/assets/scss/mixins.scss'],
  },

  // i18n - configuration
  i18n: {
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.js',
      },
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        file: 'en-GB.js',
      },
    ],
    langDir: './lang/',
    lazy: true,
    defaultLocale: 'de',
    // vueI18nLoader: true,
    parsePages: false,
    seo: false,
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'de',
    },
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */

  buildDir: '.nuxt',
  // build: {
  //   publicPath: '/assets/',
  //   extractCss: true,
  // },
  globalName: 'nuxt',
}
