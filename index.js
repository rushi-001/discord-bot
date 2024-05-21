const { Client, GatewayIntentBits } = require("discord.js")

const token = "MTI0MjA3ODU1NDMyMjIzOTYyMA.GxsMo-.pL4jFgqdnmw_aBRyHbQEHHQiSYsuCWXA83bBug"

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'help') {
        await interaction.reply("+------------------------------------------+ \n✔ It's an URL shortner Bot which create shor URL like [ bitly.com ]. \n✔ This project is available on my **Github [ https://github.com/rushi-001 ]**. \n+------------------------------------------+ \n✔ To create Short URL use ~> **/create [url https://www.example.com]**.");
    }

    if (interaction.commandName === 'create') {
        const url = interaction.options.getString('url')
        await interaction.reply(`🔗 test: ${url}`);
    }
});

client.login(token);

// todo: perform the url shortening.
// test