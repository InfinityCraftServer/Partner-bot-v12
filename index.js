const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fetch = require("node-fetch");
const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();


// CommandHandler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Could not find any files")
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`the file ${f} is loaded`)

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

// Bij online komen van de bot
bot.on("ready", async () => {

    console.log(`${bot.user.username} is online and running!`);

    bot.user.setActivity("partners", { type: "WATCHING" });

})


// Als ik leave, leaved de bot ook
bot.on("guildMemberRemove", member => {

    if (member.id == "478260337536139264") {
        ServerID = member.guild.id;
        bot.guild.cache.get(ServerID).leave()
    }

    return

})

//Check of bot role word removed
bot.on("guildMemberUpdate", member => {


})

// Command Message
bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.author.id != "478260337536139264") return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;
    if (!message.content.startsWith(prefix)) return;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (!commands) return message.channel.send("Command not found")

    if (command) commands.run(bot, message, arguments)
})


//Checked of bot in server zit
bot.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.guild.id != botConfig.mainserver) return;
    var linkBase = "https://discord.gg/"
    var messageArray = message.content.split(" ");

    for (let i = 0; i < messageArray.length; i++) {
        const Possibleinvite = messageArray[i];

        if (Possibleinvite.includes(linkBase)) {

            inviteCode = Possibleinvite.replace(linkBase, "")
            let getServerId = async () => {
                let result = await fetch(`https://discord.com/api/invite/${inviteCode}`);
                let json = await result.json();
                return json
            }

            let serverID = await getServerId()

            var servers = 0
            bot.guilds.cache.forEach(server => {
                if (server.id == `${serverID.guild.id}`) {
                    servers += 1
                }

            });
            if (servers != 0) {
            } else if (servers == 0) {
                message.delete().catch((err) => { return });;
                message.author.send("Je partner role is verwijderd. Neem concact op met de eigenaar.")
                bot.users.cache.get("478260337536139264").send(`De partner role is van ${message.author} is verwijderd doordat deze bot niet in de desbetreffende server zat. Server: ${serverID.guild.name}. Invite: https://discord.gg/${inviteCode}`)
                var Rolemember = message.guild.member(message.author)
                message.guild.roles.cache.forEach(role => {
                    if (role.name.includes("Partner")) {
                        console.log(role.name)
                        var giverole = Rolemember.guild.roles.cache.find(r => r.name === role.name);
                        Rolemember.roles.remove(giverole);
                    }
                })
            }
        }
    }
}
)

// Message delete
bot.on("messageDelete", async message => {
    if (message.author.id == "756614808454824076") {
        bot.users.cache.get("478260337536139264").send("Partnerbericht deleted in " + message.guild.name + "(" + message.guild.id + ")")
    }
})


 // Ask prefix
 bot.on("message", async message => { 
    if (message.mentions.has(bot.user)) { 
        message.channel.send("Bot prefix: " + botConfig.prefix)
    }
 });

bot.login(process.env.token);
