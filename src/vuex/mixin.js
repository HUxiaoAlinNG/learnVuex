const applyMixin = (Vue) => {
  Vue.mixin({
    beforeCreate: function () {
      const options = this.$options;
      // 都指向同一个$store
      if (options.store) {
        // 给根实例增加$store属性
        this.$store = options.store;
      } else if (options.parent && options.parent.$store) {
        // 给组件增加$store属性
        this.$store = options.parent.$store;
      }
    }
  })
}

export default applyMixin