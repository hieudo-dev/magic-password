import { asyncMap } from "./asyncMap";

describe("asyncMap", () => {
  it("should return the results from executing the callbacks in order", async () => {
    const input = [3.14, "Hello world", true, { foo: "bar" }];
    const result = await asyncMap(input, (v) => v, 1);
    expect(result).toEqual(input);
  });

  it("should not execute more times than the limit", async () => {
    const input = [1, 2, 3, 4, 5];
    const isExecuted: Record<number, boolean> = {};

    Promise.resolve(
      asyncMap(
        input,
        (time) => {
          return new Promise((resolve) => {
            isExecuted[time] = true;
            setTimeout(() => {
              resolve(time);
            }, time * 100);
          });
        },
        2
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(isExecuted[3]).toBe(true);
    expect(isExecuted[4]).not.toBe(true);
  });

  it("should maximize the executions of the callback based on the limit", async () => {
    const input = [1, 6, 3, 2];
    let isDone = false;

    asyncMap(
      input,
      (time) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(time);
          }, time * 100);
        });
      },
      2
    ).then(() => {
      isDone = true;
    });

    await new Promise((resolve) => setTimeout(resolve, 650));
    expect(isDone).toBe(true);
  });
});
