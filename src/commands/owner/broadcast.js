module.exports = {
    name: 'broadcast',
    alias: ['bc'],
    category: 'owner',
    description: 'Send message to all chats',
    run: async (sock, m, args) => {
        if(!global.owner.includes(m.sender.split('@')[0])) return m.reply('Owner only!')
        if(!args[0]) return m.reply(`Example: ${global.prefix}bc Hello everyone`)

        const chats = Object.keys(await sock.groupFetchAllParticipating())
        const text = args.join(' ')

        m.reply(`Broadcasting to ${chats.length} groups...`)

        for(let id of chats) {
            await sock.sendMessage(id, { text: `*BROADCAST*\n\n${text}` })
            await new Promise(resolve => setTimeout(resolve, 2000)) // 2s delay to avoid ban
        }
        m.reply('Broadcast done!')
    }
}