const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const request = require("request")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const { error } = require('console')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
// seting the view path
app.set('views', viewPath)
//register partials
hbs.registerPartials(partialsPath)


app.use(express.static(publicDir))

app.get('/hbs', (req, res)=>{
    res.render('index', {
        title: "Weather App",
        name: 'Kaira Jha'
    })
})

app.get('/hbs/about', (req, res)=>{
    res.render('about', {
        title: "About me",
        name: 'Kaira Jha'
    })
})
app.get('/hbs/help', (req, res)=>{
    res.render('help', {
        title: "Help",
        message: "This is where you put your help message",
        name: 'Kaira Jha'
    })
})

app.get('/hbs/help/*', (req, res)=>{
    res.render('help', {
        title: "404",
        message: "Page not found",
        name: 'Kaira Jha'
    })
})

app.get('/help', (req, res)=>{
    res.sendFile(publicDir+ '/help.html')
})

app.get('/about', (req, res)=>{
    res.sendFile(publicDir+ '/about.html')
})

app.get('/weather', (req, res)=>{
    console.log()
    if(req.query.address) {
        getForcast(req.query.address, res)
    } else {
        res.render('index', {
            title: "Weather",
            address: "Address was not sent",
            name: 'Kaira Jha'
        })
    }
})

app.get('/weather2', (req, res) => {
    const address = req.query.address
    geocode(address, (error, geodata) =>{
        if (error) {
            res.send({
                title: "Weather",
                address: error,
                name: 'Kaira Jha'
            })
        } else {
            forecast(geodata.latitude, geodata.logitude, (error, forcast) =>{
                if(error) {
                    res.send({
                        title: "Weather",
                        address: error,
                        name: 'Kaira Jha'
                    })
                } else {
                    console.log(forcast);
                    res.send({
                        forcast: 'Currently temperature is ' + forcast.temperature + ' degree celsius but feels like ' + forcast.feelslike + ' degree celsius Rain posibility ' + forcast.rain + '% and its is ' + forcast.weather_description ,
                        location: geodata.location,
                        address: address
                    })
                }
            })
        }
    })
})

const getForcast = (address, res) => {
    geocode(address, (error, geodata) =>{
        if (error) {
            res.render('index', {
                title: "Weather",
                address: error,
                name: 'Kaira Jha'
            })
        } else {
            forecast(geodata.latitude, geodata.logitude, (error, forcast) =>{
                if(error) {
                    res.render('index', {
                        title: "Weather",
                        address: error,
                        name: 'Kaira Jha'
                    })
                } else {
                    console.log(forcast);
                    res.render('index', {
                        title: "Weather",
                        address:  'Currently in ' + geodata.location +' temperature is ' + forcast.temperature + ' degree celsius but feels like ' + forcast.feelslike + ' degree celsius Rain posibility ' + forcast.rain + '% and its is ' + forcast.weather_description ,
                        name: 'Kaira Jha'
                    })
                }
            })
        }
    })
}


app.get('*', (req, res)=>{
    res.render('help', {
        title: "Help",
        message: "404 Help artical not found",
        name: 'Kaira Jha'
    })
})

app.listen(3000, ()=>{
    console.log("Server is running in port 3000")
})