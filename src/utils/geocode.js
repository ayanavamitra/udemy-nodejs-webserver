const request = require('request')

const geoLocation = (address, callback) => {
    const location = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXlhbmF2YW1pdHJhIiwiYSI6ImNqeHltNmp1cTBieGMzbXFwZnh3czlmZDIifQ.XNoQReKVoafGftTZAiCfNg&limit=1'

    request({url: location, json: true}, (error,response) => {
        if (error){
            callback(' Please check your internet connection', undefined)
            //console.log("check your internet")
        } else if (!response.body.features[0]){
            callback('Unable to find location. Try another search.', undefined)
            //console.log("Please type a valid location")
        }
        else{
            const locationData = response.body
            //console.log('Location is ' + locationData.features[0].center)
            callback (undefined , {
                latitude: locationData.features[0].center[1],
                longitude: locationData.features[0].center[0],
                place: locationData.features[0].place_name
            })
         }
    })
}

module.exports = geoLocation