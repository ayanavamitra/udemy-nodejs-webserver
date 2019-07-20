const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoLocation = require('./utils/geocode.js')
const geoForecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const pathPublicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)//partials

app.use(express.static(pathPublicDirectory)) //its a way to costomize your server to serve up that folder

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Index',
        name: "Ayanava",
        address: 'Kolkata'
    })
})

// app.get('', (req, res) => {  //Here erq means what is coming as a request from the web page. And resposee means what response we are sending from our backend to the server
//     res.send("<h1>Sending resonse from backend</h1>")
// }) //This is commented cause when we are using app.use() then app.use()'s index.html page is coming as root

// app.get('/help', (req,res) =>{ //These are call route handler
//     res.send({  //Express is gonna detect that we have provided a obj, it automatically stringify JSON amd display in browser
//         name: "Ayanava",
//         age: 26
//     })
// })

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help',
        name: 'Ayanava',
        helptext: 'This is a help page'
    })
})

// app.get('/about', (req,res) =>{
//     res.send("Help Page")
// })

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About',
        name: "Ayanava",
        about: "Ayanava Mitra"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: "Please enter a valid address"
        })
    }
    const address = req.query.address
    geoLocation(address, (error,data) =>{
        if(error){
            return res.send({ error })
        }
        const place = data.place
        
        geoForecast(data.latitude , data.longitude, (error, data) => {
            if(error){
                return res.send({ error })
            }
           const rainPercentage = data.precip*100
           const humidity = data.humidity*100
           res.send({
               location: place,
               rain: rainPercentage,
               temp: data.temperature,
               summary: data.summary,
               feelslike: data.feelslike,
               lowest: data.lowest,
               humidity
           }) 
        })
    }) 

    // res.send({  //Express is gonna detect that we have provided a obj, it automatically stringify JSON amd display in browser
    //     location: "Kolkata",
    //     address: req.query.address,
    //     temp: temp
    // })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
      return res.send({
            error: "Plesae type in something for serach"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Ayanava',
        errorMessage: "This help page is not found"
    })
})

app.get('*', (req, res) => {
    //res.send("404 (Page Not Found)")
    res.render('404', {
        title: "404",
        name: 'Ayanava',
        errorMessage: "404 Page not found"
    })
})

app.listen(3000, () =>{ //Use to start the http server on a specific port
    console.log('Server Started')
}) 