module.exports = {
    name: 'tagall',
    alias: ['everyone'],
    category: 'group',
    description: 'Tag all group members',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        if(!isAdmin) return m.reply('Admin only!')

        const text = args.join(' ') || 'Tag all'
        const members = groupMetadata.participants.map(p => p.id)

        await sock.sendMessage(m.chat, {
            text: `*${text}*\n\n` + members.map(v => '@' + v.split('@')[0]).join('\n'),
            mentions: members
        }, { quoted: m })
    }
}