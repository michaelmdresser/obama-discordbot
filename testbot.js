var Discord = require("discord.js");
var request = require("request");
var bot = new Discord.Client();

bot.on("message", msg => {

    let prefix = "!";

    if (!msg.content.startsWith(prefix)) return;

    if (msg.author.bot) return;

    else if (msg.content.startsWith(prefix + "obama")) {
        request("https://talk-to-obama.herokuapp.com/chat", function(error, response, body) {
            //console.log(body);
            //console.log(JSON.parse(body).content)
            msg.channel.sendMessage(JSON.parse(body).content)
        });
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("");
