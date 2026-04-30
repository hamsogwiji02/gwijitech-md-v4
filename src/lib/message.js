async function getMessage(sock, m) {
    if(!m.message) return

    m.id = m.key.id
    m.isBaileys = m.key.id.startsWith('BAE5') && m.key.id.length === 16
    m.chat = m.key.remoteJid
    m.fromMe = m.key.fromMe
    m.isGroup = m.chat.endsWith('@g.us')
    m.sender = m.fromMe? sock.user.id : (m.isGroup? m.key.participant : m.chat)
    m.body = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || m.message.videoMessage?.caption || ''
    m.mentionedJid = m.message.extendedTextMessage?.contextInfo?.mentionedJid || []
    m.quoted = m.message.extendedTextMessage?.contextInfo?.quotedMessage || null
    m.reply = (text) => sock.sendMessage(m.chat, { text }, { quoted: m })

    return m
}

module.exports = { getMessage }