var Discord = require("discord.js");
var request = require("request");
var bot = new Discord.Client();

function requestContent(size, cb) {
    request("https://talk-to-obama.herokuapp.com/chat?size=" + size, function(error, response, body) {
        return cb(JSON.parse(body).content)
    });
}

bot.on("message", msg => {

    let prefix = "!";

    if (!msg.content.startsWith(prefix)) return;

    if (msg.author.bot) return;



    else if (msg.content.startsWith(prefix + "obama tweet")) {
        //request("https://talk-to-obama.herokuapp.com/chat", function(error, response, body) {
        //    msg.channel.sendMessage(JSON.parse(body).content)
        //});
        requestContent("tweet", content => {
            msg.channel.sendMessage(content)
        });
    }

    else if (msg.content.length > 7) {
        if (Number(msg.content.substring(7, msg.content.length)) != NaN) {
            //request("https://talk-to-obama.herokuapp.com/chat?size=" + Number(msg.content.substring(7, msg.content.length)), function(error, response, body) {
            //    msg.channel.sendMessage(JSON.parse(body).content)
            //});
            //msg.channel.sendMessage(requestContent(Number(msg.content.substring(7, msg.content.length))));
            requestContent(Number(msg.content.substring(7, msg.content.length)), content => {
                msg.channel.sendMessage(content)
            });
        } else {
            //request("https://talk-to-obama.herokuapp.com/chat", function(error, response, body) {
            //    msg.channel.sendMessage(JSON.parse(body).content)
            //});
            requestContent("", content => {
                msg.channel.sendMessage(content)
            });

        }
    }

    else if (msg.content.startsWith(prefix + "obama")) {
        //request("https://talk-to-obama.herokuapp.com/chat", function(error, response, body) {
        //    msg.channel.sendMessage(JSON.parse(body).content)
        //});
        requestContent("", content => {
            msg.channel.sendMessage(content)
        });
    }


});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("");
