const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const ChannelID = require("../data/channelid.json");


exports.run = (bot, message, arguments) => {

    if (message.guild.id != botConfig.mainserver) {

        message.reply("Je kunt dit commando alleen in je eigen server doen!")
    } else {

        bot.guilds.cache.forEach(server => {
            var ServerID = server.id;
            if (!ChannelID[ServerID]) {
                if (server.id != botConfig.mainserver) {
                    message.reply(server.name + "(" + server.id + ")" + " heeft nog geen partnerkanaal")
                    return
                }
            } else {
                var botEmbed = new discord.MessageEmbed()
                .setTitle('```InfinityCraft Partners```')
                .setColor("#FF0000")
                .addField("\u200B", "***GROTE RESTART***")
                .addField("\u200B", "**Gamemodes in de maak:** \n :pushpin: *UHC met custom concepten!* \n :pushpin: *FlagWars (Custom concept)* \n:pushpin: *Skybase Royale*")
                .addField("\u200B", "***Wat zoeken wij?*** \n :speech_left: **Community Management** *(Voorbeeld van de community. Helpt met het verwerken van suggesties)* \n :bulb: **Gamemode Management** *(Behandelen specifieke gamemodes. Dit begint al bij het contact met de developers over features en/of bugs)*\n :tickets: **Global staff** *(Houden de serversclean en netjes. Dit houd  zijn normale Trainees t/m Senior Administrator)* \n :desktop: **Developers** *(De backbone van de server. Zorgen voor het creëren van gamemodes en het onderhouden van de gamemodes)* \n :desktop: **Developers** *(De backbone van de server. Zorgen voor het creëren van gamemodes en het onderhouden van de gamemodes)* \n :video_camera: **Content Creators** *(Met ons custom Creator Programma, hebben youtubers enkele voordelen! Voor meer informatie, join onze discord!)*")
                .addField("\u200B", "***Community gamemodes*** \n  *Met een goed idee, een doorzettingsvermogen en na een formulier te hebben ingevuld, kun je een Gamemode Manager worden!* \n     *Als Gamemode Manager heb jij je eigen server binnen InfinityCraft. Je hoeft hier zelf weinig tot niets voor te doen!* \n     *Bedenkt zelf je gamemode, zelf je updates, en maak je niet druk om de technische dingen!*")
                .addField("\u200B", "***Informatie*** \n  Discord: https://discord.gg/huQqXVG \n     Website: InfinityCraft.nl *(In development.)* \n  Email: Staff.infinitycraft.mc@gmail.com")

                .setFooter("InfinityCraft partnerbot. Copyright 2020")

               
                bot.channels.cache.get(ChannelID[ServerID].reclameKanaalId).send(botEmbed).catch((err) => { message.reply(`\n***Message failled to send***\n**Servernaam:** *${server.name}*\n**ServerId:** *${server.id}*`)});
                


                

            }
        
        });
    }


}
module.exports.help = {
    name: "sendad",

}
