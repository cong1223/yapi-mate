const store = new (class {
  tasks: Map<
    Function,
    Map<
      string,
      {
        lastVisitTime: number;
        execResult: any;
        durTime: number;
      }
    >
  > = new Map();
})();

/**
 * @func 接口缓存，短时间内相同的请求会合并到同一个请求
 * @param durTime 缓存时间，单位ms
 */
export function componseRequest(task: Function, durTime = 1000) {
  store.tasks.set(task, new Map());
  return async (...args: any) => {
    const item = store.tasks.get(task);
    if (!item) return;
    const key = JSON.stringify(args);
    if (!item.get(key)) {
      item.set(key, {
        lastVisitTime: 0,
        execResult: null,
        durTime,
      });
    }
    const current = item.get(key);
    if (!current) return;
    if (Date.now() - current.lastVisitTime > current.durTime) {
      current.lastVisitTime = Date.now();
      current.execResult = task(...args).catch(() => {
        // 出错则清除
        current.lastVisitTime = 0;
        return new TypeError('error');
      });
    }
    return current.execResult;
  };
}
