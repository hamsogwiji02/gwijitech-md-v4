const yts = require('yt-search')
const axios = require('axios')

module.exports = {
    name: 'play',
    category: 'general',
    description: 'Download audio from YouTube',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}play darari`)

        await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        try {
            const search = await yts(args.join(' '))
            const video = search.videos[0]
            if(!video) return m.reply('Video not found')

            const api = `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${video.url}`
            const { data } = await axios.get(api)

            if(!data.url) return m.reply('Failed to fetch audio')

            await sock.sendMessage(m.chat, {
                audio: { url: data.url },
                mimetype: 'audio/mpeg',
                fileName: `${video.title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: video.title,
                        body: video.author.name,
                        thumbnailUrl: video.thumbnail,
                        mediaType: 1,
                        sourceUrl: video.url
                    }
                }
            }, { quoted: m })

            await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } catch(e) {
            console.log(e)
            m.reply('Error: ' + e.message)
        }
    }
}