const request = require('request')

const geoForecast = (long, lat, callback ) => {
    const url = 'https://api.darksky.net/forecast/e6e084cb9b16fed9d23199cd96be6b2b/' + long + ',' + lat + '?units=si'
    request({url: url, json: true}, function(error, response){
            if (error){
                callback('Please check your internet', undefined)
            }else if(response.body.code){
             
                callback('Cordinates is wrong', undefined)
            
            } else {
                const data = response.body//This is the output when you see it on chrome by hitting the URL. So here response.body is require to get that value. Only response wont work
                const currentWeather = data.currently
                //const daily = data.daily[0]
                //console.log(currentWeather)
                callback(undefined, {
                    temperature: currentWeather.temperature,
                    precip: currentWeather.precipProbability,
                    summary: currentWeather.summary,
                    feelslike: currentWeather.apparentTemperature,
                    lowest: currentWeather.dewPoint,
                    humidity: currentWeather.humidity
                })
                // console.log("Its currently " + currentWeather.temperature + " outside and " + currentWeather.precipProbability + "% chances of rain")
                // console.log(data.daily.data[0].summary)
                //console.log(response)
           }
        }
    )
}
module.exports = geoForecast