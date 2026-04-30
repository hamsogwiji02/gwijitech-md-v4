const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const qrcode = require('qrcode-terminal')
const pino = require('pino')
const fs = require('fs')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./sessions')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    // Load session from global.sessionId if it exists and credentials don't
    if (global.sessionId && !fs.existsSync('./sessions/creds.json')) {
        try {
            // Create folder if missing
            if (!fs.existsSync('./sessions')) fs.mkdirSync('./sessions')
            
            console.log('Detected new Session ID, setting up credentials...')
            const sessdata = global.sessionId.replace('GWIJITECH-MD~', '')
            const decoded = Buffer.from(sessdata, 'base64').toString()
            
            fs.writeFileSync('./sessions/creds.json', decoded)
            console.log('Session credentials created successfully! ✅')
            
            // We DON'T exit here. We just let it continue to startBot()
        } catch (e) {
            console.log('Error decoding Session ID. Please check your config.js:', e.message)
        }
    }

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update

        if (qr && !global.sessionId) {
            console.log('--- SCAN THE QR CODE BELOW ---')
            qrcode.generate(qr, { small: true })
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.loggedOut) {
                console.log('Logged out. Delete /sessions and restart.')
                process.exit()
            } else {
                console.log('Connection closed, reconnecting...')
                setTimeout(() => startBot(), 5000)
            }
        } else if (connection === 'open') {
            console.log('Bot connected to WhatsApp successfully! ✅')
        }
    })

    require('../events/messages.upsert')(sock)
}

module.exports = { startBot }

