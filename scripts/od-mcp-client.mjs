import { spawn } from "node:child_process";
import fs from "node:fs";

const OD_EXE = "C:\\Users\\rodri\\AppData\\Local\\Programs\\Open Design\\Open Design.exe";
const OD_CLI = "C:\\Users\\rodri\\AppData\\Local\\Programs\\Open Design\\resources\\app\\prebundled\\daemon\\daemon-cli.mjs";
const OD_DATA_DIR = "C:\\Users\\rodri\\AppData\\Roaming\\Open Design\\namespaces\\release-stable-win\\data";
const OD_PIPE = "\\\\.\\pipe\\open-design-release-stable-win-daemon";

const [,, toolName, argsJson] = process.argv;
let args = {};
if (argsJson) {
  if (argsJson.startsWith("@")) {
    args = JSON.parse(fs.readFileSync(argsJson.slice(1), "utf8"));
  } else {
    try {
      args = JSON.parse(argsJson);
    } catch {
      args = { _raw: argsJson };
    }
  }
}

const child = spawn(OD_EXE, [OD_CLI, "mcp"], {
  env: {
    ...process.env,
    OD_DATA_DIR,
    OD_SIDECAR_IPC_PATH: OD_PIPE,
    OD_MCP_BOOTSTRAP_COMMAND: OD_EXE,
    OD_MCP_BOOTSTRAP_ARGS: "--headless",
    ELECTRON_RUN_AS_NODE: "1",
  },
  stdio: ["pipe", "pipe", "pipe"],
});

let buf = "";
const pending = new Map();

function send(msg) {
  child.stdin.write(JSON.stringify(msg) + "\n");
}

child.stdout.on("data", (chunk) => {
  buf += chunk.toString("utf8");
  let idx;
  while ((idx = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
    if (msg.id === 999) {
      child.kill();
      process.exit(0);
    }
  }
});

child.stderr.on("data", (chunk) => {
  const txt = chunk.toString("utf8");
  if (!txt.includes("GPU") && !txt.includes("gpu")) process.stderr.write("[daemon] " + txt);
});

const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("timeout waiting for " + toolName)), ms));

function call(msg, timeoutMs = 600000) {
  return new Promise((res, rej) => {
    pending.set(msg.id, res);
    send(msg);
    setTimeout(() => { if (pending.has(msg.id)) { pending.delete(msg.id); rej(new Error("timeout")); } }, timeoutMs);
  });
}

let id = 0;
async function main() {
  const init = await call({ jsonrpc: "2.0", id: ++id, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "opencode-bridge", version: "1.0.0" } } });
  send({ jsonrpc: "2.0", method: "notifications/initialized" });

  if (toolName === "list") {
    const res = await call({ jsonrpc: "2.0", id: ++id, method: "tools/list" });
    console.log(JSON.stringify(res, null, 2));
  } else {
    const res = await call({ jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name: toolName, arguments: args } });
    const content = (res.result?.content || []).map((c) => c.text || "").join("\n");
    if (res.result?.isError) {
      process.stderr.write("[error] " + content + "\n");
      child.kill();
      process.exit(1);
    }
    console.log(content);
  }
  child.stdin.end();
  child.kill();
  setTimeout(() => process.exit(0), 400);
}

main().catch((e) => { process.stderr.write("ERR: " + e.message + "\n"); child.kill(); setTimeout(() => process.exit(1), 400); });
