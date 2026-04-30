const axios = require('axios')

module.exports = {
    name: 'tiktok',
    alias: ['tt', 'ttdl'],
    category: 'general',
    description: 'Download TikTok video no watermark',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}tiktok https://vt.tiktok.com/...`)

        await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        try {
            const api = `https://api.ryzendesu.vip/api/downloader/ttdl?url=${args[0]}`
            const { data } = await axios.get(api)

            if(!data.data.play) return m.reply('Failed to fetch video')

            await sock.sendMessage(m.chat, {
                video: { url: data.data.play },
                caption: `*${data.data.title}*\nAuthor: ${data.data.author.nickname}`,
                mimetype: 'video/mp4'
            }, { quoted: m })
        } catch(e) {
            m.reply('Error: ' + e.message)
        }
    }
}