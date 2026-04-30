const ytdl = require('ytdl-core')
const yts = require('yt-search')

async function ytmp3(url) {
    const info = await ytdl.getInfo(url)
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' })
    return {
        title: info.videoDetails.title,
        url: format.url,
        thumb: info.videoDetails.thumbnails.pop().url
    }
}

async function ytmp4(url) {
    const info = await ytdl.getInfo(url)
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' })
    return {
        title: info.videoDetails.title,
        url: format.url,
        thumb: info.videoDetails.thumbnails.pop().url
    }
}

module.exports = { ytmp3, ytmp4, yts }