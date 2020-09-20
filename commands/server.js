const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const ChannelID = require("../data/channelid.json");
const fs = require("fs")

exports.run = (bot, message, arguments) => {
    var serverID = message.guild.id;
    var thisserverchannel = ChannelID[serverID].reclameKanaalId;


    var ServerInfo = new discord.MessageEmbed()
    .setTitle("***InfinityCraft Partnership***")
    .setColor("#0000FF")
    .addField("**Server naam:**", `*${message.guild.name}*`)
    .addField("**Partnerkanaal:**", `*${message.guild.channels.cache.get(thisserverchannel).toString()}(${thisserverchannel})*`)
    .addField("Eigenaar:", message.guild.owner)
    .setFooter("InfinityCraft partnerbot. Copyright 2020")




   
    // message.reply(`\nServernaam: ${message.guild.name} \n Partnerchannel: ${message.guild.channels.cache.get(thisserverchannel).toString()}`);

    message.reply(ServerInfo)

}
module.exports.help = {
    name: "server",

}
