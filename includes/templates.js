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



const { mainbanner } = require('./banner');
const { RED , RESET } = require('./const');
const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");
const { execSync } = require("child_process");
const { get } = require('http');

const TEMPLATE_REPO = "https://github.com/Cappricio-Securities/camjacking-templates.git";




function ensureTemplatesRepo() {
  const homeDir = os.homedir();
  const templatesPath = path.join(homeDir, "camjacking-templates");
  const tempPath = path.join(homeDir, "camjacking-templates-latest");

  if (!fs.existsSync(templatesPath)) {
    console.log("\n[+] Templates folder not found. Cloning fresh repo...");
    execSync(`git clone ${TEMPLATE_REPO} ${templatesPath}`, { stdio: "inherit" });
  } else {
    console.log("\n[+] Templates folder exists. Fetching latest templates...");

    // Remove old temp folder if exists
    if (fs.existsSync(tempPath)) {
      fs.rmSync(tempPath, { recursive: true, force: true });
    }

    // Clone latest repo to temp
    execSync(`git clone ${TEMPLATE_REPO} ${tempPath}`, { stdio: "inherit" });

    fs.readdirSync(tempPath).forEach((item) => {
      const src = path.join(tempPath, item);
      const dest = path.join(templatesPath, item);

      if (!fs.existsSync(dest)) {
        fs.cpSync(src, dest, { recursive: true });
        console.log(`[+] New template added: ${item}`);
      } else {
        console.log(`[!] Skipped existing template: ${item}`);
      }
    });

    fs.rmSync(tempPath, { recursive: true, force: true });
  }

  return templatesPath;
}

function getTemplates() {
  const templatesPath = ensureTemplatesRepo();

  return fs.readdirSync(templatesPath, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith(".")) // hides .git, .github, etc.
    .map(d => d.name);
}


function promptTemplateSelection(onSelect, onBack, onQuit) {
  const templates = getTemplates();
  const templatesPath = ensureTemplatesRepo();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("👉 Select a template: ", (choice) => {
    choice = choice.trim().toLowerCase();

    if (choice === "x") {
      rl.close();
      return onBack && onBack();
    }

    if (choice === "0") {
      rl.close();
      return onQuit && onQuit();
    }

    const index = parseInt(choice, 10) - 1;

    if (isNaN(index) || !templates[index]) {
      console.log("\n❌ Invalid selection. Try again.\n");
      rl.close();
      return promptTemplateSelection(onSelect, onBack, onQuit);
    }

    const selectedTemplate = templates[index];
    const fullPath = require("path").join(templatesPath, selectedTemplate);

    rl.close();
    onSelect(fullPath, selectedTemplate);
  });
}




function showTemplateMenuAndSelect(rl) {
  const templates = getTemplates();

  console.clear();
  mainbanner("v2.0");

  const labels = templates.concat(["❌ Previous Menu", "❌ Quit"]);
  const maxLen = Math.max(...labels.map(t => t.length), "Templates".length);
  const colWidth = maxLen + 2;

  const top = `┏━━━━━┳${"━".repeat(colWidth + 2)}┓`;
  const head = `┃ No. ┃ ${"Templates".padEnd(colWidth)} ┃`;
  const mid = `┡━━━━━╇${"━".repeat(colWidth + 2)}┩`;
  const bot = `└─────┴${"─".repeat(colWidth + 2)}┘`;

  console.log(`\n       ${RED}Select Template${RESET}`);
  console.log(top);
  console.log(head);
  console.log(mid);

  templates.forEach((tpl, i) => {
    const name = tpl.padEnd(colWidth);
    console.log(`│ ${RED}${String(i + 1).padEnd(3)}${RESET} │ ${name} │`);
  });

  console.log(`│ ${RED}x  ${RESET} │ ${"Previous Menu".padEnd(colWidth)} │`);
  console.log(`│ ${RED}0  ${RESET} │ ${"❌ Quit".padEnd(colWidth)}│`);
  console.log(bot);

  return new Promise((resolve) => {
    rl.question("\n👉 Select a template: ", (choice) => {
      choice = choice.trim().toLowerCase();

      if (choice === "x") return resolve({ action: "back" });
      if (choice === "0") process.exit(0);

      const index = parseInt(choice, 10) - 1;

      if (!templates[index]) {
        console.log("\n❌ Invalid selection. Try again.");
        return resolve({ action: "retry" });
      }

      const fullPath = path.join(os.homedir(), "camjacking-templates", templates[index]);

      resolve({
        action: "select",
        name: templates[index],
        path: fullPath
      });
    });
  });
}





module.exports = {
  getTemplates,
  showTemplateMenuAndSelect,
  promptTemplateSelection,
  ensureTemplatesRepo
};
