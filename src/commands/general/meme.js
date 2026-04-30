const axios = require('axios')

module.exports = {
    name: 'meme',
    category: 'general',
    description: 'Get random memes',
    run: async (sock, m, args) => {
        try {
            const { data } = await axios.get('https://meme-api.com/gimme')
            await sock.sendMessage(m.chat, {
                image: { url: data.url },
                caption: `*${data.title}*\nFrom: r/${data.subreddit}`
            }, { quoted: m })
        } catch(e) {
            m.reply('Failed to fetch meme')
        }
    }
}