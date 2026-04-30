const fs = require('fs')
const path = require('path')
const { getMessage } = require('../lib/message')

module.exports = (sock) => {
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = await getMessage(sock, messages[0])
        if(!m ||!m.body || m.isBaileys) return

        const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
                if(antilink[m.chat] && m.isGroup && m.body.includes('chat.whatsapp.com')) {
            const groupMetadata = await sock.groupMetadata(m.chat)
            const isAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin
            const botAdmin = groupMetadata.participants.find(p => p.id === (sock.user.id.split(':')[0] + '@s.whatsapp.net'))?.admin
            
            if(!isAdmin && botAdmin) {
                // Fixed: Added [m.sender] to mentions and removed extra comma in groupParticipantsUpdate
                await sock.sendMessage(m.chat, { 
                    text: `@${m.sender.split('@')[0]} Link detected, bye!`, 
                    mentions: [m.sender] 
                })
                await sock.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                return
            }
        }


        const prefix = global.prefix
        const isCmd = m.body.startsWith(prefix)
        if(!isCmd) return

        const command = m.body.slice(prefix.length).trim().split(' ')[0].toLowerCase()
        const args = m.body.trim().split(/ +/).slice(1)

        // Load command from folders
        const cmdDirs = fs.readdirSync('./src/commands')
        for(const dir of cmdDirs) {
            const cmdFiles = fs.readdirSync(`./src/commands/${dir}`).filter(f => f.endsWith('.js'))
            for(const file of cmdFiles) {
                const cmd = require(`../commands/${dir}/${file}`)
                if(cmd.name === command || cmd.alias?.includes(command)) {
                    try {
                        await cmd.run(sock, m, args)
                    } catch (e) {
                        console.log(e)
                        await sock.sendMessage(m.chat, { text: 'Error: ' + e.message })
                    }
                    return
                }
            }
        }
    })
}
