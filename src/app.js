const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup static directory to serve 
app.use(express.static(publicDir))

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Devraj'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Devraj'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Example message',
        title: 'Help',
        name: 'Devraj'
    })
})

//weather page
app.get(('/weather'), (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide a searchable location.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
          return res.send({error})
        }
        // Forecast
        forcast(longitude, latitude, (forcastError, {temperature, weather}) => {
          if (forcastError) {
            return res.send({
                error: forcastError
            })
          }
    
          res.send({
            address: req.query.address,
            forcast: temperature,
            weather: weather 
        })
        })
      })

})


//Help 404 page
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help 404 page',
        message: 'Help article not found.',
        name: 'devraj'
    })
})

//404 Error page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Page not found.',
        name: 'devraj'
    })
})

//console print
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})