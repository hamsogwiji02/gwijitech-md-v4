const axios = require('axios')
const fs = require('fs')

const fetchJson = async (url) => {
    const res = await axios.get(url)
    return res.data
}

const getBuffer = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    return res.data
}

module.exports = { fetchJson, getBuffer }