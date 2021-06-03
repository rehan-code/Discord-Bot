require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('ShadowBot online!');

    const channel = member.guild.channels.cache.find(ch => ch.name === 'the-logs');
    if (!channel) return;

    channel.send(`The ShadowBot has Awakened`);
});

//welcome message
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'the-logs');
    if (!channel) return;

    channel.send(`Welcome to the server, ${member}`);
});

//
client.on('message', message => {
    if (!message.guild) return;

    if (message.content === '-ping') {
        message.channel.send('stop it! or I will pong you.');

        // If the message content starts with "-kick"
    } else if (message.content.startsWith('-kick')) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                /**
                 * Kick the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 */
                member
                    .kick('Due to you being stupid')
                    .then(() => {
                        // We let the message author know we were able to kick the person
                        message.reply(`Successfully kicked ${user.tag}`);
                    })
                    .catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to kick the member,
                        // either due to missing permissions or role hierarchy
                        message.reply('I was unable to kick the member');
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this guild!");
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    }
});


client.login(process.env.DISCORDJS_BOT_TOKEN);