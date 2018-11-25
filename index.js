const botconfig = require("./botconfig.json");
const Discord = require("discord.js")

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("Fortnight: Bot Royale", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}report`) {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.send("User was not listed or not found.");
        let reason = args.join(" ").slice(22);
        

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Report")
        .setColor("#ff6a00")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("In Channel", `${message.channel}`)
        .addField("Reported On/At", `${message.createdAt}`)
        .addField("Reported Because", reason);

        let channel1 = message.guild.channels.find(`name`, "reports");
            if (!channel1) {
                message.channel.send("Could not find reports channel, report was canceled.");
            }
        
        message.delete().catch(O_o=>{});
        channel1.send(reportEmbed);

        return;
    }

    if(cmd === `${prefix}hello`){
        return message.channel.send("Hoi!");
    }
    if(cmd === `${prefix}binfo`){
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#ff6a00")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Bot Creator", "ABotcadeDev/ABitcadeDev/Bitcade")

        .addField("Date Created", bot.user.createdAt)
        .addField("Version", botconfig.version);

        return message.channel.send(botembed);
    }
    if(cmd === `${prefix}cmds`){
        let cmdembed = new Discord.RichEmbed()
        .setDescription("Bot Commands")
        .setColor("#ff6a00")
        .addField("Command Prefix", "bb.")
        .addField("More About Me", "bb.binfo")
        .addField("My Commands", "bb.cmds")
        .addField("About This Server", "bb.sinfo");
        return message.channel.send(cmdembed);
    }
    if(cmd === `${prefix}sinfo`){
        let sicon = message.guild.iconURL;
        let sinfo = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#ff6a00")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Server ID", message.guild.id)
        .addField("Owner", message.guild.owner + `with ID: ${message.guild.ownerID}`)
        .addField("Roles", message.guild.roles.toString())
        .addField("Region", message.guild.region)
        .addField("Verification Level", message.guild.verificationLevel)
        .addField("Date Created", message.guild.createdAt)
        .addField("Date You Joined", message.member.joinedAt)
        .addField("Members", message.guild.memberCount)
        .addField("AFK Voice Channel", message.guild.afkChannel + ` with ID: ${message.guild.afkChannelID}`)
        .addField("Default Role", message.guild.defaultRole);


        return message.channel.send(sinfo);
    }
    if(cmd === `${prefix}report`){
        let
    }
    if(cmd === `${prefix}ping`){
        let msgping1 = new Date();

    let botping = new Date() - message.createdAt;

    let msgping2 = new Date() - msgping1;

    let pingembed = new Discord.RichEmbed()
        .setColor("#ff6a00")
        .addField('API Ping : ', Math.floor(bot.ping) + 'ms')
        .addField('Bot Ping : ', Math.floor(botping) + 'ms')
        .addField('Message Ping : ', '~' + Math.round(msgping2) + 'ms')
        .setTimestamp(new Date())
        .setFooter("requested by " + `${message.author.tag}`);


    return message.channel.send(pingembed);
    }

    if(cmd === `${prefix}kick`){
        
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) return message.channel.send("User not listed or not found.");
        let kReason = args.join(" ").slice(22);

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Member Kicked")
        .setColor("#ff6a00")
        .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
        .addField("Kicked By", `${message.author} with ID: ${message.author.id}`)
        .addField("Time Kicked", message.createdAt)
        .addField("Kicked Because", kReason);

        let kickChannel = message.guild.channels.find(`name`, "join-leave-kick-ban")

        message.channel.send(kickEmbed);
    
    }
});

bot.login(process.env.bottoken);