const path = require('path')
const express = require('express')

const app = express()

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.send("<h1>Hello from Express server</h1>")
})

app.get('/help', (req, res)=>{
    res.sendFile(publicDir+ '/help.html')
})

app.get('/about', (req, res)=>{
    res.sendFile(publicDir+ '/about.html')
})

app.get('/weather', (req, res)=>{
    // console.log(res)
    res.send({
        forcast: "Partly Cloudy",
        location: "Broadmedows"
    })
})
app.listen(3000, ()=>{
    console.log("Server is running in port 3000")
})