<template>
  <v-card width="80%" class="mx-auto mt-5" v-cloak>
    <p>ログイン状態: {{ $auth.loggedIn }}</p>
    <v-tabs v-model="tabs" centered class="mb-5">
      <v-tab> Login</v-tab>
      <v-tab> Register </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" class="pt-5 mt-5 mx-auto" style="width: 80%">
      <v-form class="form" @submit.prevent="login">
        <v-tab-item>
          <!-- エラー結果表示 -->
          <div v-if="loginErrors" class="red--text">
            <ul v-if="loginErrors.email" class="pl-0">
              <li v-for="msg in loginErrors.email" :key="msg">
                {{ msg }}
              </li>
            </ul>
            <ul v-if="loginErrors.password" class="pl-0">
              <li v-for="msg in loginErrors.password" :key="msg">
                {{ msg }}
              </li>
            </ul>
          </div>

          <v-text-field
            label="Email"
            class="mx-auto pt-0 pb-3"
            width="100%"
            v-model="loginForm.email"
            :rules="emailRules"
            clearable
          ></v-text-field>

          <v-text-field
            type="password"
            label="Password"
            class="mx-auto pt-0"
            width="100%"
            v-model="loginForm.password"
            :rules="passwordRules"
            clearable
          ></v-text-field>
          <v-btn class="d-flex mx-auto mb-3 px-10" type="submit"> login </v-btn>
        </v-tab-item>
      </v-form>
      <v-tab-item>
        <v-form class="form" @submit.prevent="register">
          <!-- エラー結果表示 -->
          <div v-if="registerErrors" class="red--text">
            <ul v-if="registerErrors.name" class="pl-0">
              <li v-for="msg in registerErrors.name" :key="msg">
                {{ msg }}
              </li>
            </ul>
            <ul v-if="registerErrors.email" class="pl-0">
              <li v-for="msg in registerErrors.email" :key="msg">
                {{ msg }}
              </li>
            </ul>
            <ul v-if="registerErrors.password" class="pl-0">
              <li v-for="msg in registerErrors.password" :key="msg">
                {{ msg }}
              </li>
            </ul>
          </div>

          <v-text-field
            label="Name"
            class="mx-auto pt-0 pb-3"
            width="100%"
            v-model="registerForm.name"
            :rules="nameRules"
            clearable
          ></v-text-field>

          <v-text-field
            label="Email"
            class="mx-auto pt-0 pb-3"
            width="100%"
            v-model="registerForm.email"
            :rules="emailRules"
            clearable
          ></v-text-field>

          <v-text-field
            label="Password"
            type="password"
            class="mx-auto pt-0 pb-3"
            width="100%"
            v-model="registerForm.password"
            :rules="passwordRules"
            clearable
          ></v-text-field>

          <v-text-field
            label="Password (confirm)"
            type="password"
            class="mx-auto pt-0"
            width="100%"
            v-model="registerForm.password_confirmation"
            :rules="passwordRules"
            clearable
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
export default {
  middleware: ["auth"],
  head() {
    return {
      title: "ログイン",
    };
  },
  data() {
    return {
      processing: false,
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
      loginErrors: null,
      registerErrors: null,
      emailRules: [(text) => !!text || "メールアドレスを記入してください"],
      passwordRules: [(text) => !!text || "パスワードを記入してください"],
      nameRules: [
        (text) => !!text || "ユーザ名を記入してください",
        (text) => text.length <= 50 || "最大文字数は50文字です",
      ],
    };
  },
  async asyncData(context) {
    await context.$axios.$get("/sanctum/csrf-cookie").then(function (response) {
      // handle success
    });
  },
  methods: {
    async login() {
      this.processing = true;
      try {
        await this.$auth
          .loginWith("local", { data: this.loginForm })
          .then(() => {
            this.processing = false;
          });
      } catch (error) {
        console.log(error.response);
        this.loginErrors = error.response.data.errors;
      }
    },
    async register() {
      // authストアのresigterアクションを呼び出す
      try {
        await this.$store
          .dispatch("register", this.registerForm)
          .then((response) => {
            location.reload();
          });
      } catch (error) {
        console.log(error.response);
        this.registerErrors = error.response.data.errors;
      }
    },
  },
};
</script>

<style lang="scss">
li {
  list-style: none;
}
</style>
