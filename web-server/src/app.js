const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

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
    res.send({
        forcast: "Partly Cloudy",
        location: "Broadmedows"
    })
})

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