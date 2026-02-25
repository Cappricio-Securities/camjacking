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


// banner.js

const RED = "\x1b[31m";
const ORANGE = "\x1b[38;5;208m";
const CYAN = "\x1b[36m";
const PURPLE = "\x1b[35m";
const RESET = "\x1b[0m";



function mainbanner(version = "v2.0") {
  console.clear();

  const banner = `
                                                                         ${version}
${ORANGE}
 ██████╗ █████╗ ███╗   ███╗     ██╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗ 
██╔════╝██╔══██╗████╗ ████║     ██║██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝ 
██║     ███████║██╔████╔██║     ██║███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║╚██╔╝██║██   ██║██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║██║ ╚═╝ ██║╚█████╔╝██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
                                                    ${RESET}     Author: @karthithehacker
                                                         Website: karthithehacker.com
   
`;

console.log(banner);

}


function showBanner(version = "v2.0") {
  console.clear();

  const banner = `
                                                                         ${version}
${ORANGE}
 ██████╗ █████╗ ███╗   ███╗     ██╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗ 
██╔════╝██╔══██╗████╗ ████║     ██║██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝ 
██║     ███████║██╔████╔██║     ██║███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║╚██╔╝██║██   ██║██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║██║ ╚═╝ ██║╚█████╔╝██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
                                                    ${RESET}     Author: @karthithehacker
                                                         Website: karthithehacker.com

       ${RED}     Main Menu             
${RESET}┏━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━┓
${RESET}┃ No. ┃ Option                   ┃
${RESET}┡━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━┩
${RESET}│${RED} 1   ${RESET}│🎯 Create new Target  ${RESET}    │
${RESET}│${RED} 2   ${RESET}│📂 Select Existing Target │
${RESET}│${RED} 0  ${RESET} │❌ Quit                   │
${RESET}└─────┴──────────────────────────┘
`;

  console.log(banner);
}

module.exports = {
  showBanner,
  mainbanner
};
