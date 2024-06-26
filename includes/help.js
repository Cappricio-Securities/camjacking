/**
 * CamJacking
 * CamJacking is a tool designed for use in human penetration testing tool. It is intended to simulate potential security threats by testing the negligence of people, and is used to identify weaknesses in an organization's security infrastructure. By using CamJacking, security professionals can gain a better understanding of their organization's potential risks and take proactive measures to improve their security posture.
 * 
 * Author: Karthikeyan V (karthithehacker) <https://karthithehacker.com>
 */

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const os = require('os');

module.exports = {
  helpmenu: function() {
    const argv = yargs(hideBin(process.argv))
      .usage('\n\n \x1b[30;1m$\x1b[0m \x1b[32;1mCamJacking \x1b[36;1m[option]\n\n \x1b[37;42;1mUsage:\x1b[0m $0 \x1b[33;1m[options]\x1b[30;1m')
      .version('1.0.1')
      .alias('version', 'V')
      .options({
        help: {
          alias: 'h',
          description: 'Show help',
          type: 'boolean',
        },
        port: {
          alias: 'p',
          description: 'Provide available port between 0 to 65536',
          type: 'number',
        },
      })
      .argv;


  },

  helpintro: function() {
    const username = os.userInfo().username;
    console.log("\n\n\x1b[36;1m👋 Hey \x1b[37;1m%s \x1b[36;1m\n", username);
    console.log(" .------------------------------.           ");
    console.log(" |  Tool   : \x1b[31mCamJacking\x1b[36;1m 📸      |           ");
    console.log(" |  Author : \x1b[32;1m@karthithehacker🎖️\x1b[36;1m  |           ");
    console.log(" |        \x1b[30mSelfi Time\x1b[30m\x1b[36;1m            |           ");
    console.log(" '------------------------------'           ");
    console.log("                 ^      (\\_/)    ");
    console.log("                 '----- (O.o)    ");
    console.log("                        (> <)    ");
  },
};
