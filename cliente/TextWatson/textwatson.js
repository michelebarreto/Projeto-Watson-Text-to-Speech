const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: '<2ypYmHsCfZJfQDFctDO7XBv3Iyob3ox0xCfdf_8XWlUM>' }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/a5fa1afa-72ee-4b3b-86db-6bf2d78717d4'
});

const params = {
  text: 'Hello from IBM Watson',
  voice: "pt-BR_IsabelaVoice",
  accept: 'audio/wav'
};


textToSpeech
  .synthesize(params)
  .then(response => {
    const audio = response.result;
    return textToSpeech.repairWavHeaderStream(audio);
  })
  .then(repairedFile => {
    fs.writeFileSync('audio.wav', repairedFile);
    console.log('audio.wav written with a corrected wav header');
  })
  .catch(err => {
    console.log(err);
  });



textToSpeech.synthesizeUsingWebSocket(params);
// eslint-disable-next-line no-undef
synthStream.pipe(fs.createWriteStream('./audio.wav'));
