const { parentPort, workerData } = require("worker_threads");
const perforHeavyTask = (it) => {
  let result = 0;
  for (let i = 0; i < it; i++) {
    result += i;
  }
  return result;
};

const result = perforHeavyTask(workerData.it);
parentPort.postMessage(result);
