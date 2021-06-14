  /* eslint-disable no-var */
  /* eslint-disable max-len */
  import discord, { Role, TextChannel } from 'discord.js';
  import {discordToken} from './sensitive-infos.js';
  import nodeHtmlToImage from 'node-html-to-image';
  import jsdom from 'jsdom';
  const {JSDOM} = jsdom;
  import fs from 'fs';
  import { randomInt } from 'crypto';
  import { exit } from 'process';
  import { stringify } from 'querystring';

  const discordInviteLink = "https://discord.gg/Uc5vd4Hwr8"

  let staticData

  try{
    staticData = JSON.parse(fs.readFileSync("./logs/statics.json"));
    }

  catch{
    try{
      reqLogFile = fs.writeFileSync('./logs/statics.json', "",'utf8');}
    catch{
      console.log("warning : Cannot create statics.json")
      staticData = JSON.parse(fs.readFileSync("./logs/statics.json"));
    }
  }

  let reqLogFile

  try{
  reqLogFile = fs.readFileSync("./logs/req-log.txt", 'utf8')
  }

  catch{
    try{
      reqLogFile = fs.writeFileSync('./logs/req-log.txt', "USER REQUEST LOG",'utf8');}
    catch{
      console.log("warning : Cannot create ./logs/req-log.txt")
      fs.readFileSync("./logs/req-log.txt", 'utf8')
    }
  }

  const addContentToTxt = (file, newContent) => {
    fs.writeFileSync(file, reqLogFile + "\r\n" + newContent);
    reqLogFile = reqLogFile + "\r\n" + newContent;
  }

  let userAuthInfos = {}

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function makeRandomChar(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
  charactersLength)));
  }
  return result;
  }

  // Define Discord client

  const client = new discord.Client;

  // Ready notify for terminal

  client.on('ready', () => {
    console.log(`✅ Bot actived as ${client.user.tag} :3`);
  });

  const processNewVerify = (msg) => {const generateCodeImage = async (msg) => {
    const codeArray = makeRandomChar(6);
    const timeNow = new Date
    userAuthInfos[msg.author] = [codeArray.join(""), timeNow];
    // Import html

    const imageHtml = fs.readFileSync('random-code.html', 'utf-8');

    // Generate DOM & Document
    const dom = new JSDOM(imageHtml);
    const document = dom.window.document;
    

    const fiilInInfosToHtml = (randomText) => {
      // input code content and make disortation
      document.querySelector(".code-container").innerHTML =`
      <div class="code-char" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"><span>${randomText[0]}</span></div>
      <div class="code-char" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"><span>${randomText[1]}</span></div>
      <div class="code-char" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"><span>${randomText[2]}</span></div>
      <div class="code-char" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"><span>${randomText[3]}</span></div>
      <div class="code-char" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"><span>${randomText[4]}</span></div>
      <div class="code-char" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"><span>${randomText[5]}</span></div>
      `
      document.querySelector(".line-disort-container").innerHTML =`<div class="line" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"></div>
      <div class="line" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"></div>
      <div class="line" style="color:rgb(${getRandomInt(128,256)},${getRandomInt(128,256)},${getRandomInt(128,256)});
      transform: scale(${getRandomFloat(0.5,1.5)},${getRandomFloat(0.5,1.5)})
      rotate(${getRandomFloat(-0.1,0.1)}turn)
      skew(${randomInt(-20,20)}deg)"></div>`
      return document;
    };

    // Get innerHTML of Document

    const imageHtmlRef = fiilInInfosToHtml(codeArray);
    const htmlMarkups = imageHtmlRef.querySelector('html').innerHTML;

    // Convert HTML to an Image
    let image = await nodeHtmlToImage({
      html: htmlMarkups,
    });
    image = new discord.MessageAttachment(image, ';.png');
    msg.channel.send(`> 인증 문구를 ***확인 ABC123*** 와 같은 형태로 제출하십시오. ${msg.author}`);
    msg.channel.send({files: [image]});
    return codeArray
  }; generateCodeImage(msg)}

  // response at 인증시작

  client.on('message', async (msg)=>{
    if (msg.content === '인증시작') {
      staticData["newCodeReqCount"] = staticData["newCodeReqCount"] + 1
      fs.writeFileSync("./logs/statics.json", JSON.stringify(staticData));
      addContentToTxt("./logs/req-log.txt", "인증 이미지 요청 :"+msg.author)
      if(msg.author in userAuthInfos){ 
        if(userAuthInfos[msg.author][1].getTime()/ 1000 + 30 <= (new Date).getTime()/1000){
          msg.reply("잠시만 기다려주세요. 인증을 위한 이미지를 생성하고 있습니다")
          processNewVerify(msg)
        }
        else{
          msg.channel.send(":warning: 너무 자주 인증을 시도하고 있습니다. 1분 후 다시 시도하여 주십시오")
        }
      }
      else{
        msg.reply("잠시만 기다려주세요. 인증을 위한 이미지를 생성하고 있습니다")
        processNewVerify(msg)
      }
    }
  });

  client.on('message', async (msg)=>{
    if(msg.content.startsWith("확인 ")){
      staticData["verifyReqCount"] = staticData["verifyReqCount"] + 1
      fs.writeFileSync("./logs/statics.json", JSON.stringify(staticData));
      let userResponse = msg.content.split("")
      userResponse.splice(0,3)
      userResponse = userResponse.join('').toUpperCase()
      addContentToTxt("./logs/req-log.txt", "확인 요청 : " + userAuthInfos[msg.author] + msg.author)
      if(msg.author in userAuthInfos){
        if(userAuthInfos[msg.author][0] === userResponse){
          msg.channel.send("✅ 인증이 성공적으로 완료되었습니다")
          delete userAuthInfos[msg.author]
          try{msg.member.roles.add((await msg.guild.fetch()).roles.cache.find(Role => Role.name === "✅인증 완료").id)}
          catch{msg.guild.systemChannel.send(`⚠️경고 : 인증 완료 식별 전용 역할에 문제가 발생하였습니다. 관련 역할을 삭제하신 뒤 다시 봇을 재초대 해주십시오. 문제가 지속 될 경우 ${discordInviteLink}로 문의해주십시오`)}
        }
        else{
          msg.reply("❌ 인증을 완료할 수 없습니다. 코드를 다시 확인하십시오")
        }
      }
      else{
        msg.reply("❌ 인증을 완료할 수 없습니다. ***인증시작***을 이용하여 재시도하여 주십시오")
      }
      }
  })


  client.on("guildCreate", (guild) => {
    staticData["invitedGuildsCount"] = staticData["invitedGuildsCount"] + 1
    staticData["invitedGuildsCountTotal"] = staticData["invitedGuildsCountTotal"] + 1
    client.user.setActivity(`Captcha 인증 봇 | 정보 : https://t.ly/qqDw | ${staticData.invitedGuildsCount}개의 서버와 함께 하는 중`, {
      type: "PLAYING"
    });
    fs.writeFileSync("./logs/statics.json", JSON.stringify(staticData));
    if(guild.me.hasPermission("MANAGE_ROLES")){
      guild.roles.create({data:{name:"✅인증 완료", color:'GREEN'},reason:"인증받은 유저에 대한 구별"})
      guild.systemChannel.send(`✅인증 완료 역할이 생성되었습니다! 해당 역할에 대한 채널 접근 권환을 설정하실 차례입니다`)
    } 
    else{
      guild.systemChannel.send(`봇 필수 권환이 비활성화 되어 있습니다. 봇을 내보낸 뒤, 권환 부여를 체크하고 다시 초대하여 주십시오. 문제가 지속적으로 발생할 경우${discordInviteLink}로 문의해주십시오`)
    }
    
  })

  client.on("guildDelete", () => {
    staticData["invitedGuildsCount"] = staticData["invitedGuildsCount"] -1
    fs.writeFileSync("./logs/statics.json", JSON.stringify(staticData));

  })



  client.login(discordToken);
