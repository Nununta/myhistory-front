<template>
  <nuxt-link :to="`/learns?id=${learnCard.id}`" class="routerLink">
    <v-card
      class="mx-3 p-2 pb-4 my-2"
      width="250px"
      style="min-width: 250px"
      :color="cardColor"
      hover
    >
      <div class="d-flex justify-end mt-3 me-3">
        <v-hover v-slot="{ hover }"
          ><span @click.prevent="removeCard" :class="{ 'on-hover': hover }"
            >X</span
          ></v-hover
        >
      </div>

      <v-card-title class="justify-center card-name">
        <span class="card-name font-weight-bold">{{ learnCard.name }}</span>
      </v-card-title>

      <div>
        <div class="d-flex justify-space-between mt-2 mx-4">
          {{ learnCard.date }}
          <span>{{ statusName }}</span>
        </div>
        <div class="d-flex justify-end">
          <v-btn text icon large color="#1DA1F2" @click.prevent="twitterShare">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </div>
      </div>

      <v-alert v-if="tweetError" type="error">
        Tweet可能な文字数はタイトルと合わせて130文字です。
      </v-alert>
    </v-card>
  </nuxt-link>
</template>

<script>
export default {
  name: "Card",
  props: {
    learnCard: {
      type: Object,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      status: "",
      tweetError: false,
    };
  },
  methods: {
    async removeCard() {
      if (confirm("学習記録を削除してもよろしいでしょうか?")) {
        await this.$axios
          .delete("/api/learn-card/" + this.learnCard.id)
          .then((response) => {
            this.$store.dispatch("learn/learnCardsGet");
          })
          .catch((error) => {
            console.log(error);
            alert("削除に失敗しました");
          });
      }
    },
    twitterShare() {
      //シェアする画面を設定
      const shareURL =
        "https://twitter.com/intent/tweet?text=" +
        "【" +
        this.learnCard.name +
        "】" +
        "%0a" +
        this.learnCard.content +
        "%0a" +
        "%20%23MyHistory";

      const tweetContenstsLength =
        this.learnCard.name.length + this.learnCard.content.length;

      if (tweetContenstsLength <= 130) {
        window.open(shareURL, "_blank");
      } else {
        this.tweetError = true;
      }
    },
    lengthCheck() {
      const tweetContenstsLength =
        this.learnCard.name.length + this.learnCard.content.length;
    },
  },
  computed: {
    statusName() {
      if (this.learnCard.status == 0) {
        return "未着手";
      } else if (this.learnCard.status == 1) {
        return "学習中";
      } else if (this.learnCard.status == 2) {
        return "保留";
      } else if (this.learnCard.status == 3) {
        return "完了";
      }
    },
    cardColor() {
      if (this.learnCard.status == 0) {
        return "red lighten-3 grey--text text--darken-3";
      } else if (this.learnCard.status == 1) {
        return "blue lighten-3 grey--text text--darken-3";
      } else if (this.learnCard.status == 2) {
        return "lime lighten-3 grey--text text--darken-3";
      } else if (this.learnCard.status == 3) {
        return "blue-grey darken-3 white--text";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.v-card__title span.on-hover {
  cursor: pointer;
}

.routerLink {
  text-decoration: none;
}

.card-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
