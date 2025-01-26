require('dotenv').config();
const { scrapeTumblrPosts } = require("../services/tumblrScraper.js");

exports.scrapePosts = async (req, res) => {
    const { username, searchName } = req.body;

    const correo = process.env.CORREO;
    const password = process.env.PASSWORD;

    if (!username || !searchName || !correo || !password) {
        return res.status(400).json({ error: "Faltan parámetros." });
    }

    try {
        const posts = await scrapeTumblrPosts(username, searchName, correo, password);
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error al hacer scraping:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};


