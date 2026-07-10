
const body = document.querySelector("body")
const inputBox = document.querySelector(".inputBox")
const searchBtn = document.querySelector(".searchBtn")
const cityInput = document.querySelector(".cityInput")
const backBtn = document.querySelector(".back-btn")

const box = document.querySelector(".box")

const city = document.querySelector(".city")
const weather = document.querySelector(".weather")
const tamp = document.querySelector(".temp")
const mausam = document.querySelector('.mausam')

const hum = document.querySelector('.hum')
const wind = document.querySelector(".wind")
const time = document.querySelector(".time")

// Animation helpers
function animShow(el, animClass = "anim-fade-in") {
    el.classList.remove("hide")
    el.classList.remove("anim-fade-out", "anim-pop-in")
    void el.offsetWidth
    el.classList.add(animClass)
}

function animHide(el, animClass = "anim-fade-out") {
    el.classList.remove("anim-fade-in", "anim-pop-in")
    void el.offsetWidth
    el.classList.add(animClass)
    el.addEventListener("animationend", function handler() {
        el.classList.remove(animClass)
        el.classList.add("hide")
        el.removeEventListener("animationend", handler)
    })
}

const getData = async () => {
    let area = cityInput.value.trim()
    if (area === "") return

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${area}?unitGroup=metric&key=L2RXXVWX8AKX6AF7FX23F6E8V`)

    const data = await response.json()

    let dateTime = data.currentConditions.datetime
    let humidity = data.currentConditions.humidity
    let icon = data.currentConditions.icon
    let tapman = data.currentConditions.temp
    let windSpeed = data.currentConditions.windspeed
    let conditions = data.currentConditions.conditions

    city.innerHTML = "📍"+area
    weather.innerHTML = icon
    tamp.innerHTML = tapman+"°C"
    wind.innerHTML = "🌬️Wind "+windSpeed+"km"
    time.innerHTML = "🕒"+dateTime
    hum.innerHTML = "💧Humidity "+humidity+"%"
    mausam.innerHTML = conditions

    animHide(inputBox, "anim-fade-out")
    animShow(box, "anim-pop-in")

    const card = document.querySelector(".card")
    card.classList.add("card-glow")

    if(tapman < 10) {
        tamp.classList.add("temp1")
    } else if(tapman  > 10 && tapman < 40) {
        tamp.classList.add("temp2")
    } else{
        tamp.classList.add("temp3")
    }
}

searchBtn.addEventListener("click", () => {
    getData()
})

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getData()
    }
})

backBtn.addEventListener("click", () => {
    const card = document.querySelector(".card")
    card.classList.remove("card-glow")
    cityInput.value = ""
    animShow(inputBox, "anim-fade-in")
    animHide(box, "anim-fade-out")
})
    