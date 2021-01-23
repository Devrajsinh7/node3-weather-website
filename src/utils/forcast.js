const request = require('request')
const forcast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b01c6fc5bfa59812dd79b6c67038e4ba&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)+'&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather app', undefined)
        }
        else if (body.error) {
            callback('Unable to find the location', undefined)
        }
        else {
            callback(undefined, {
                temperature: body.current.temperature,
                weather: body.current.weather_descriptions
            })
        }
    })
}

module.exports = forcast