module.exports = {
    name: 'add',
    category: 'group',
    description: 'Add member to group',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        const botAdmin = groupMetadata.participants.find(p => p.id === sock.user.id)?.admin
        if(!isAdmin) return m.reply('Admin only!')
        if(!botAdmin) return m.reply('Bot must be admin!')
        if(!args[0]) return m.reply(`Example: ${global.prefix}add 254712345678`)

        const number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await sock.groupParticipantsUpdate(m.chat, [number], 'add')
        m.reply(`✅ Added ${args[0]}`)
    }
}