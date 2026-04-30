const axios = require('axios')

module.exports = {
    name: 'ssweb',
    alias: ['ss', 'screenshot'],
    category: 'general',
    description: 'Screenshot website',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}ssweb https://google.com`)

        await sock.sendMessage(m.chat, { react: { text: '📸', key: m.key } })

        try {
            const url = `https://image.thum.io/get/fullpage/${args[0]}`
            await sock.sendMessage(m.chat, {
                image: { url: url },
                caption: `Screenshot: ${args[0]}`
            }, { quoted: m })
        } catch(e) {
            m.reply('Failed to screenshot: ' + e.message)
        }
    }
}