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
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-application {
  background-color: #e9e1e1;
  color: black;
}
li {
  list-style: none;
}
</style>
