const fs = require("fs-extra");

const src = "./src/defaults.ts";
const dist = "./client/src";

const copyDefaults = async () => {
  try {
    await fs.copy(src, dist);
    console.log("Default settings copied to client");
  } catch (error) {
    console.error(error);
  }
};

copyDefaults();
