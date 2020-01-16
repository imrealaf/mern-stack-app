import cluster from "cluster";

import { initApp } from "./app";
import initWorkerProcesses from "./workers";

/**
 *  Production mode: implement clustering
 */
if (process.env.NODE_ENV === "production") {
  if (cluster.isMaster) {
    initWorkerProcesses();
  } else {
    initApp();
  }

  // On exit handler ..
  cluster.on("exit", worker => {
    console.log("mayday! mayday! worker", worker.id, " is no more!");
    cluster.fork();
  });

  /**
   *  Development mode: no clustering
   */
} else {
  initApp();
}
