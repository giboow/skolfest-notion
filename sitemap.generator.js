const sitemap = require("nextjs-sitemap-generator");

sitemap({
    baseUrl: "https://skolfest-guerin.zd.fr",
    ignoredPaths: [],
    extraPaths: [],
    pagesDirectory: __dirname + "/out",
    targetDirectory: "out/",
    sitemapFilename: "sitemap.xml",
    nextConfigPath: __dirname + "/next.config.js",
    ignoredExtensions: ["png", "jpg", "jpeg", "css", "md", "ico", "webp", "xml", "svg", "xsl", "txt", "webmanifest","php"],
    pagesConfig: {
        // "/login": {
        //     priority: "0.5",
        //     changefreq: "daily",
        // },
    },
    sitemapStylesheet: [
        // {
        //     type: "text/css",
        //     styleFile: "/test/styles.css",
        // },
        {
            type: "text/xsl",
            styleFile: "sitemap.xsl",
        },
    ],
});

console.log(`✅ sitemap.xml generated!`);