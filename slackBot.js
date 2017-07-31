var Botkit = require('botkit');

function message(msg, callback) {
  let controller = Botkit.slackbot({
    debug: false,
    log: false
  });

  var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
  })

  bot.startRTM(function(err,bot) {
    if (err) {
      console.log(err);
      return;
    }
    bot.say(
      {
        text: msg,
        channel: process.env.SLACK_CHANNEL || "general"
      }
    );

    callback("done");
  });

  setTimeout(bot.destroy.bind(bot), 5000);
}

exports.message = message;