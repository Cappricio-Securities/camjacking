#!/usr/bin/env node
/**
 * CamJacking
 * CamJacking is a tool designed for use in human penetration testing tool. It is intended to simulate potential security threats by testing the negligence of people, and is used to identify weaknesses in an organization's security infrastructure. By using CamJacking, security professionals can gain a better understanding of their organization's potential risks and take proactive measures to improve their security posture.
 *
 * @author karthikeyan V (karthithehacker) <https://karthithehacker.com>
 */
//lib and includes section 
const express = require("express");
const app = express();
const fs = require("fs");
const help = require('./includes/help');
const bodyParser = require('body-parser');
const os = require("os");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
// get the home directory path
const homeDir = os.homedir();
const argv = yargs(hideBin(process.argv)).argv 

if( argv.h == true ){
   help.helpintro();
   help.helpmenu();
    return; 
}
var port
if(argv.p == null || argv.p == true ){
   
    if(argv.port == null || argv.port == true){
        help.helpintro();
        return; 
    }
}
if(argv.p){
    port = argv.p
    app.listen(argv.p);
    console.log()
}
if(argv.port){
    port = argv.port
    app.listen(argv.port);
    console.log()
}


fs.access(homeDir+"/camjacking", function (err) {
  if (err) {
    fs.mkdir(homeDir+"/camjacking", { recursive: true }, function (err) {
        if (err) throw err;
        });
  } else {
   
  }
});
help.helpintro();
console.log("URL=====> http://localhost:"+port)
app.set('view-engine','ejs');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(__dirname + '/Assets/'));
app.use(require('./includes/route'));
