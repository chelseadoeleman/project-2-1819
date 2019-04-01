'use strict'

const express = require('express')
const helmet = require('helmet')
const path = require('path')
const compression = require('compression')
const { decompress } = require('./helpers/decompress')
const handleIndexRoute = require('./routes/indexRoute')
const handleDetailRoute = require('./routes/detailRoute')
const app = express()

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))
app.use(compression({
    filter: (request) => {
        if(request.headers.accept) {
            return request.headers.accept.includes('text/html')
        }
        return false
    }
}))

app.get('*.js', decompress)
app.get('*.css', decompress)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', handleIndexRoute)
app.get('/detail/:id', handleDetailRoute)

app.listen({ port: process.env.PORT || 3000 }), () => {
    console.log(`listening on port ${process.env.PORT || 3000}`)
}
