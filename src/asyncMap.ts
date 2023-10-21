export const asyncMap = <T, U>(
  target: Array<T>,
  callback: (value: T) => U | Promise<U>,
  limit: number
): Promise<U[]> => {
  return new Promise((resolve) => {
    const results = Array.from(Array(target.length));
    const targetQueue: [T, number][] = target.map((value, index) => [
      value,
      index,
    ]);

    const fireCallback = () => {
      const next = targetQueue.shift();
      if (!next) {
        resolve(results);
        return;
      }

      const [nextValue, nextIndex] = next;
      Promise.resolve(callback(nextValue)).then((result) => {
        results[nextIndex] = result;

        fireCallback();
      });
    };

    for (let i = 0; i < limit && i < target.length; i++) {
      fireCallback();
    }
  });
};
