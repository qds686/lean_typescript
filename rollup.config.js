import ts from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

console.log(ts)

// 构建__dirname __filename
// 当前文件的绝对路径
// C:\Users\Administrator\Desktop\TypeScript\rollup.config.js
// import.meta.url是file协议的路径
const __filename = fileURLToPath(import.meta.url);

// 当前文件所在的文件夹 绝对路径
// C:\Users\Admini strator\Desktop\TypeScript
const __dirname = dirname(__filename);

export default {
  // 入口
  input: resolve(__dirname, "src/index.ts"),
  // 出口
  output: {
    format: "iife",
    // 打包后的文件路径
    file: resolve(__dirname, "dist/bundle.js"),
    // 源码调试的功能，在tsconfig中也要更改为true，module改为ESNext
    sourcemap: true 
  },
  // 插件
  plugins: [
    // 解析扩展名
    nodeResolve({
      extensions: [".js", ".ts"]
    }),
    // 解析ts配置文件
    ts({
      tsconfig: resolve(__dirname, "tsconfig.json"),
    }),
    // 开启静态服务
    serve({
      port: 3000,
      openPage: "/public/index.html",
      // open: true
    })
  ]
}


