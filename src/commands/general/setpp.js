const Jimp = require('jimp')

module.exports = {
    name: 'setpp',
    alias: ['setprofile'],
    category: 'owner',
    description: 'Set bot profile picture',
    run: async (sock, m, args) => {
        if(!global.owner.includes(m.sender.split('@')[0])) return m.reply('Owner only!')

        const quoted = m.message.extendedTextMessage?.contextInfo?.quotedMessage
        const mime = quoted?.imageMessage?.mimetype || m.message.imageMessage?.mimetype
        if(!mime) return m.reply('Reply to image')

        try {
            const media = await sock.downloadMediaMessage(quoted? { message: quoted } : m)
            const image = await Jimp.read(media)
            const buffer = await image.cover(640, 640).getBufferAsync(Jimp.MIME_JPEG)

            await sock.updateProfilePicture(sock.user.id, buffer)
            m.reply('✅ Profile picture updated')
        } catch(e) {
            m.reply('Failed: ' + e.message)
        }
    }
}