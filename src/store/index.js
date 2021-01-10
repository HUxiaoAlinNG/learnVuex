import Vue from "vue"
import Vuex from "../vuex/index"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false }
    ],
    age: 18,
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    getAge: state => state.age
  },
  mutations: {
    changeAge: (state, payload) => {
      state.age += payload;
    }
  },
  actions: {
    changeAge: ({ commit }) => {
      setTimeout(() => {
        commit("changeAge", 2);
      }, 2000)
    }
  },
  // 嵌套模块
  modules: {
    // 继承父模块的命名空间
    myPage: {
      state: { age: 28 },
      getters: {
        profile(state) { return state.age } // -> getters['account/profile']
      },
      mutations: {
        changeAge: (state, payload) => {
          state.age += 30;
        }
      }
    },

    // 进一步嵌套命名空间
    posts: {
      namespaced: true,

      state: { age: 29 },
      getters: {
        profile(state) { return state.age } // -> getters['account/posts/popular']
      },
      mutations: {
        changeAge: (state, payload) => {
          state.age += 40;
        }
      }
    }
  }
});

store.registerModule("test", {
  state: {
    age: 1,
  },
  getters: {
    getAge: (state) => state.age + 3
  },
  mutations: {
    changeAge: (state, payload) => {
      state.age += 40;
    }
  }
})

export default store;
