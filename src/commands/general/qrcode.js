module.exports = {
    name: 'qrcode',
    alias: ['qr'],
    category: 'general',
    description: 'Generate QR code from text',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}qr Hello world`)
        const text = args.join(' ')
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(text)}`
        await sock.sendMessage(m.chat, {
            image: { url: url },
            caption: `QR Code for: ${text}`
        }, { quoted: m })
    }
}