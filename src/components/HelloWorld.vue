<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ $store.state.age }}</h2>
    <h2>{{ $store.state.myPage.age }}</h2>
    <h2>{{ $store.state.posts.age }}</h2>
    <h2>{{ $store.state.test.age }}</h2>
    <button @click="$store.commit('changeAge', 1)">同步</button>
    <button @click="$store.dispatch('changeAge')">异步</button>
    <button @click="$store.commit('posts/changeAge', 1)">同步子模块1</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
