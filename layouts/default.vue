<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../plugins/util";
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
  computed: {
    errorCode() {
      return this.$store.state.error.code;
    },
  },
  watch: {
    errorCode: {
      handler(val) {
        if (val === INTERNAL_SERVER_ERROR) {
          console.log(val);
          this.$router.push("/500");
        } else if (val === NOT_FOUND) {
          this.$router.push("/not-found");
        }
      },
      immediate: true,
    },
    $route() {
      this.$store.commit("error/setCode", null);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
