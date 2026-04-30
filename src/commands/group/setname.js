module.exports = {
    name: 'setname',
    alias: ['setgroupname'],
    category: 'group',
    description: 'Change group name',
    run: async (sock, m, args) => {
        if(!m.isGroup) return m.reply('Group only!')
        const groupMetadata = await sock.groupMetadata(m.chat)
        const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
        const botAdmin = groupMetadata.participants.find(p => p.id === sock.user.id)?.admin
        if(!isAdmin) return m.reply('Admin only!')
        if(!botAdmin) return m.reply('Bot must be admin!')
        if(!args[0]) return m.reply(`Example: ${global.prefix}setname New Group Name`)

        await sock.groupUpdateSubject(m.chat, args.join(' '))
        m.reply('✅ Group name updated')
    }
}