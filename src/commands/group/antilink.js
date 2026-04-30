const fs = require('fs')
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))

module.exports = {
    name: 'antilink',
    category: 'group',
    description: 'Enable/disable antilink',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        if(!isAdmin) return m.reply('Admin only!')
        if(!args[0]) return m.reply(`Example: ${global.prefix}antilink on/off`)

        if(args[0] === 'on') {
            antilink[m.chat] = true
            fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
            m.reply('✅ Antilink activated')
        } else if(args[0] === 'off') {
            delete antilink[m.chat]
            fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
            m.reply('✅ Antilink deactivated')
        }
    }
}