const axios = require('axios')

module.exports = {
    name: 'translate',
    alias: ['tr'],
    category: 'general',
    description: 'Translate text',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}tr en Hello world`)

        try {
            const lang = args[0]
            const text = args.slice(1).join(' ')
            const api = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${lang}`
            const { data } = await axios.get(api)

            m.reply(`*Translated to ${lang}:*\n${data.responseData.translatedText}`)
        } catch(e) {
            m.reply('Translation failed')
        }
    }
}