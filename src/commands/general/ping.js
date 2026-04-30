module.exports = {
    name: 'ping',
    category: 'general',
    run: async (sock, m, args) => {
        const start = Date.now()
        await sock.sendMessage(m.chat, { text: 'Testing...' })
        const end = Date.now()
        await sock.sendMessage(m.chat, { text: `Pong! ${end - start}ms` })
    }
}