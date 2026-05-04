// Owner number without @s.whatsapp.net
global.owner = [process.env.OWNER || '2547xxxxxxxx'] 
global.botname = process.env.BOTNAME || 'GWIJITECH-MD'
global.prefix = process.env.PREFIX || '.' 
global.sessionId = process.env.SESSION_ID || 'GWIJITECH-MD~YourSessionIDHere'

global.mess = {
    owner: 'Owner only command!',
    group: 'Group only command!',
    admin: 'Admin only command!',
    botAdmin: 'Bot must be admin first!',
    wait: 'Loading...',
    error: 'Error! Try again later'
}
