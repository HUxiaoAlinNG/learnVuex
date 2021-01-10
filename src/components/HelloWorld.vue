<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ age }}</h2>
    <h2>{{ myPage.age }}</h2>
    <h2>{{ posts.age }}</h2>
    <h2>{{ test.age }}</h2>
    <button @click="changeAge(1)">同步</button>
    <button @click="$store.dispatch('changeAge')">异步</button>
    <button @click="$store.commit('posts/changeAge', 1)">同步子模块1</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from "../vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  computed: mapState(["age", "myPage", "posts", "test"]),
  methods: {
    ...mapMutations(["changeAge"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
