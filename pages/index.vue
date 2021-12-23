<template>
  <div>
    <p @click="apitest">{{ posts.hello }}</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      dataTest: "",
    };
  },
  async asyncData({ $axios }) {
    const posts = await $axios.$get("/api/hello");
    console.log($axios);
    return { posts };
  },
  methods: {
    async apitest() {
      const res = await axios.get("/api/hello");
      console.log(res);
    },
  },
};
</script>
