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
        requestContent("tweet", content => {
            msg.channel.sendMessage(content)
        });
    }

    else if (msg.content.length > 7) {
        num = Number(msg.content.substring(7, msg.content.length));
        if (num != NaN && num <= 17) {
            requestContent(Number(msg.content.substring(7, msg.content.length)), content => {
                msg.channel.sendMessage(content)
            });
        } else {
            requestContent("", content => {
                msg.channel.sendMessage(content)
            });

        }
    }

    else if (msg.content.startsWith(prefix + "obama")) {
        requestContent("", content => {
            msg.channel.sendMessage(content)
        });
    }

});

bot.on('ready', () => {
  console.log('I am ready!');
});

var KEY = process.env.KEY || require('./config')

bot.login(KEY);
