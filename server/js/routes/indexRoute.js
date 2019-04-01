const { times } = require('../helpers/helpers')
const { getUnsplashUrl } = require('../helpers/getUnsplashUrl')
const Fetcher = require('../helpers/Fetcher')

module.exports = async (request, response) => {
    response.status(200).render('pages/index')
}