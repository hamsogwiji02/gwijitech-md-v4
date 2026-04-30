module.exports = {
    name: 'join',
    category: 'owner',
    description: 'Make bot join group via link',
    run: async (sock, m, args) => {
        if(!global.owner.includes(m.sender.split('@')[0])) return m.reply('Owner only!')
        if(!args[0]) return m.reply(`Example: ${global.prefix}join https://chat.whatsapp.com/...`)
        try {
            const code = args[0].split('https://chat.whatsapp.com/')[1]
            await sock.groupAcceptInvite(code)
            m.reply('✅ Joined group')
        } catch(e) {
            m.reply('Failed to join: ' + e.message)
        }
    }
}