import path from 'path'
import 'dotenv/config'

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // script: [{ src: '/registerServiceWorker.js' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'blue' },

  router: {
    scrollBehavior(to) {
      if (to.hash) {
        return window.scrollTo({
          top:
            document.querySelector(to.hash).offsetTop - window.innerHeight / 4,
          behavior: 'smooth',
        })
      }
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },

  srcDir: '.',
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/classes.scss',
    '@/assets/scss/fonts.scss',
    // '@/assets/scss/snipcart.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // '@/plugins/i18nFetch',
    // '@/plugins/cms',
    // { src: '@/plugins/registerServiceWorker', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/router',
    // '@nuxtjs/snipcart',
    // '@nuxtjs/google-analytics',
  ],
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
    // Adds a sitemap. Always add this module at the end of the modules array!
    // '@nuxtjs/sitemap',
  ],

  // Server middleware
  // serverMiddleware: [{ path: '/api', handler: '@/api/index.js' }],

  // Prismic - configuration
  prismic: {
    endpoint: process.env.PRISMIC_ENDPOINT,
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
    vueI18nLoader: true,
    parsePages: false,
    seo: false,
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'de',
      numberFormats: {
        de: {
          currency: {
            style: 'currency',
            currency: 'EUR',
          },
        },
        en: {
          currency: {
            style: 'currency',
            currency: 'EUR',
          },
        },
      },
      dateTimeFormats: {
        de: {
          shortDate: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          longDate: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
          time: {
            hour: 'numeric',
            minute: 'numeric',
          },
        },
        en: {
          shortDate: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          longDate: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
          time: {
            hour: 'numeric',
            minute: 'numeric',
          },
        },
      },
    },
  },

  // snipcart: {
  //   // Options available
  //   key: process.env.SNIPCART_PUBLIC_KEY,
  //   addProductBehavior: true,
  //   locales: {} /* not required */,
  //   // snipcartCustomize: path.join(__dirname, 'snipcart/customize'),
  // },

  build: {
    // Watch changes in snipcart directory and rebuild the application
    // watch: ['src/snipcart'],

    postcss: {
      // configure autoprefixer
      autoprefixer: {},
    },
  },

  routerModule: {
    fileName: 'router.js',
  },

  dir: {
    assets: 'assets',
    layouts: 'components/templates',
    middleware: 'middleware',
    pages: 'components/pages',
    static: 'static',
    store: 'store',
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */

  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/',
    extractCss: true,
  },
  globalName: 'nuxt',

  publicRuntimeConfig: {
    webPushPublicKey: process.env.WEBPUSH_PUBLIC_KEY,
  },
  privateRuntimeConfig: {},
}
