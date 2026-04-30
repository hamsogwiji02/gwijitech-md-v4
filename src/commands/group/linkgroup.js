module.exports = {
    name: 'linkgroup',
    alias: ['linkgc', 'gclink'],
    category: 'group',
    description: 'Get group invite link',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const botAdmin = groupMetadata.participants.find(p => p.id === sock.user.id)?.admin
        if(!botAdmin) return m.reply('Bot must be admin!')

        const code = await sock.groupInviteCode(m.chat)
        m.reply(`https://chat.whatsapp.com/${code}`)
    }
}