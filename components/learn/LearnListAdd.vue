<template>
  <v-form ref="card_form">
    <v-text-field
      v-model="learnList.name"
      label="LearnList"
      @focusin="startEdit"
      @focusout="finishEdit"
      counter
      :rules="nameRules"
    ></v-text-field>
    <div class="d-flex justify-center">
      <v-btn
        class="me-5 mb-3 px-10"
        @click="addList"
        :class="[
          isEditing || contentExists
            ? 'cyan red--text text--lighten-5'
            : 'indigo darken-4 blue--text text--lighten-5',
        ]"
      >
        submit
      </v-btn>
      <v-btn class="mb-3 px-10 deep-orange darken-1 white--text" @click="clear">
        Clear
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      learnList: {
        name: "",
      },
      isEditing: false,
      nameRules: [
        (text) => !!text || "リスト名を記入してください",
        (text) => text.length <= 50 || "最大文字数は50文字です",
      ],
    };
  },
  methods: {
    async addList() {
      if (this.$refs.card_form.validate()) {
        await this.$store.dispatch("learn/learnListsCreate", this.learnList);
        this.learnList.name = "";
        this.$refs.card_form.resetValidation();
      }
    },
    clear() {
      this.learnList.name = "";
      this.$refs.card_form.resetValidation();
    },
    startEdit() {
      this.isEditing = true;
    },
    finishEdit() {
      this.isEditing = false;
    },
  },
  computed: {
    contentExists() {
      return this.learnList.name.length > 0;
    },
    ...mapState({
      listAddErrors: (state) => state.learn.errorMessages,
    }),
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
