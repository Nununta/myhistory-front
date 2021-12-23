<template>
  <v-card>
    <v-tabs v-model="tabs" centered color="white">
      <v-tab> Login </v-tab>
      <v-tab> Register </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" class="mt-3">
      <v-tab-item>
        <v-form class="form" @submit.prevent="login">
          <!-- エラー結果表示 -->
          <!-- <div v-if="loginErrors" class="errors">
          <ul v-if="loginErrors.email">
            <li v-for="msg in loginErrors.email" :key="msg">
              {{ msg }}
            </li>
          </ul>
          <ul v-if="loginErrors.password">
            <li v-for="msg in loginErrors.password" :key="msg">
              {{ msg }}
            </li>
          </ul>
        </div> -->
          <v-card>
            <v-text-field
              label="Email"
              class="mx-auto pt-0"
              width="100%"
              v-model="loginForm.email"
            ></v-text-field>

            <v-text-field
              type="password"
              label="Password"
              class="mx-auto pt-0"
              width="100%"
              v-model="loginForm.password"
            ></v-text-field>
            <v-btn class="d-flex mx-auto mb-3 px-10" type="submit">
              login
            </v-btn>
          </v-card>
        </v-form>
      </v-tab-item>
      <v-tab-item>
        <v-form class="form" @submit.prevent="register">
          <v-card>
            <!-- エラー結果表示 -->
            <!-- <div v-if="registerErrors" class="errors">
          <ul v-if="registerErrors.name">
            <li v-for="msg in registerErrors.name" :key="msg">
              {{ msg }}
            </li>
          </ul>
          <ul v-if="registerErrors.email">
            <li v-for="msg in registerErrors.email" :key="msg">
              {{ msg }}
            </li>
          </ul>
          <ul v-if="registerErrors.password">
            <li v-for="msg in registerErrors.password" :key="msg">
              {{ msg }}
            </li>
          </ul>
        </div> -->
            <label for="username">Name</label>
            <input
              type="text"
              class="form__item"
              id="username"
              v-model="registerForm.name"
            />
            <label for="email">Email</label>
            <input
              type="text"
              class="form__item"
              id="email"
              v-model="registerForm.email"
            />
            <label for="password">Password</label>
            <input
              type="password"
              class="form__item"
              id="password"
              v-model="registerForm.password"
            />
            <label for="password-confirmation">Password (confirm)</label>
            <input
              type="password"
              class="form__item"
              id="password-confirmation"
              v-model="registerForm.password_confirmation"
            />
            <div class="form__button">
              <button type="submit" class="button button--inverse">
                register
              </button>
            </div>
          </v-card>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
//import { mapState } from "vuex";
export default {
  data() {
    return {
      tabs: null,
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    async login() {
      // authストアのloginアクションを呼び出す
      console.log("login");
      // await this.$store.dispatch("auth/login", this.loginForm);

      // if (this.apiStatus) {
      //     // トップページに移動する
      //     this.$router.push("/");
      // }
    },
    // async register() {
    //     // authストアのresigterアクションを呼び出す
    //     await this.$store.dispatch("auth/register", this.registerForm);

    //     if (this.apiStatus) {
    //         // トップページに移動する
    //         this.$router.push("/");
    //     }
    // },
    // clearError() {
    //     this.$store.commit("auth/setLoginErrorMessages", null);
    //     this.$store.commit("auth/setRegisterErrorMessages", null);
    // },
  },
  // computed: {
  //     ...mapState({
  //         apiStatus: (state) => state.auth.apiStatus,
  //         loginErrors: (state) => state.auth.loginErrorMessages,
  //         registerErrors: (state) => state.auth.registerErrorMessages,
  //     }),
  // },
  // created() {
  //     this.clearError();
  // },
};
</script>

<style>
li {
  list-style: none;
}
</style>
