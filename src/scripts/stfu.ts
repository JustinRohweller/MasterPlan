// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const stfu = () => {
  const codeToObscure = /cycle.push\(cycle\[0\]\);(\s.*){5}/gim;
  // IF using yarn/npm
  const problemFilePath =
    "./node_modules/metro-runtime/src/polyfills/require.js";

  // if using pnpm
  // const problemFilePath = "./node_modules/.pnpm/metro-runtime@0.64.0/node_modules/metro-runtime/src/polyfills/require.js"
  //   "./node_modules/metro-runtime/src/polyfills/require.js";
  const problemFileContent = fs.readFileSync(problemFilePath, "utf8");
  fs.writeFileSync(
    problemFilePath,
    problemFileContent.replace(
      codeToObscure,
      "// no cycle warning removed by stfu.js script"
    ),
    "utf8"
  );
};

stfu();
