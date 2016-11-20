var Discord = require("discord.js");
var request = require("request");
var bot = new Discord.Client();

bot.on("message", msg => {

    let prefix = "!";

    if (!msg.content.startsWith(prefix)) return;

    if (msg.author.bot) return;



    else if (msg.content.startsWith(prefix + "obama tweet")) {
        request("https://talk-to-obama.herokuapp.com/chat", function(error, response, body) {
            msg.channel.sendMessage(JSON.parse(body).content)
        });
    }

    else if (msg.content.length > 7) {
        if (Number(msg.content.substring(7, msg.content.length)) != NaN) {
            request("https://talk-to-obama.herokuapp.com/chat?size=" + Number(msg.content.substring(7, msg.content.length)), function(error, response, body) {
                msg.channel.sendMessage(JSON.parse(body).content)
            });
        } else {
            request("https://talk-to-obama.herokuapp.com/chat", function(error, response, body) {
                msg.channel.sendMessage(JSON.parse(body).content)
            });
        }
    }

    else if (msg.content.startsWith(prefix + "obama")) {
        request("https://talk-to-obama.herokuapp.com/chat", function(error, response, body) {
            msg.channel.sendMessage(JSON.parse(body).content)
        });
    }


});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("");
