const { REST, Routes, ApplicationCommandOptionType } = require("discord.js")

const commands = [
    {
        name: "help",
        description: "Show's how to use the bot."
    },
    {
        name: "create",
        description: "Create short URL using given URL.",
        options: [
            {
                name: 'url',
                description: 'The URL to use for short URL creation.',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: 'myurls',
        description: 'Displays all URLs you have shortened',
    },
]

const rest = new REST({ version: "10" }).setToken(process.env.BotToken);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(process.env.Application_ID), { body: commands });
        console.log("Applicaiton connected (/)");
    } catch (error) {
        console.error(error)
    }
})();