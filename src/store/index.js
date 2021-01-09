import Vue from "vue"
import Vuex from "../vuex/index"

Vue.use(Vuex)

export default new Vuex.Store({
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
  }
})