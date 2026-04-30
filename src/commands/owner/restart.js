module.exports = {
    name: 'restart',
    category: 'owner',
    description: 'Restart bot',
    run: async (sock, m, args) => {
        if(!global.owner.includes(m.sender.split('@')[0])) return m.reply('Owner only!')
        await m.reply('Restarting bot...')
        process.exit(1) // Railway will auto-restart
    }
}