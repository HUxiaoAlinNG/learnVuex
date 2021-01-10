import applyMixin from "./mixin";
import ModuleCollection from "./module/module-collection";
import { forEachValue } from "./utils";

// 安装模块
function installModule(store, rootState, path, module) {
  const namespace = store._modules.getNamespace(path);
  if (path.length > 0) {
    const parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current];
    }, rootState);
    Vue.set(parent, path[path.length - 1], module.state);
  }
  module.forEachMutation((mutation, key) => {
    store._mutations[namespace + key] = store._mutations[namespace + key] || [];
    store._mutations[namespace + key].push((payload) => {
      mutation.call(store, module.state, payload);
    });
  });
  module.forEachAction((action, key) => {
    store._actions[namespace + key] = store._actions[namespace + key] || [];
    store._actions[namespace + key].push(function (payload) {
      action.call(store, this, payload);
    });
  });
  module.forEachGetter((getter, key) => {
    store._wrappedGetters[namespace + key] = function () {
      return getter(module.state);
    }
  });
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child)
  })
}

//重置实例
function resetStoreVM(store, state) {
  let oldVm = store._vm;
  const computed = {};
  store.getters = {};
  const wrappedGetters = store._wrappedGetters;
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = () => {
      return fn(store.state);
    }
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    })
  });
  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed,
  });
  // 重新new vue实例时将旧实例销毁
  if (oldVm) {
    Vue.nextTick(() => oldVm.$destroy())
  }
}

let Vue;
export class Store {
  constructor(options) {
    const state = options.state;

    // 组装成树结构
    this._modules = new ModuleCollection(options);

    this._actions = {};
    this._mutations = {};
    this._wrappedGetters = {};
    // 安装模块
    installModule(this, state, [], this._modules.root);

    // 构造新vue实例进行通信
    resetStoreVM(this, state);
  }

  get state() {
    return this._vm._data.$$state;
  }

  // 更改mutaions
  commit = (type, payload) => {
    this._mutations[type].forEach(fn => fn.call(this, payload));
  }

  dispatch = (type, payload) => {
    this._actions[type].forEach(fn => fn.call(this, payload));
  }

  // 动态注册模块
  registerModule(path, rawModule) {
    if (typeof path == 'string') path = [path];
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, rawModule.rawModule);
    // 重新设置state, 更新getters
    resetStoreVM(this, this.state);
  }
}

export const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(Vue);
}