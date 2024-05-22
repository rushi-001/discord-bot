const shortid = require("shortid")
const urlModel = require("../models/url_model.js");

const handleGenerateNewShortUrl = async (url) => {
    const shortUrlId = shortid();
    if (!url) return await interaction.reply("URL is required!");
    await urlModel.create({
        shortId: shortUrlId,
        redirectedUrl: url,
    })
    return shortUrlId;
}

const handleUserShortUrl = async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await urlModel.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectedUrl);
}

module.exports = {
    handleGenerateNewShortUrl,
    handleUserShortUrl,
}