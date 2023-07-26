var searchInput = document.getElementById("search")
var findInput = document.getElementById("findInput")
let weatherList={}
async function getData(city){
let url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=75b499952a1e411288280146232502&q=${city}&days=3`)
let data = await url.json();
    weatherList = data
disPlay()
disPlayDay2()
}
getData("cairo");
function disPlay(){
    document.getElementById("tempCelsiusCurrent").innerHTML = `${weatherList.current.temp_c}<sup>o</sup>C`
    document.getElementById("currentTextOne").innerHTML = weatherList.current.condition.text
    document.querySelector(".name-city").innerHTML = weatherList.location.name
    document.getElementById("iconOne").setAttribute("src",`https:${weatherList.current.condition.icon}`)
    let iconWeather=`<span> <img src="images/icon-umberella.png" class="me-1">
    ${weatherList.current.precip_mm}%
           </span>
          <span>
    <img src="images/icon-wind.png" id="windIcon" class="me-1">
    ${weatherList.current.wind_kph}km/h
    </span>                                    
     <span>
    <img src="images/icon-compass.png" class="me-1">
    ${weatherList.current.wind_dir}
    </span>`
    document.querySelector(".icon-weather").innerHTML = iconWeather
}
 function disPlayDay2(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i=0; i<3 ;i++) {
        var forecastday = weatherList.forecast.forecastday;
        const m = new Date(forecastday[0].date);
        let month = monthNames[m.getMonth()]; 
        const d = new Date(forecastday[i].date); 
        let day = weekday[d.getDay()]; 
        document.getElementById(`day-${i+1}`).innerHTML = day 
        document.getElementById("dateOne").innerHTML = ((forecastday[0].date).split("-"))[2] + " " + (month.split("",3)).join("");
        document.getElementById(`tempCelsiusMax-${i+1}`).innerHTML = `${forecastday[i+1].day.maxtemp_c}<sup>o</sup>C`
        document.getElementById(`tempCelsiusMin-${i+1}`).innerHTML = `${forecastday[i+1].day.mintemp_c}<sup>o</sup>C`
        document.getElementById(`icon-${i+1}`).setAttribute("src",`https:${forecastday[i+1].day.condition.icon}`)
        document.getElementById(`conditionText-${i+1}`).innerHTML = `${forecastday[i+1].day.condition.text}`
    }
}
findInput.addEventListener("click",(function(){
    var city  = searchInput.value
    getData(city);

}))
searchInput.addEventListener("keyup",(function(){
    var city  = searchInput.value
    getData(city);

}))