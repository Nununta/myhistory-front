import colors from "vuetify/es5/util/colors";
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - myhistory-front",
    title: "myhistory-front",
    htmlAttrs: {
      lang: "ja",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: "~/assets/sass/app.scss", lang: "scss" }],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/util.js" }],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth", // 追記
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    credentials: true,
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: "http://localhost:8000",
    },
    secure: false, //追記
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        /*以下追加*/
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  auth: {
    redirect: {
      login: "/", // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: "/", // ログアウト時のリダイレクトURL
      callback: "/", // Oauth認証等で必要となる コールバックルート
      home: "/task", // ログイン後のリダイレクトURL
    },
    strategies: {
      //strategiesの中身に認証ロジックを書いていく
      local: {
        token: {
          // type: 'Bearer',
          property: "access_token",
        }, // 自動的にauthorizationヘッダーにbeareという文字を追加
        user: {
          //追加
          property: false,
        },
        endpoints: {
          login: {
            url: "/api/auth/login", //ログインするときにアクセスするurl
            method: "post",
            propertyName: false, //サーバーから帰ってくるトークンの名前
          },
          user: { url: "/api/user", method: "get", propertyName: false },
          logout: { url: "/api/auth/logout", method: "post" },
        },
        tokenRequired: false,
        tokenType: false,
      },
    },
    localStorage: false,
  },
  router: {
    middleware: ["auth"],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
