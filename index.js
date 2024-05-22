const { Client, GatewayIntentBits } = require("discord.js")
const connectMongoDB = require("./connection.js")
const express = require("express")
const { handleGenerateNewShortUrl, handleUserShortUrl } = require("./controller/url_controller.js")

const app = express()
const token = "MTI0MjA3ODU1NDMyMjIzOTYyMA.GxsMo-.pL4jFgqdnmw_aBRyHbQEHHQiSYsuCWXA83bBug"
const PORT = 8008;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'help') {
        await interaction.reply("+------------------------------------------+ \n✔ It's an URL shortner Bot which create shor URL like [ bitly.com ]. \n✔ This project is available on my **Github [ https://github.com/rushi-001 ]**. \n+------------------------------------------+ \n✔ To create Short URL use ~> **/create [url https://www.example.com]**. \n+------------------------------------------+");
    }

    if (interaction.commandName === 'create') {
        const url = interaction.options.getString('url');
        const shortUrlId = await handleGenerateNewShortUrl(url);
        await interaction.reply(`+------------------------------------------+ \n❌ Your URL> ${url} \n\n**✅ Your Short URL> http://localhost:8008/${shortUrlId}** \n+------------------------------------------+`);
        // await interaction.reply(`🔗 Your URL> ${url}`);
    }
});

// routes
app.get("/:shortId", handleUserShortUrl);

client.login(token);
// mongo db connection
connectMongoDB("mongodb://127.0.0.1:27017/discord-url-shortener-db").then(() => console.log("MongoDB Connected!")); // `url-shortener-db` is database name
// Server Connection
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));