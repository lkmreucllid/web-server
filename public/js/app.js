var address = '!'


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageHolder = document.querySelector('#messageHolder')
const messageDesc = document.querySelector('#messageDesc')
    //const weatherIcon = document.querySelector('#weatherIcon')

messageHolder.textContent = 'Loading...'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    var url = '/weather?address=' + location

    fetch(url).then((response) => {

            response.json().then((data) => {
                if (data.error) {
                    messageHolder.textContent = 'Error'
                    messageDesc.textContent = data.error
                    return false

                }
                //console.log(data)
                //weatherIcon.src = data.forecast.current.weather_icons[0]
                messageHolder.textContent = 'Searched Location: ' + data.location
                messageDesc.textContent = data.forecast.current.weather_descriptions[0] + '. It is currently ' + data.forecast.current.temperature + ' degrees out, feels like ' + data.forecast.current.feelslike + '.Humidity is ' + data.forecast.current.humidity + '%. There is ' + data.forecast.current.precip + '% chance of rain'
            })
        })
        //console.log('Testing' + location)
})