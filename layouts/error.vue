<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>

    <!-- <NuxtLink to="/" v-if="error.statusCode === 404">Topページへ</NuxtLink> -->
    <a href="/">Topページへ</a>
    <!-- <div v-if="error.statusCode === 404">
      <NuxtLink to="/" v-if="$auth.loggedIn">Topページへ</NuxtLink>
      <NuxtLink to="/" v-else>ログインページへ</NuxtLink>
    </div>
    <div v-else> -->
    <!-- 500エラー時にNuxtLinkだとtopページに遷移できない為aタグ配置 -->
    <!-- <a href="/" v-if="$auth.loggedIn">Topページへ</a>
      <a href="/" v-else>ログインページへ</a>
    </div> -->
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "お探しのページは見つかりませんでした",
      otherError: "システムエラーが発生しました",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
