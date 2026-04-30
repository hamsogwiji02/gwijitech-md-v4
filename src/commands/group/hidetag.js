module.exports = {
    name: 'hidetag',
    alias: ['h'],
    category: 'group',
    description: 'Tag all members without showing tags',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        if(!isAdmin) return m.reply('Admin only!')

        const text = args.join(' ') || m.quoted?.text || ''
        const members = groupMetadata.participants.map(p => p.id)

        await sock.sendMessage(m.chat, {
            text: text,
            mentions: members
        }, { quoted: m })
    }
}