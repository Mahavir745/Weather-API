// api: http://api.weatherapi.com/v1/forecast.json?key=ceda5598ead348a591752004242110&q=dhanbad&days=7&aqi=no&alerts=no

const btn = document.querySelector("#search")

let allData = [];
const empty = ""


const child3 = document.querySelector(".child3")
const weatherTitle = document.querySelector("#weatherTitle")


for(let i = 0; i<3; i++){
  const weatherContainer = document.createElement("div")
  const icon = document.createElement("img")
  const weather = document.createElement("h3")
  const sunrise = document.createElement("span")
  const sunset = document.createElement("span")
  const dateC = document.createElement("p")
  const TempC = document.createElement("span")
  const TempF = document.createElement("span")

  weatherContainer.className = `weatherChild${i}`;
  icon.className = `weatherIcon${i}`;
  weather.className = `weatherName${i}`;
  sunrise.className = `sunrise${i}`;
  sunset.className = `sunset${i}`;
  dateC.className = `date${i}`;
  TempC.className = `TempC${i}`;
  TempF.className = `TempF${i}`;

  weatherContainer.append(weather,icon,dateC,sunrise,sunset,TempC,TempF)
  child3.appendChild(weatherContainer)
}



btn.addEventListener("click", () => {
  const cityname = document.querySelector("#cityName");
  cityname.innerHTML = " "
  weatherTitle.textContent = cityname.value

  allData = []

  api(cityname.value).then((data) => {
    return data.forecast.forecastday;
  })
  .then((forecastDays) => {    
    forecastDays.forEach((day) => {
      let obj = {
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        date: day.date,
        tempF: day.day.mintemp_f,
        tempC: day.day.mintemp_c,
        weather_condition: day.day.condition.text,
        weather_icon: day.day.condition.icon,
      };
      allData.push(obj);
    });
  
    allData.forEach((ele,index)=>{
      const weather_icon = document.querySelector(`.weatherIcon${index}`)
      const weatherName = document.querySelector(`.weatherName${index}`)
      const sunrise = document.querySelector(`.sunrise${index}`)
      const sunset = document.querySelector(`.sunset${index}`)
      const date = document.querySelector(`.date${index}`)
      const TempC = document.querySelector(`.TempC${index}`)
      const TempF = document.querySelector(`.TempF${index}`)

      weather_icon.src = ele.weather_icon;
      weatherName.textContent = ele.weather_condition;
      sunrise.textContent = `${ele.sunrise}\nSunrise:`;
      sunset.textContent = `${ele.sunset}\nSunset:`;
      date.textContent = ele.date.split("-").reverse().join("-");
      TempC.textContent = `${ele.tempC}'C`;
      TempF.textContent = `${ele.tempF}'F`

      const inputField = document.querySelector("#cityName");
      inputField.value = "";
      child3.style.display = "flex"
    
    })
  });
});

async function api(cityname) {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ceda5598ead348a591752004242110&q=${cityname}&days=7&aqi=no&alerts=no`);
  const data = await response.json();
  return data;
}
