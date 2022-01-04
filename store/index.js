import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../plugins/util";
import axios from "axios";

const state = () => ({
  user: null,
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
  async login(context, data) {
    const response = await this.$auth.loginWith("local", {
      data: data,
    });

    if (response.status === OK) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data);
      return false;
    }

    context.commit("setApiStatus", false);

    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setRegisterErrorMessages", response.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  //ユーザ登録
  async register(context, data) {
    context.commit("setApiStatus", null);
    const response = await axios.post("/api/register", data);

    if (response.status === CREATED) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data);
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
