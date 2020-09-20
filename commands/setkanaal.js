const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const reclameid = require("../data/channelid.json");
const ChannelID = require("../data/channelid.json");
const fs = require("fs");

exports.run = (bot, message, arguments) => {

    if (message.author.id = "478260337536139264"){
        

            serverID = message.guild.id;

            if(!reclameid[serverID]){
                reclameid[serverID] = {
                reclameKanaalId: 0
                }
            }
            reclameid[serverID].reclameKanaalId = arguments[0];


            fs.writeFile("./data/channelid.json", JSON.stringify(reclameid), err =>{
                if(err) {console.log(err)
                message.reply("Something went wrong")} else {
                    var thisserverchannel = ChannelID[serverID].reclameKanaalId;
                    var ChannelMade = new discord.MessageEmbed()
                    .setTitle("Success")
                    .setColor("#00FF00")
                    .addField("**Partnerkanaal:**", `*${message.guild.channels.cache.get(thisserverchannel).toString()}(${thisserverchannel})*`)
                    .setFooter("InfinityCraft partnerbot. Copyright 2020")
                    message.reply(ChannelMade)
                }
            });
            

    }


}
module.exports.help = {
    name: "setkanaal",

}
