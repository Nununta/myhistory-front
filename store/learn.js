import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../plugins/util";

const state = () => ({
  apiStatus: null,
  learnLists: [],
  learnCards: [],
});

const getters = {};

const mutations = {
  setLearnLists(state, learnLists) {
    state.learnLists = learnLists;
  },
  setApiStatus(state, status) {
    state.apiStatus = status;
  },
  setLearnCards(state, learnCards) {
    state.learnCards = learnCards;
  },
};

const actions = {
  ///学習リスト取得
  async learnListsGet(context) {
    const response = await this.$axios.get("/api/learn-list");

    if (response.status === CREATED) {
      const learnList = response.data.learnList || null;
      context.commit("setLearnLists", learnList);
      context.commit("setApiStatus", true);
      return false;
    }
    context.commit("setApiStatus", false);
    context.commit("error/setCode", response.status, {
      root: true,
    });
  },
  ///学習カード取得
  async learnCardsGet(context) {
    const response = await this.$axios.get("/api/learn-card/all");
    const learnCards = response.data || null;
    context.commit("setLearnCards", learnCards);
  },
  //404チェック
  async learnapiStatus(context, data) {
    if (data === OK) {
      context.commit("setApiStatus", true);
      return false;
    }
    context.commit("setApiStatus", false);
    context.commit("error/setCode", data, {
      root: true,
    });
  },

  //学習リスト新規作成
  async learnListsCreate(context, data) {
    const responseStatus = await this.$axios.post("/api/learn-list", data);

    if (responseStatus.status === CREATED) {
      const response = await this.$axios.get("/api/learn-list");
      const learnList = response.data.learnList || null;
      context.commit("setLearnLists", learnList);
      context.commit("setApiStatus", true);
      return false;
    }

    context.commit("setApiStatus", false);

    context.commit("error/setCode", responseStatus.status, {
      root: true,
    });
  },

  //学習カード新規作成
  async learnCardCreate(context, data) {
    const responseStatus = await this.$axios.post("/api/learn-card", data);

    if (responseStatus.status === CREATED) {
      const response = await this.$axios.get("/api/learn-card/all");
      console.log(response);
      const learnCards = response.data || null;
      context.commit("setLearnCards", learnCards);
      context.commit("setApiStatus", true);
      return false;
    }

    context.commit("setApiStatus", false);

    context.commit("error/setCode", responseStatus.status, {
      root: true,
    });
  },

  //学習カード更新
  async learnCardUpdate(context, data) {
    const responseStatus = await this.$axios.patch(
      "/api/learn-card/" + data.id,
      data
    );

    if (responseStatus.status === CREATED) {
      const response = await this.$axios.get("/api/learn-list");
      const learnList = response.data.learnList || null;
      context.commit("setLearnLists", learnList);
      context.commit("setApiStatus", true);
      return false;
    }
    context.commit("setApiStatus", false);

    context.commit("error/setCode", responseStatus.status, {
      root: true,
    });
  },
};

export default {
  //namespacedをtrueにすることでアクション呼び出す際に"モジュール/actions名"の形を第一に引数にできる。
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
