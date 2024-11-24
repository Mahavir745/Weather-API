const Api_key = "3f3a9ec87f18b0c1136f4da517785b1a";
const searchbtn = document.querySelector("#search");
const cityname = document.querySelector("#cityName span");
const sky = document.querySelector("#sky");
const temp_max = document.querySelector("#temp_max");
const temp_min = document.querySelector("#temp_min");
const hourlyUpdate = document.querySelector("#hourlyUpdate");
const speed = document.querySelector("#speed");
const deg = document.querySelector("#deg");
const gust = document.querySelector("#gust");
const days_5_container = document.querySelector(".days_5_container")
const date_or_day = document.querySelector("#date_or_day")
const humidity = document.querySelector("#humidity")
const sealevel = document.querySelector("#sealevel")


let allDaysData = [];

searchbtn.addEventListener("click", () => {
  const City_name = document.querySelector("#inputName").value.toLowerCase();

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${City_name}&limit=1&appid=${Api_key}`)
    .then(data => data.json())
    .then((data) => {

      allDaysData = [];
      return weatherforcast(data[0].lat, data[0].lon, Api_key);
    });
});

function weatherforcast(lat, lon, Api_key) {
  const Api_Url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Api_key}&units=metric`;

  fetch(Api_Url)
    .then(data => data.json())
    .then((data) => {
      const cityN = data.city.name;
      const weatherlist = data.list;
      let arr = [];
      let day1 = [];
      let day2 = [];
      let day3 = [];
      let day4 = [];
      let day5 = [];
      let day6 = [];


      weatherlist.forEach((item) => {
        const fetchDate = item.dt_txt.split(" ")[0];
        let obj = {
          date: fetchDate,
          time: item.dt_txt.split(" ")[1],
          ground_level: item.main.grnd_level,
          humidity: item.main.humidity,
          sea_level: item.main.sea_level,
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          weather: {
            sky: item.weather[0].main,
            describe: item.weather[0].description
          },
          wind: {
            speed: item.wind.speed,
            deg: item.wind.deg,
            gust: item.wind.gust
          },
        };
        allDaysData.push(obj);

        if (!arr.includes(fetchDate)) {
          arr.push(fetchDate);
        }
      });

      day1 = allDaysData.filter(weather => weather.date === arr[0]);
      day2 = allDaysData.filter(weather => weather.date === arr[1]);
      day3 = allDaysData.filter(weather => weather.date === arr[2]);
      day4 = allDaysData.filter(weather => weather.date === arr[3]);
      day5 = allDaysData.filter(weather => weather.date === arr[4]);
      day6 = allDaysData.filter(weather => weather.date === arr[5]);


      storeWeatherData(day1, day2, day3, day4, day5, day6, cityN);
    });
}

function storeWeatherData(day1, day3, day3, day4, day5, day6, cityN) {

  hourlyUpdate.innerHTML = '';
  cityname.innerHTML = cityN;

  let skyrep;
  let temp_max_rep = 0;
  let temp_min_rep = 0;
  let count = 0;
  let speed_rep, deg_rep, gust_rep;
  let currentDate;
  let humidity_rep, sea_level;

  day1.forEach((ele) => {
    skyrep = ele.weather.describe;
    currentDate = ele.date;
    temp_max_rep += ele.temp_max;
    temp_min_rep += ele.temp_min;
    speed_rep = ele.wind.speed;
    deg_rep = ele.wind.deg;
    gust_rep = ele.wind.gust;
    humidity_rep = ele.humidity,
      sea_level = ele.sea_level
    count += 1;

    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let h2 = document.createElement("h2");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let img = document.createElement("img")

    span1.className = "hour";
    span2.className = "hourly_sky";

    h3.appendChild(span1);
    h2.appendChild(span2);
    h3.innerHTML = ele.time;
    h2.innerHTML = skyrep.toLowerCase();
    div.append(h3, h2, img);
    div.className = "hourlyData";
    hourlyUpdate.append(div);

    if (skyrep === "broken clouds") {
      img.src = "./asset/assest_03.png"
    }
    if (skyrep === "overcast clouds") {
      img.src = "./asset/assest_20.png"
    }
    else if (skyrep === "scattered clouds") {
      img.src = "./asset/assest_17.png"
    }
    else if (skyrep === "few clouds") {
      img.src = "./asset/assest_19.png"
    }
    else if (skyrep === "clear sky") {
      img.src = "./asset/assest_01.png"
    }
    else if (skyrep === "shower rain") {
      img.src = "./asset/assest_10.png"
    }
    else if (skyrep === "rain") {
      img.src = "./asset/assest_18.png"
    }
    else if (skyrep === "thunderstorm") {
      img.src = "./asset/assest_07.png"
    }
    else if (skyrep === "snow") {
      img.src = "./asset/assest_16.png"
    }
    else if (skyrep === "mist") {
      img.src = "./asset/assest_12.png"
    }

  });

  if (temp_max > 37) {
    days_5_container.style.backgroundImage = "url(./asset/assest_14.png)";
  } else if (temp_max > 26) {
    days_5_container.style.backgroundImage = "url(./asset/assest_05.png)";
  } else {
    days_5_container.style.backgroundImage = "url(./asset/assest_15.png)";
  }

  date_or_day.innerHTML = currentDate.split("-").reverse().join("-")
  sky.innerHTML = skyrep;
  temp_max.innerHTML = (temp_max_rep / count).toFixed(2);
  temp_min.innerHTML = (temp_min_rep / count).toFixed(2);
  speed.innerHTML = speed_rep;
  deg.innerHTML = deg_rep;
  gust.innerHTML = gust_rep;
  humidity.innerHTML = humidity_rep
  sealevel.innerHTML = sea_level


  for (let i = 0; i < 5; i++) {
    let container = document.createElement("div")
    let child1 = document.createElement("div")
    let child2 = document.createElement("div")
    let child3 = document.createElement("div")
    let img = document.createElement("img")
    let p1 = document.createElement("p")
    let span1_child = document.createElement("span")
    let p2 = document.createElement("p")
    let span2_child = document.createElement("span")
    let p3 = document.createElement("p")
    let span3_child = document.createElement("span")
    

    container.className = "day_5_forecast"
    child1.className = "day_5_logo"
    span1_child.className = `day_5_date${i + 1}`
    span2_child.className = `day_5_temp${i + 1}`
    span3_child.className = `day_5_title${i + 1}`
    img.className = `logo${i + 1}`

    p1.innerHTML = "Date: "
    p2.innerHTML = "Minimum Temp: "
    p3.innerHTML = "Weather: "

    p1.appendChild(span1_child)
    p2.appendChild(span2_child)
    p3.appendChild(span3_child)
    child1.appendChild(img)
    child2.appendChild(p1)
    child3.append(p2,p3)
    container.append(child1, child2, child3)
    days_5_container.append(container)
  }

  let logo1 = document.querySelector(".logo1")
  let logo2 = document.querySelector(".logo2")
  let logo3 = document.querySelector(".logo3")
  let logo4 = document.querySelector(".logo4")
  let logo5 = document.querySelector(".logo5")
  let day_date1 = document.querySelector(".day_5_date1")
  let day_date2 = document.querySelector(".day_5_date2")
  let day_date3 = document.querySelector(".day_5_date3")
  let day_date4 = document.querySelector(".day_5_date4")
  let day_date5 = document.querySelector(".day_5_date5")
  let day_temp1 = document.querySelector(".day_5_temp1")
  let day_temp2 = document.querySelector(".day_5_temp2")
  let day_temp3 = document.querySelector(".day_5_temp3")
  let day_temp4 = document.querySelector(".day_5_temp4")
  let day_temp5 = document.querySelector(".day_5_temp5")
  let day_title1 = document.querySelector(".day_5_title1")
  let day_title2 = document.querySelector(".day_5_title2")
  let day_title3 = document.querySelector(".day_5_title3")
  let day_title4 = document.querySelector(".day_5_title4")
  let day_title5 = document.querySelector(".day_5_title5")



  // ! ****8

  let date2,title1;
  let temp1 = 0

  day3.forEach((ele) => {
    title1 = ele.weather.describe;
    date2 = ele.date;
    temp1 += ele.temp_min;
  });

  if (title1 === "broken clouds") {
    logo1.src = "./asset/assest_03.png"
  }
  if (title1 === "overcast clouds") {
    logo1.src = "./asset/assest_20.png"
  }
  else if (title1 === "scattered clouds") {
    logo1.src = "./asset/assest_17.png"
  }
  else if (title1 === "few clouds") {
    logo1.src = "./asset/assest_19.png"
  }
  else if (title1 === "clear sky") {
    logo1.src = "./asset/assest_01.png"
  }
  else if (title1 === "shower rain") {
    logo1.src = "./asset/assest_10.png"
  }
  else if (title1 === "rain") {
    logo1.src = "./asset/assest_18.png"
  }
  else if (title1 === "thunderstorm") {
    logo1.src = "./asset/assest_07.png"
  }
  else if (title1 === "snow") {
    logo1.src = "./asset/assest_16.png"
  }
  else if (title1 === "mist") {
    logo1.src = "./asset/assest_12.png"
  }

  day_date1.innerHTML = date2.split("-").reverse().join("-")
  day_temp1.innerHTML = (temp1/day3.length).toFixed(2)
  day_title1.innerHTML = title1
  

// !!!!1

  let date3,title2;
  let temp2 = 0

  day3.forEach((ele) => {
    title2 = ele.weather.describe;
    date3 = ele.date;
    temp2 += ele.temp_min;
  });

  if (title2 === "broken clouds") {
    logo2.src = "./asset/assest_03.png"
  }
  if (title2 === "overcast clouds") {
    logo2.src = "./asset/assest_20.png"
  }
  else if (title2 === "scattered clouds") {
    logo2.src = "./asset/assest_17.png"
  }
  else if (title2 === "few clouds") {
    logo2.src = "./asset/assest_19.png"
  }
  else if (title2 === "clear sky") {
    logo2.src = "./asset/assest_01.png"
  }
  else if (title2 === "shower rain") {
    logo2.src = "./asset/assest_10.png"
  }
  else if (title2 === "rain") {
    logo2.src = "./asset/assest_18.png"
  }
  else if (title2 === "thunderstorm") {
    logo2.src = "./asset/assest_07.png"
  }
  else if (title2 === "snow") {
    logo2.src = "./asset/assest_16.png"
  }
  else if (title2 === "mist") {
    logo2.src = "./asset/assest_12.png"
  }

  day_date2.innerHTML = date3.split("-").reverse().join("-")
  day_temp2.innerHTML = (temp2/day3.length).toFixed(2)
  day_title2.innerHTML = title2
  

  // ! ********************************

  let date4,title3;
  let temp3 = 0

  day4.forEach((ele) => {
    title3 = ele.weather.describe;
    date4 = ele.date;
    temp3 += ele.temp_min;
  });

  if (title3 === "broken clouds") {
    logo3.src = "./asset/assest_03.png"
  }
  if (title3 === "overcast clouds") {
    logo3.src = "./asset/assest_20.png"
  }
  else if (title3 === "scattered clouds") {
    logo3.src = "./asset/assest_17.png"
  }
  else if (title3 === "few clouds") {
    logo3.src = "./asset/assest_19.png"
  }
  else if (title3 === "clear sky") {
    logo3.src = "./asset/assest_01.png"
  }
  else if (title3 === "shower rain") {
    logo3.src = "./asset/assest_10.png"
  }
  else if (title3 === "rain") {
    logo3.src = "./asset/assest_18.png"
  }
  else if (title3 === "thunderstorm") {
    logo3.src = "./asset/assest_07.png"
  }
  else if (title3 === "snow") {
    logo3.src = "./asset/assest_16.png"
  }
  else if (title3 === "mist") {
    logo3.src = "./asset/assest_12.png"
  }

  day_date3.innerHTML = date4.split("-").reverse().join("-")
  day_temp3.innerHTML = (temp3/day4.length).toFixed(2)
  day_title3.innerHTML = title3

  // ! *******************************************
  let date5,title4;
  let temp4 = 0

  day5.forEach((ele) => {
    title4 = ele.weather.describe;
    date5 = ele.date;
    temp4 += ele.temp_min;
  });

  if (title4 === "broken clouds") {
    logo4.src = "./asset/assest_03.png"
  }
  if (title4 === "overcast clouds") {
    logo4.src = "./asset/assest_20.png"
  }
  else if (title4 === "scattered clouds") {
    logo4.src = "./asset/assest_17.png"
  }
  else if (title4 === "few clouds") {
    logo4.src = "./asset/assest_19.png"
  }
  else if (title4 === "clear sky") {
    logo4.src = "./asset/assest_01.png"
  }
  else if (title4 === "shower rain") {
    logo4.src = "./asset/assest_10.png"
  }
  else if (title4 === "rain") {
    logo4.src = "./asset/assest_18.png"
  }
  else if (title4 === "thunderstorm") {
    logo4.src = "./asset/assest_07.png"
  }
  else if (title4 === "snow") {
    logo4.src = "./asset/assest_16.png"
  }
  else if (title4 === "mist") {
    logo4.src = "./asset/assest_12.png"
  }

  day_date4.innerHTML = date5.split("-").reverse().join("-")
  day_temp4.innerHTML = (temp4/day5.length).toFixed(2)
  day_title4.innerHTML = title4

  // ! *******************************************

  let date6,title5;
  let temp5 = 0

  day6.forEach((ele) => {
    title5 = ele.weather.describe;
    date6 = ele.date;
    temp5 += ele.temp_min;
  });

  if (title5 === "broken clouds") {
    logo5.src = "./asset/assest_03.png"
  }
  if (title5 === "overcast clouds") {
    logo5.src = "./asset/assest_20.png"
  }
  else if (title5 === "scattered clouds") {
    logo5.src = "./asset/assest_17.png"
  }
  else if (title5 === "few clouds") {
    logo5.src = "./asset/assest_19.png"
  }
  else if (title5 === "clear sky") {
    logo5.src = "./asset/assest_01.png"
  }
  else if (title5 === "shower rain") {
    logo5.src = "./asset/assest_10.png"
  }
  else if (title5 === "rain") {
    logo5.src = "./asset/assest_18.png"
  }
  else if (title5 === "thunderstorm") {
    logo5.src = "./asset/assest_07.png"
  }
  else if (title5 === "snow") {
    logo5.src = "./asset/assest_16.png"
  }
  else if (title5 === "mist") {
    logo5.src = "./asset/assest_12.png"
  }

  day_date5.innerHTML = date6.split("-").reverse().join("-")
  day_temp5.innerHTML = (temp5/day6.length).toFixed(2)
  day_title5.innerHTML = title5

  // ! *******************************************

}


