<template>
  <div class="task-lists">
    <h1>TaskList</h1>

    <v-row class="justify-center my-3">
      <v-dialog width="500">
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
          <TaskListAdd />
        </v-card>
      </v-dialog>

      <template>
        <div class="text-center">
          <v-dialog width="500">
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
              <TaskCardAdd :listNames="listNames" />
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-row>

    <div class="d-flex justify-center flex-wrap my-5 py-5">
      <List
        v-for="taskList in taskLists"
        :key="taskList.id"
        :name="taskList.name"
        :listIndex="taskList.id"
        @cardSort="taskListsGet"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TaskListAdd from "../components/task/TaskListAdd.vue";
import TaskCardAdd from "../components/task/TaskCardAdd.vue";
import List from "../components/task/List.vue";
export default {
  components: {
    TaskListAdd,
    List,
    TaskCardAdd,
  },
  data() {
    return {
      taskLists: [],
      listNames: [],
      // dialogCard: false,
      // dialogList: false,
    };
  },
  methods: {
    async taskListsGet() {
      const response = await this.$axios.$get("/api/task-list");
      this.taskLists = response.taskList;

      const listNames = [];
      this.taskLists.forEach(function (taskList) {
        listNames.push(taskList.name);
      });
      this.listNames = listNames;
    },
    // dialogCloseList() {
    //   this.dialogList = false;
    // },
    // dialogCloseCard() {
    //   this.dialogCard = false;
    // },
  },
  computed: {
    ...mapState({
      stateTaskLists: (state) => state.task.taskLists,
      stateTaskCards: (state) => state.task.taskCards,
    }),
  },
  watch: {
    $route: {
      async handler() {
        this.taskListsGet();
        await this.$store.dispatch("task/taskListsGet");
      },
      immediate: true,
    },
    stateTaskLists: {
      handler() {
        this.taskListsGet();
      },
      deep: true,
    },
  },
};
</script>
