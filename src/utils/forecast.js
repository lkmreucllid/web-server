const request = require('postman-request')

const foreCast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8ceb9543475fee9b4f21ce0223eca7ae&query=' + address + '&units=m'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather API', undefined)
        } else if (response.body.error) {
            callback('Unable to find weather for the requested place', undefined)

        } else {
            callback(undefined, {
                searchedPlace: response.body.request.query,
                current: response.body.current
            })
        }
    })
}

module.exports = foreCast