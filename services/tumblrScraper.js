const puppeteer = require("puppeteer");
const fs = require("fs/promises");

exports.scrapeTumblrPosts = async (username, searchName, correo, password) => {
    console.log("Scraping Tumblr posts...");
    const url = `https://www.tumblr.com/${username}`;

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 100,
    });
    const page = await browser.newPage();

    await page.goto(url);

    await tumblrLogin(page, correo, password);

    const data = await page.evaluate(() => {
        const allArticles = document.querySelectorAll("article");
        const posts = [];

        if (allArticles.length < 1) return [];

        allArticles.forEach((article) => {
            const header = article.querySelector("header");
            const headerText = header ? header.textContent.trim() : "Sin título";

            const texts = [];
            article.querySelectorAll("p").forEach((paragraph) => {
                const textContent = paragraph.textContent.trim();
                if (textContent) {
                    texts.push(textContent);
                }
            });

            posts.push({
                header: headerText,
                texts,
            });
        });

        return posts;
    });

   

    // Guardar JSON traducido
    await fs.writeFile("sapolotalks-tumblr.json", JSON.stringify(data, null, 2));

    await browser.close();
    return data;
};



async function tumblrLogin(page, correo, password) {
    await page.waitForSelector('[data-action="log-in"]', { visible: true });
    await page.click('[data-action="log-in"]');

    await page.waitForSelector('input[name="email"]', { visible: true });
    await page.type('input[name="email"]', correo);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await page.waitForNavigation();
}
