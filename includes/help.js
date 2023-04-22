/**
 * CamJacking
 * CamJacking is a tool designed for use in human penetration testing tool. It is intended to simulate potential security threats by testing the negligence of people, and is used to identify weaknesses in an organization's security infrastructure. By using CamJacking, security professionals can gain a better understanding of their organization's potential risks and take proactive measures to improve their security posture.
 *
 * @author karthikeyan V (karthithehacker) <https://karthithehacker.com>
 */
//lib and includes section 
const { boolean } = require("yargs");
//lib and includes section 
require("os").userInfo().username
module.exports = {
    helpmenu: function() {
       var argv = require('yargs/yargs')(process.argv.slice(2))
          .usage('\n\n \x1b[30;1m$\x1b[0m \x1b[32;1mCamJacking \x1b[36;1m[option]\n\n \x1b[37;42;1mUsage:\x1b[0m $0 \x1b[33;1m[options]\x1b[30;1m')
          .version('version', '1.0.1').alias('version', 'V')
          .options({
            help: {
              alias: 'h',
              description: "Show help",
              requiresArg: true,
              required: false
            },
            
            port: {
              alias: 'p',
              description: "Provide availabe port between 0 to 65536",
              requiresArg: true,
              required: false
            }
          })
          .argv;
        console.log('Inspecting options');
        console.dir(argv);
        console.log("input:", argv.input);
        console.log("output:", argv.output);
    },
     helpintro: function() {
cyan='\e[1;36m%s\e[0m\n'
console.log("  \n\n\x1b[36;1m👋 Hey \x1b[37;1m"+require("os").userInfo().username+" \x1b[36;1m\n");
console.log(" .-----------------------------.           ");
console.log(" |  Tool   : \x1b[31mCamJacking\x1b[36;1m 📸     |           ");
console.log(" |  Author : \x1b[32;1m@karthithehacker🎖️\x1b[36;1m |           ");
console.log(" |        \x1b[30mSelfi Time\x1b[30m\x1b[36;1m           |           ");
console.log(" '-----------------------------'           ");
console.log("                 ^      (\\_/)    ");
console.log("                 '----- (O.o)    ");
console.log("                        (> <)    ");

     }
};