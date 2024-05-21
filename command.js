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
    }
]

const rest = new REST({ version: "10" }).setToken("MTI0MjA3ODU1NDMyMjIzOTYyMA.GxsMo-.pL4jFgqdnmw_aBRyHbQEHHQiSYsuCWXA83bBug");

(async () => {
    try {
        await rest.put(Routes.applicationCommands("1242078554322239620"), { body: commands });
        console.log("Applicaiton connected (/)");
    } catch (error) {
        console.error(error)
    }
})();