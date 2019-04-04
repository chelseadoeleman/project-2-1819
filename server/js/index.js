'use strict'

const express = require('express')
const helmet = require('helmet')
const path = require('path')
const compression = require('compression')
const { decompress } = require('./helpers/decompress')
const handleIndexRoute = require('./routes/indexRoute')
const app = express()

app.use(helmet())

app.get('*.js', decompress)
app.get('*.css', decompress)

app.use(express.static(path.join(__dirname, '../public')))
app.use(compression({
    filter: (request) => {
        if(request.headers.accept) {
            return request.headers.accept.includes('text/html')
        }
        return false
    }
}))
app.use((request, response, next) => {
    response.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60)
    next()
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', handleIndexRoute)

app.listen({ port: process.env.PORT || 5000 }), () => {
    process.on('SIGTERM')
    console.log(`listening on port ${process.env.PORT || 5000}`)
}
