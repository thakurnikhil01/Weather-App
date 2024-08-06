const temperatureField = document.querySelector('.temp')
const cityField = document.querySelector('.time-location p')
const dateField = document.querySelector('.time-location span')
const emojiField = document.querySelector('.weather-condition img')
const weatherField = document.querySelector('.weather-condition span')
const form = document.querySelector('form')
const searchField = document.querySelector('.searchField')

let target = 'mumbai'
fetchData(target)

form.addEventListener('submit', search)
function search(e){
    e.preventDefault()
    target = searchField.value 

    fetchData(target)
}

async function fetchData(e) {
    try{
        let url = `https://api.weatherapi.com/v1/current.json?key=894fd7b6154f475aa64102901240308&q=${e}&aqi=no`

        let response = await fetch(url)
        let data = await response.json()

        let currentTemp = data.current.temp_c
        let currentCondition = data.current.condition.text
        let locationName = data.location.name
        let localTime = data.location.localtime
        let conditionEmoji = data.current.condition.icon 

        updateDom(currentTemp, currentCondition, locationName, localTime, conditionEmoji)
    }
    catch{
        console.log(error)
    }
}

function updateDom(temp, condition, location, time, emoji){
    let exactTime = time.split(" ")[1]
    let exactDate = time.split(" ")[0]

    const exactDay = getDayFullName(new Date(exactDate).getDay())
    console.log(exactDay)

    temperatureField.innerHTML = temp
    weatherField.innerHTML = condition
    cityField.innerHTML = location
    dateField.innerHTML = `${exactTime} ${exactDay} ${exactDate}`
    emojiField.src = emoji

    function getDayFullName(num){
        switch(num){
            case 0 : 
                return "Sunday";
            case 1 :
                return "Monday"
            case 2 : 
                return "Tuesday"
            case 3 :
                return "Wednesday"
            case 4 :
                return "Thursday"
            case 5 : 
                return "Friday"
            case 6 :
                return "Saturday"
            default :
                return "Don't Know"
        }
    }
}

