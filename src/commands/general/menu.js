const moment = require('moment-timezone')
const os = require('os')
const fs = require('fs')

module.exports = {
    name: 'menu',
    alias: ['help', 'list'],
    category: 'general',
    description: 'Display bot menu',
    run: async (sock, m, args) => {
        const uptime = process.uptime()
        const hours = Math.floor(uptime / 3600)
        const minutes = Math.floor((uptime % 3600) / 60)
        const seconds = Math.floor(uptime % 60)

        const time = moment.tz('Africa/Nairobi').format('HH:mm:ss')
        const date = moment.tz('Africa/Nairobi').format('DD/MM/YYYY')

        // Count commands
        let totalCmd = 0
        const cmdDirs = fs.readdirSync('./src/commands')
        cmdDirs.forEach(dir => {
            totalCmd += fs.readdirSync(`./src/commands/${dir}`).filter(f => f.endsWith('.js')).length
        })

        const menuText = `
╭═══〘 *${global.botname}* 〙═══⊷❍
┃ ╭──────────────
┃ │▸ *Owner:* @${global.owner[0]}
┃ │▸ *Prefix:* [ ${global.prefix} ]
┃ │▸ *Mode:* Public
┃ │▸ *Total CMD:* ${totalCmd}
┃ │▸ *Uptime:* ${hours}h ${minutes}m ${seconds}s
┃ │▸ *Platform:* ${os.platform()}
┃ │▸ *Time:* ${time}
┃ │▸ *Date:* ${date}
┃ ╰──────────────
╰════════⊷❍

╭═══〘 *GENERAL* 〙═══⊷❍
┃ ▸ ${global.prefix}ping
┃ ▸ ${global.prefix}menu
┃ ▸ ${global.prefix}owner
┃ ▸ ${global.prefix}ai <text>
┃ ▸ ${global.prefix}play <song>
┃ ▸ ${global.prefix}video <query>
┃ ▸ ${global.prefix}tiktok <url>
┃ ▸ ${global.prefix}img <query>
┃ ▸ ${global.prefix}sticker
┃ ▸ ${global.prefix}meme
┃ ▸ ${global.prefix}weather <city>
┃ ▸ ${global.prefix}translate <lang> <text>
┃ ▸ ${global.prefix}ssweb <url>
┃ ▸ ${global.prefix}shorturl <url>
┃ ▸ ${global.prefix}qrcode <text>
╰════════════════⊷❍

╭═══〘 *GROUP* 〙═══⊷❍
┃ ▸ ${global.prefix}kick @user
┃ ▸ ${global.prefix}add 254xxx
┃ ▸ ${global.prefix}promote @user
┃ ▸ ${global.prefix}demote @user
┃ ▸ ${global.prefix}tagall
┃ ▸ ${global.prefix}hidetag <text>
┃ ▸ ${global.prefix}group open/close
┃ ▸ ${global.prefix}setname <text>
┃ ▸ ${global.prefix}setdesc <text>
┃ ▸ ${global.prefix}linkgroup
┃ ▸ ${global.prefix}revoke
┃ ▸ ${global.prefix}antilink on/off
╰════════════════⊷❍

╭═══〘 *OWNER* 〙═══⊷❍
┃ ▸ ${global.prefix}eval <code>
┃ ▸ ${global.prefix}restart
┃ ▸ ${global.prefix}broadcast <text>
┃ ▸ ${global.prefix}setpp <reply img>
┃ ▸ ${global.prefix}join <link>
╰════════════════⊷❍

_Type ${global.prefix}ping to test bot speed_`

        await sock.sendMessage(m.chat, {
            image: { url: 'https://files.catbox.moe/gp80fz.jpg' },
            caption: menuText,
            mentions: [global.owner[0] + '@s.whatsapp.net']
        }, { quoted: m })
    }
}