<template>
  <header>
    <v-app-bar
      app
      color="cyan darken-4 indigo--text text--lighten-5"
      dark
      clipped-left
    >
      <v-toolbar-title>
        <span class="pl-3">MyHistory</span>
      </v-toolbar-title>
      <v-tabs v-if="$auth.loggedIn">
        <v-tab to="/"
          ><v-icon class="me-2">mdi-electron-framework</v-icon> TASK
        </v-tab>
        <!-- <v-tab to="/learn" v-if="isLogin"
                    ><v-icon class="me-2">mdi-book-open-page-variant</v-icon>
                    LEARN
                </v-tab> -->
        <v-tab @click="$auth.logout()"> Logout </v-tab>
      </v-tabs>
    </v-app-bar>
  </header>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
}

.v-application a {
  color: hsla(0, 0%, 100%, 0.6);
}
</style>
