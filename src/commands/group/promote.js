module.exports = {
    name: 'promote',
    alias: ['admin'],
    category: 'group',
    description: 'Promote member to admin',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        const botAdmin = groupMetadata.participants.find(p => p.id === sock.user.id)?.admin
        if(!isAdmin) return m.reply('Admin only!')
        if(!botAdmin) return m.reply('Bot must be admin!')

        const user = m.mentionedJid[0] || (m.quoted? m.quoted.sender : null)
        if(!user) return m.reply('Tag or reply to user')

        await sock.groupParticipantsUpdate(m.chat, [user], 'promote')
        m.reply('✅ User promoted to admin')
    }
}