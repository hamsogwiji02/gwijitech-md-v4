const axios = require('axios')

module.exports = {
    name: 'ai',
    alias: ['gpt', 'ask'],
    category: 'general',
    description: 'Ask AI anything',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}ai how to cook rice`)

        await sock.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })

        try {
            const text = args.join(' ')
            const api = `https://api.ryzendesu.vip/api/ai/gpt?text=${encodeURIComponent(text)}`
            const { data } = await axios.get(api)

            if(!data.result) return m.reply('AI failed to respond')
            m.reply(data.result)
        } catch(e) {
            m.reply('Error: ' + e.message)
        }
    }
}