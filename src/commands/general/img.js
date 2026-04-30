const axios = require('axios')

module.exports = {
    name: 'img',
    alias: ['image', 'pinterest'],
    category: 'general',
    description: 'Search image from Pinterest',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}img cat`)

        try {
            const query = args.join(' ')
            const api = `https://api.ryzendesu.vip/api/search/pinterest?query=${encodeURIComponent(query)}`
            const { data } = await axios.get(api)

            if(!data.result || data.result.length === 0) return m.reply('No images found')

            const img = data.result[Math.floor(Math.random() * data.result.length)]
            await sock.sendMessage(m.chat, {
                image: { url: img },
                caption: `Result for: ${query}`
            }, { quoted: m })
        } catch(e) {
            m.reply('Error: ' + e.message)
        }
    }
}