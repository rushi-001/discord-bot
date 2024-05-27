const shortid = require("shortid")
const urlModel = require("../models/url_model.js");

const handleGenerateNewShortUrl = async (url, userId) => {
    const shortUrlId = shortid();

    if (!url) return await interaction.reply("URL is required!");

    // Check if the URL has already been shortened by the same user
    const existingUrl = await urlModel.findOne({ redirectedUrl: url, userId });

    if (existingUrl) {
        // If URL already exists for this user, return the existing short URL ID
        return existingUrl.shortId;
    }

    await urlModel.create({
        shortId: shortUrlId,
        redirectedUrl: url,
        userId,
        visitHistory: []
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
        },
        {
            new: true // This ensures the updated document is returned
        }
    )
    if (!entry) {
        // If no entry is found, send a 404 response
        return res.status(404).send('URL not found');
    }

    // Redirect to the original URL
    res.redirect(entry.redirectedUrl);
}

async function getUserUrls(userId) {
    const urls = await urlModel.find({ userId });
    return urls;
}

module.exports = {
    handleGenerateNewShortUrl,
    handleUserShortUrl,
    getUserUrls,
}