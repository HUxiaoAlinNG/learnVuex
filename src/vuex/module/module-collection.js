import { forEachValue } from "../utils";
import Module from "./module";

export default class ModuleCollection {
  constructor(options) {
    this.register([], options);
  }
  // 注册模块，构造树结构
  register(path, rootModule) {
    const newModule = new Module(rootModule);
    // 方便动态注册时取到树结构
    rootModule.rawModule = newModule;

    if (path.length == 0) {
      this.root = newModule;
    } else {
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo._children[current];
      }, this.root);
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rootModule.modules) {
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register(path.concat(moduleName), module);
      })
    }
  }
  // 获取命名空间
  getNamespace(path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + '/' : '')
    }, '');
  }
}