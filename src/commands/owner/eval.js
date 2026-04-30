module.exports = {
    name: 'eval',
    category: 'owner',
    description: 'Run code',
    run: async (sock, m, args) => {
        if(!global.owner.includes(m.sender.split('@')[0])) return m.reply('Owner only!')
        try {
            let evaled = await eval(args.join(' '))
            if(typeof evaled!== 'string') evaled = require('util').inspect(evaled)
            m.reply(evaled)
        } catch (e) {
            m.reply(String(e))
        }
    }
}