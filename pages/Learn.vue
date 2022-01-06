<template>
  <div class="task-lists">
    <h1>LearnList</h1>

    <v-row class="justify-center my-3">
      <v-dialog width="500" v-model="dialogList">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            class="me-5"
            color="cyan darken-4"
            elevation="6"
            dark
            v-bind="attrs"
            v-on="on"
          >
            listAdd
          </v-btn>
        </template>
        <v-card class="pa-5">
          <LearnListAdd @dialogClose="dialogCloseList" />
        </v-card>
      </v-dialog>

      <template>
        <div class="text-center">
          <v-dialog width="500" v-model="dialogCard">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="cyan darken-4"
                elevation="6"
                dark
                v-bind="attrs"
                v-on="on"
              >
                cardAdd
              </v-btn>
            </template>
            <v-card class="pa-5">
              <LearnCardAdd
                :listNames="listNames"
                @dialogClose="dialogCloseList"
              />
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-row>
    <div class="d-flex justify-center flex-wrap my-5 py-5">
      <List
        v-for="learnList in learnLists"
        :key="learnList.id"
        :name="learnList.name"
        :listIndex="learnList.id"
        :learnCards="learnList.cards"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LearnListAdd from "../components/learn/LearnListAdd.vue";
import LearnCardAdd from "../components/learn/LearnCardAdd.vue";
import List from "../components/learn/List.vue";
export default {
  components: {
    LearnListAdd,
    List,
    LearnCardAdd,
  },
  data() {
    return {
      learnLists: [],
      listNames: [],
      tweet: "api",
      dialogCard: false,
      dialogList: false,
    };
  },
  methods: {
    async learnListsGet() {
      const response = await this.$axios.get("/api/learn-list");
      this.learnLists = response.data.learnList;

      const listNames = [];
      this.learnLists.forEach(function (learnList) {
        listNames.push(learnList.name);
      });
      this.listNames = listNames;
    },
    dialogCloseList() {
      this.dialogList = false;
    },
    dialogCloseCard() {
      this.dialogCard = false;
    },
  },
  computed: {
    ...mapState({
      stateLearnLists: (state) => state.learn.learnLists,
      stateLearnCards: (state) => state.learn.learnCards,
    }),
  },
  watch: {
    $route: {
      async handler() {
        this.learnListsGet();
        await this.$store.dispatch("learn/learnListsGet");
      },
      immediate: true,
    },
    stateLearnLists: {
      handler() {
        this.learnListsGet();
      },
      deep: true,
    },
    stateLearnCards: {
      handler() {
        this.learnListsGet();
      },
      deep: true,
    },
    // dialogList() {
    //   if (!this.dialogList) {
    //     //ダイアログが閉じた時の処理
    //     if (this.errorMessages) {
    //       this.statusReset();
    //     }
    //   }
    // },
    // dialogCard() {
    //   if (!this.dialogCard) {
    //     //ダイアログが閉じた時の処理
    //     if (this.errorMessages) {
    //       this.statusReset();
    //     }
    //   }
    // },
  },
};
</script>
