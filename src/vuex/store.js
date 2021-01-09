import applyMixin from "./mixin";
import { forEachValue } from "./utils";
let Vue;
export class Store {
  constructor(options) {
    const state = options.state;
    this.getters = {};

    // 遍历getters并用computed方式进行拆解
    const computed = {};
    forEachValue(options.getters, (fn, key) => {
      computed[key] = () => {
        return fn(this.state);
      }
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    });

    this.mutations = {};
    forEachValue(options.mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn.call(this, this.state, payload)
    });

    this.actions = {};
    forEachValue(options.actions, (fn, key) => {
      this.actions[key] = (payload) => fn.call(this, this, payload);
    });

    // 构造新vue实例进行通信
    this._vm = new Vue({
      // 实现state
      data: {
        // 采用特殊符号 $命名，不会显性代理到实例上
        $$state: state,
      },
      // 使用computed实现getters
      computed,
    });
  }

  get state() {
    return this._vm._data.$$state;
  }

  commit = (type, payload) => {
    this.mutations[type](payload);
  }

  dispatch = (type, payload) => {
    this.actions[type](payload);
  }
}

export const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(Vue);
}