const Discord = require('discord.js')
const client = new Discord.Client()

//const mongoose = require('mongoose')

const superagent = require('superagent')

/* mongoose.connect("",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
    const userSchema = new mongoose.Schema({
        discord_id: String,
        twitter_id: String
    });

    const User = mongoose.model('user', userSchema);
*/

const _token = " TOKEN DU BOT "
const chanlid = " ID DU CHANNEL OÙ LES MEMBRES POSTENT LEURS SUCCESS "

const twitter_usrname = "bxsic-fr"

client.on("ready", function() {
    console.log("Usr : " + client.user.username)
})

client.on("message", function(msg){

    if(msg.channel.id == chanlid){

        //let doc = await User.find({discord_id:message.author.id})

        let Attachments = (msg.attachments).array();
        
        if(!Attachments) return;

        let imgurl = Attachments[0];

        let twitter_msg = "Nouveau succès par @" + msg.author.username + " ! Ça chauffe 🔥\n@" + twitter_usrname

        // En dessous, on retrouve des paramètres comme : 
        // oauth consumer key
        // oauth consumer secret
        // etc.. et ces infos peuvent être trouvé lorsque le compte est passé en mode développeur
        // liens importants :
        // https://developer.twitter.com/en/apps
        // https://developer.twitter.com/en/docs/basics/authentication/overview/application-only

        superagent
            .post('https://api.twitter.com/1.1/statuses/update.json')
            .send({ status: twitter_msg, attachment_url: imgurl})
            .set('Authorization', 'Bearer XXX') // Rajouter le bearer token
            .set('oauth_consumer_key', "XXX")
            .set('oauth_consumer_secret', "XXX")
            .set('oauth_token', 'XXX')
            .set('oauth_token_secret', 'XXX')
            .end((err, res) => {
                msg.reply("Success publié ! ")
                console.log(res.text)
            });

    }
});

client.login(_token)
