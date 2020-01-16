import cluster from "cluster";
import os from "os";

export default () => {
  /**
   *  Storage array
   */
  const workers = [];

  /**
   *  Get # of CPUs
   */
  const cpuCount = os.cpus().length;

  /**
   *  Fork the process, the number of times we have CPUs available
   */
  for (let i = 0; i < cpuCount; i++) {
    const worker = cluster.fork();
    workers.push(worker);
  }

  /**
   *  Return workers
   */
  return workers;
};
