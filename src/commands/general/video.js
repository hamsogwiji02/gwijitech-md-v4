const yts = require('yt-search')
const axios = require('axios')

module.exports = {
    name: 'video',
    alias: ['ytmp4', 'ytv'],
    category: 'general',
    description: 'Download video from YouTube',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}video mr beast`)

        await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        try {
            const search = await yts(args.join(' '))
            const video = search.videos[0]
            if(!video) return m.reply('Video not found')
            if(video.seconds > 600) return m.reply('Video too long. Max 10 minutes')

            const api = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${video.url}`
            const { data } = await axios.get(api)

            if(!data.url) return m.reply('Failed to fetch video')

            await sock.sendMessage(m.chat, {
                video: { url: data.url },
                caption: `*${video.title}*\nDuration: ${video.timestamp}`,
                mimetype: 'video/mp4'
            }, { quoted: m })
        } catch(e) {
            m.reply('Error: ' + e.message)
        }
    }
}