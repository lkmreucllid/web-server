const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const foreCast = require('./utils/forecast.js')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const veiwsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', veiwsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Lalit Kumar'
    })
})


//Blank for the home page

/*app.get('', (req, res) => {
    res.send('<h1>Hello This is the new beginning</h1>')
})

app.get('/help', (req, res) => {
    res.send('This is the Help Page')
})
*/

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lalit Kumar',
        message: 'This is the long paragraph for Help',
        desc: 'In computer science, an AVL tree is a self-balancing binary search tree. It was the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; if at any time they differ by more than one, rebalancing is done to restore this property.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Lalit Kumar'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide an address in search query'
        })
    }
    geoCode(address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }

        foreCast(data.location, (foreCastError, foreCastdata) => {
            if (foreCastError) {
                return res.send({
                    error: foreCastError
                })
            }
            res.send({
                forecast: foreCastdata,
                location: foreCastdata.searchedPlace,
                address
            })
        })
    })
})

//This will match only if the url contains /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lalit Kumar',
        errorMessages: 'Help article not found'
    })
})

//This will match all the url and show the data
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lalit Kumar',
        errorMessages: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running port: 3000')
})