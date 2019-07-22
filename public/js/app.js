console.log('Client side java script is loaded')

const weatherForm = document.querySelector('form')//select the element from our HTML document that we are trying to work with
//Here a get java script representation of that element and we can use that to manipulate when user enter something

const accessToInput = document.querySelector('input')
const messegeSuccessLocation = document.querySelector('#messege-1')
const messegeSuccess = document.querySelector('#messege-2')
const feelslike = document.querySelector('#feelslike') 
const lowest = document.querySelector('#lowest') 
const humidity = document.querySelector('#humidity') 

weatherForm.addEventListener('submit', (e) => { //Here the callback function calls every time the event occurs
    e.preventDefault()
    const value = accessToInput.value
    //console.log(weatherForm, 'testing')
    //console.log(value)
    messegeSuccessLocation.textContent = ''
    messegeSuccess.textContent = 'Loading..'
    feelslike.textContent = ''
    lowest.textContent = ''
    humidity.textContent = ''
        fetch('/weather?address=' + value).then((it_Will_Run_Onlyif_fecth_work) => {
        it_Will_Run_Onlyif_fecth_work.json().then((convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work) => {
            if (convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.error){
                //console.log(convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.error)
                messegeSuccess.textContent = convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.error
            }
            else {
                //console.log(convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.location)
                
                const lowestv = convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.lowest
                const humidityv = convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.humidity
 
                const output = "Outside temperature is " + convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.temp +
                               " °C Chances of rain is " + convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.rain + " % " +
                               "Overall its " + convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.summary
                messegeSuccessLocation.textContent = "Location: " + convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.location
                messegeSuccess.textContent = output
                feelslike.textContent = "Currently it feels like " + convert_itInto_JSONdata_from_it_Will_Run_Onlyif_fecth_work.feelslike + " °C"
                lowest.textContent = "Todays temperature will go down upto " + lowestv + " °C"
                humidity.textContent = "Humidity " + humidityv + " %"
             }
        })
    })
//Here we are using fetch() as it is going to get called from client side
})
