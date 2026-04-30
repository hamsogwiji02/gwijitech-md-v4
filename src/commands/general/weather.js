const axios = require('axios')

module.exports = {
    name: 'weather',
    category: 'general',
    description: 'Get weather info',
    run: async (sock, m, args) => {
        if(!args[0]) return m.reply(`Example: ${global.prefix}weather Nairobi`)

        try {
            const city = args.join(' ')
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=060a6bcfa19809c2cd4d97a212b19273&units=metric`
            const { data } = await axios.get(api)

            const text = `*Weather in ${data.name}*\n\n` +
                         `🌡️ Temp: ${data.main.temp}°C\n` +
                         `🤔 Feels like: ${data.main.feels_like}°C\n` +
                         `💧 Humidity: ${data.main.humidity}%\n` +
                         `💨 Wind: ${data.wind.speed} m/s\n` +
                         `☁️ Condition: ${data.weather[0].description}`

            m.reply(text)
        } catch(e) {
            m.reply('City not found')
        }
    }
}