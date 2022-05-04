var address = '!'


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageHolder = document.querySelector('#messageHolder')
const messageDesc = document.querySelector('#messageDesc')

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
                messageHolder.textContent = 'Searched Location: ' + data.location
                messageDesc.textContent = data.forecast.current.weather_descriptions[0] + ' ' + data.forecast.current.temperature + ' "C'
            })
        })
        //console.log('Testing' + location)
})