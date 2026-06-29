export function withTimeout(promise, ms, label = '요청') {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} 시간 초과 (${ms / 1000}초)`)), ms);
    }),
  ]);
}
