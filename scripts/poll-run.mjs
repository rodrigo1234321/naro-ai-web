import { spawn } from "node:child_process";
import fs from "node:fs";

const OD_EXE = "C:\\Users\\rodri\\AppData\\Local\\Programs\\Open Design\\Open Design.exe";
const OD_CLI = "C:\\Users\\rodri\\AppData\\Local\\Programs\\Open Design\\resources\\app\\prebundled\\daemon\\daemon-cli.mjs";
const OD_DATA_DIR = "C:\\Users\\rodri\\AppData\\Roaming\\Open Design\\namespaces\\release-stable-win\\data";
const OD_PIPE = "\\\\.\\pipe\\open-design-release-stable-win-daemon";

const child = spawn(OD_EXE, [OD_CLI, "mcp"], {
  env: { ...process.env, OD_DATA_DIR, OD_SIDECAR_IPC_PATH: OD_PIPE, OD_MCP_BOOTSTRAP_COMMAND: OD_EXE, OD_MCP_BOOTSTRAP_ARGS: "--headless", ELECTRON_RUN_AS_NODE: "1" },
  stdio: ["pipe", "pipe", "pipe"],
});

let buf = "";
const pending = new Map();
function send(msg) { child.stdin.write(JSON.stringify(msg) + "\n"); }
child.stdout.on("data", (chunk) => {
  buf += chunk.toString("utf8");
  let idx;
  while ((idx = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  }
});
child.stderr.on("data", () => {});
const call = (msg, ms = 120000) => new Promise((res, rej) => { pending.set(msg.id, res); send(msg); setTimeout(() => { if (pending.has(msg.id)) { pending.delete(msg.id); rej(new Error("timeout")); } }, ms); });

let id = 0;
async function main() {
  await call({ jsonrpc: "2.0", id: ++id, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "poll-bridge", version: "1.0.0" } } });
  send({ jsonrpc: "2.0", method: "notifications/initialized" });
  const res = await call({ jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name: "get_run", arguments: JSON.parse(fs.readFileSync("scripts/tmp/od-poll.json", "utf8")) } });
  const text = (res.result?.content || []).map((c) => c.text || "").join("\n");
  const run = JSON.parse(text);
  const status = run.status;
  let extra = "";
  if (status === "succeeded" && run.artifactRef) extra = ` | artifact: ${run.artifactRef}`;
  if (status === "failed") extra = ` | error: ${run.errorCode || run.error}`;
  console.log(JSON.stringify({ status, updatedAt: run.updatedAt, elapsed: (Date.now() - run.createdAt) / 1000, artifactRef: run.artifactRef || null, entryFile: run.deliverableEntryFile || null, exit: run.exitCode, extra }));
  child.kill();
  process.exit(0);
}
main().catch((e) => { console.error("ERR:", e.message); child.kill(); process.exit(1); });