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


const { showBanner } = require('./includes/banner');
const { createattack,showSelectTargetMenu ,resumeattack } = require('./includes/utils');   
const {sleep } = require('./includes/const');
const readline = require("readline");
const { startAdminServer } = require("./includes/admin");

if (process.stdin.isTTY) {
  process.stdin.setRawMode(false);
}
process.stdin.resume();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});
startAdminServer(5000);
function mainMenu() {
  showBanner("v2.0");

  rl.question("👉 Select an option: ", async (choice) => {
    choice = choice.trim();

    if (choice === "1") {
      rl.question("👉 Enter target name: ", async (name) => {
        await createattack(name.trim(), rl, mainMenu);

        
      });
    } 
    else if (choice === "2") {
      showSelectTargetMenu(
        rl,
        (target) => {
         resumeattack(target.name,target.template,target.uuid,target.datetime,rl,mainMenu);
        },
        () => {
          mainMenu(); // back
        }
      );
      
    } 
    else if (choice === "0") {
      rl.close();
      process.exit(0);
    }
    else {
      console.log("\n❌ Invalid choice.\n");
      mainMenu();
    }
  });
}

mainMenu();


