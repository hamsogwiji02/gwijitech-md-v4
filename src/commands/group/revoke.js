module.exports = {
    name: 'revoke',
    alias: ['resetlink'],
    category: 'group',
    description: 'Reset group invite link',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        const botAdmin = groupMetadata.participants.find(p => p.id === sock.user.id)?.admin
        if(!isAdmin) return m.reply('Admin only!')
        if(!botAdmin) return m.reply('Bot must be admin!')

        await sock.groupRevokeInvite(m.chat)
        m.reply('✅ Group link revoked. Use.linkgroup for new link')
    }
}