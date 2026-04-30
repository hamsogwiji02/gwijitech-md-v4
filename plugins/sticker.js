const { Sticker, StickerTypes } = require('wa-sticker-formatter')

module.exports = {
    name: 'sticker',
    alias: ['s', 'stiker'],
    category: 'general',
    description: 'Create sticker from image/video',
    run: async (sock, m, args) => {
        const quoted = m.message.extendedTextMessage?.contextInfo?.quotedMessage
        const mime = quoted?.imageMessage?.mimetype || quoted?.videoMessage?.mimetype || m.message.imageMessage?.mimetype || m.message.videoMessage?.mimetype

        if(!mime) return m.reply(`Reply to image/video with ${global.prefix}sticker`)

        try {
            await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
            const media = await sock.downloadMediaMessage(quoted? { message: quoted } : m)

            const sticker = new Sticker(media, {
                pack: global.botname,
                author: global.owner[0],
                type: StickerTypes.FULL,
                quality: 50
            })

            await sock.sendMessage(m.chat, { sticker: await sticker.toBuffer() }, { quoted: m })
        } catch(e) {
            m.reply('Failed to make sticker: ' + e.message)
        }
    }
}