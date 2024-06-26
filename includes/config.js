#!/usr/bin/env node
/**
 * CamJacking
 * CamJacking is a tool designed for use in human penetration testing tool. It is intended to simulate potential security threats by testing the negligence of people, and is used to identify weaknesses in an organization's security infrastructure. By using CamJacking, security professionals can gain a better understanding of their organization's potential risks and take proactive measures to improve their security posture.
 *
 * @author karthikeyan V (karthithehacker) <https://karthithehacker.com>
 */
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
const os = require('os');

// Mocking the const module for the config path
const constData = {
    config_path: '~/.config/cappriciosec-tools/cappriciosec.yaml'
};

function expandUserPath(userPath) {
    if (userPath.startsWith('~')) {
        return path.join(os.homedir(), userPath.slice(1));
    }
    return userPath;
}

async function newChatId(chatid) {
    const yamlFilePath = expandUserPath(constData.config_path);
    const folderPath = path.dirname(yamlFilePath);
    
    await fs.ensureDir(folderPath);

    if (!await fs.pathExists(yamlFilePath)) {
        const initialContent = { config: { chatid: chatid } };
        await fs.writeFile(yamlFilePath, yaml.dump(initialContent, { noCompatMode: true }));
        console.log(`Config file created at: ${yamlFilePath}`);
    } else {
        const data = yaml.load(await fs.readFile(yamlFilePath, 'utf8'));

        if (data.config && data.config.chatid) {
            console.log(`chatid is already present: ${data.config.chatid}`);
        } else {
            data.config = data.config || {};
            data.config.chatid = chatid;
            await fs.writeFile(yamlFilePath, yaml.dump(data, { noCompatMode: true }));
            console.log(`chatid appended to YAML file: ${yamlFilePath}`);
        }
    }
}

async function checkId() {
    const yamlFilePath = expandUserPath(constData.config_path);
    try {
        const data = yaml.load(await fs.readFile(yamlFilePath, 'utf8'));
        if (data.config && data.config.chatid) {
            return 'Exist';
        } else {
            return 'Null';
        }
    } catch (err) {
        console.error(err);
        return 'Null';
    }
}

async function getChatId() {
    const yamlFilePath = expandUserPath(constData.config_path);
    try {
        const data = yaml.load(await fs.readFile(yamlFilePath, 'utf8'));
        if (data.config && data.config.chatid) {
            return data.config.chatid;
        } else {
            return 'Null';
        }
    } catch (err) {
        console.error(err);
        return 'Null';
    }
}

module.exports = {
    newChatId,
    checkId,
    getChatId
};
