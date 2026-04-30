module.exports = {
    name: 'group',
    alias: ['gc'],
    category: 'group',
    description: 'Open/close group',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        const botAdmin = groupMetadata.participants.find(p => p.id === sock.user.id)?.admin
        if(!isAdmin) return m.reply('Admin only!')
        if(!botAdmin) return m.reply('Bot must be admin!')
        if(!args[0]) return m.reply(`Example: ${global.prefix}group open/close`)

        if(args[0] === 'open') {
            await sock.groupSettingUpdate(m.chat, 'not_announcement')
            m.reply('✅ Group opened. All members can send messages')
        } else if(args[0] === 'close') {
            await sock.groupSettingUpdate(m.chat, 'announcement')
            m.reply('✅ Group closed. Only admins can send messages')
        } else {
            m.reply('Use open or close')
        }
    }
}