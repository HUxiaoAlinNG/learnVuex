import { forEachValue } from "../utils";

export default class Module {
  constructor(rawModule) {
    this._children = {};
    this._rawModule = rawModule;
    this.state = rawModule.state;
  }

  get namespaced() {
    return !!this._rawModule.namespaced;
  }
  // 获取子模块
  getChild(key) {
    return this._children[key];
  }
  // 添加子模块
  addChild(key, module) {
    this._children[key] = module;
  }
  // 注册mutation
  forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  }
  // 注册action
  forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  }
  // 注册getter
  forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  }
  // 注册child
  forEachChild(fn) {
    forEachValue(this._children, fn);
  }
}