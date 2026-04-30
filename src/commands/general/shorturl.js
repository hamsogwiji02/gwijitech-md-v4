const axios = require('axios')

module.exports = {
    name: 'shorturl',
    alias: ['short'],
    category: 'general',
    description: 'Shorten URL',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}shorturl https://google.com`)
        try {
            const { data } = await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)
            m.reply(`*Short URL:*\n${data}`)
        } catch(e) {
            m.reply('Failed to shorten URL')
        }
    }
}