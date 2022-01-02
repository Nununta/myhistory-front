import { UNPROCESSABLE_ENTITY, CREATED } from "../plugins/util";

const state = () => ({
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null,
});

const getters = {
  check: (state) => !!state.user,
  username: (state) => (state.user ? state.user.name : ""),
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setApiStatus(state, status) {
    state.apiStatus = status;
  },
  setLoginErrorMessages(state, messages) {
    state.loginErrorMessages = messages;
  },
  setRegisterErrorMessages(state, messages) {
    state.registerErrorMessages = messages;
  },
};

const actions = {
  //ユーザ登録
  async register(context, data) {
    context.commit("setApiStatus", null);
    console.log("a");
    const response = await this.$axios.$post("/api/register", data);

    if (response.status === CREATED) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response);
      return false;
    }
    context.commit("setApiStatus", false);

    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setRegisterErrorMessages", response.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
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
