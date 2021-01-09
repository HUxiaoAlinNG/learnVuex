// 遍历对象
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}