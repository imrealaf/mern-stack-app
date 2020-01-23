import { Application } from "express";

/* tslint:disable */
import env from "../lib/env";

env.init();

import { initApp } from "../app";
import { tests } from "./";
/* tslint:enable */

const app: Application = initApp();

tests.forEach((test: any) => {
  test(app);
});
