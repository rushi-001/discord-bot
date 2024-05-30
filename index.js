// Welcome to the Rushi's Project Discord Bot :]

const { Client, GatewayIntentBits } = require("discord.js")
const connectMongoDB = require("./connection.js")
const express = require("express")
const { handleGenerateNewShortUrl, handleUserShortUrl, getUserUrls } = require("./controller/url_controller.js")
require("dotenv").config();

const app = express()
const token = process.env.BotToken
const PORT = process.env.PORT;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'help') {
        await interaction.reply("+------------------------------------------+ \n_**~{BOT info}~**_ \n✔ It's an URL shortner Bot which create short URLs like [ bitly.com ]. \n✔ This project is available on my **Github [ https://github.com/rushi-001 ]**. \n+------------------------------------------+ \n_**~{Commands}~**_ \n✔ To create Short URL use command ~> **/create [url https://www.example.com]**. Please start the URL with 'https://'.  \n✔ To see all the URLs you created use command ~> **/myurls** \n+------------------------------------------+");
    }

    if (interaction.commandName === 'create') {
        const url = interaction.options.getString('url');
        const userId = interaction.user.id;
        const shortUrlId = await handleGenerateNewShortUrl(url, userId);
        await interaction.reply(`+------------------------------------------+ \n_**~{Short URL Created}~**_ \n❌ Your URL> ${url} \n\n**✅ Your Short URL> https://discord-bot-kmwj.onrender.com/${shortUrlId}** \n+------------------------------------------+`);
    }
    if (interaction.commandName === 'myurls') {
        const userId = interaction.user.id;
        const urls = await getUserUrls(userId);

        if (urls.length === 0) {
            await interaction.reply(`+------------------------------------------+ \n_**~{URLs Not Found}~**_ \n✔ You haven't created any short URLs yet. \n✔ Use command **/help** to get more info. \n✔ Use command **/create [url ]** for creating new URLs. \n+------------------------------------------+`);
        } else {
            const urlCount = urls.length;
            const reply = urls.map(url => `✔ Short URL: https://discord-bot-kmwj.onrender.com/${url.shortId} -> Original URL: ${url.redirectedUrl}`).join('\n');
            await interaction.reply(`+------------------------------------------+ \n✔ You had created a total of **${urlCount}** URLs with us. \n+------------------------------------------+ \n${reply} \n+------------------------------------------+`);
        }
    }
});

// routes
app.get("/:shortId", handleUserShortUrl);

client.login(token);
// mongo db connection
connectMongoDB(process.env.MongoDB_URL).then(() => console.log("MongoDB Connected!")); // `url-shortener-db` is database name
// Server Connection
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));