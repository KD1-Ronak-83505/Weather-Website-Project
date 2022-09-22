


//NOTES:
//if some variable is not defined, then use this.var instead of just var, to resolve that problem

let weather = {
    apiKey: "ba9476e1ea2a9577aaa5dc2703fc3df4",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".inputSearch").value);  //this search function contains the weather details 
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () { weather.search(); });    
   //syntax: element.addEventListener(event(like mouse up, click, mouse down), function, useCapture(boolean value)) and here elemwnt is document.querySelector(".search button")  
//when the search button is clicked then the eventlistener will detect the click and invoke function() and it will invoke function weather.search()
  
  document
    .querySelector(".inputSearch")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Denver"); 