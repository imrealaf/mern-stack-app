const fs = require("fs-extra");

const srcDir = "./client/build";
const distDir = "./dist/public";

const moveFiles = async () => {
  try {
    await fs.emptyDir(distDir);
    console.log("Public folder cleaned..");

    await fs.copy(srcDir, distDir);
    console.log("Client build files copied");
  } catch (error) {
    console.error(error);
  }
};

moveFiles();
