<template>
  <v-card width="80%" class="mx-auto mt-5" v-cloak>
    <v-tabs v-model="tabs" centered class="mb-5">
      <v-tab> Login </v-tab>
      <v-tab> Register </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" class="pt-5 mt-5 mx-auto" style="width: 80%">
      <v-form class="form" @submit.prevent="login">
        <v-tab-item>
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
          <v-btn class="d-flex mx-auto mb-3 px-10" type="submit"> login </v-btn>
        </v-tab-item>
      </v-form>
      <v-tab-item>
        <v-form class="form" @submit.prevent="register">
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

          <v-text-field
            label="Name"
            class="mx-auto pt-0"
            width="100%"
            v-model="registerForm.name"
          ></v-text-field>

          <v-text-field
            label="Email"
            class="mx-auto pt-0"
            width="100%"
            v-model="registerForm.email"
          ></v-text-field>

          <v-text-field
            label="Password"
            type="password"
            class="mx-auto pt-0"
            width="100%"
            v-model="registerForm.password"
          ></v-text-field>

          <v-text-field
            label="Password (confirm)"
            type="password"
            class="mx-auto pt-0"
            width="100%"
            v-model="registerForm.password_confirmation"
          ></v-text-field>

          <v-btn class="d-flex mx-auto mb-3 px-10" type="submit"
            >register</v-btn
          >
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
    async register() {
      // authストアのresigterアクションを呼び出す
      await this.$store.dispatch("auth/register", this.registerForm);

      if (this.apiStatus) {
        // トップページに移動する
        this.$router.push("/");
      }
    },
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

<style lang="scss">
li {
  list-style: none;
}
</style>
