const axios = require('axios');
const cheerio = require('cheerio');

const getDetikNews = async (req, res, next) => {
    try {
        const url = 'https://www.detik.com/terpopuler';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let articles = [];

        $('.list-content article').each((index, element) => {
            if (index < 6) { // Ambil hanya 6 berita terbaru
                const title = $(element).find('h3').text().trim();
                const link = $(element).find('a').attr('href');
                const imageUrl = $(element).find('img').attr('src') || 'https://via.placeholder.com/1920x1080';

                articles.push({
                    id: `${index + 1}`, // ID unik
                    title,
                    summary: "Berita populer dari Detik.com", // Placeholder untuk ringkasan
                    content: "", // Opsional
                    category: "Breaking News", // Bisa disesuaikan
                    imageUrl, // Pastikan sesuai dengan frontend
                    author: "Detik.com",
                    publishedAt: new Date().toISOString(), // Waktu sekarang sebagai default
                    readTime: Math.floor(Math.random() * 10) + 3, // Simulasi waktu baca 3-12 menit
                    views: Math.floor(Math.random() * 5000) + 1000, // Simulasi jumlah views 1000-6000
                });
            }
        });

        if (articles.length === 0) {
            return res.status(404).json({ message: "Tidak ada berita tersedia dari Detik." });
        }

        res.json(articles);
    } catch (error) {
        console.error("Error saat scraping berita Detik:", error);
        next(error);
    }
};

module.exports = { getDetikNews };
