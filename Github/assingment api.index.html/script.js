// script.js

document.getElementById("searchButton").addEventListener("click", function () {
  var countryName = document.getElementById("searchInput").value;
  fetch(`https://restcountries.com/v3/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      displayCountryData(data);
    })
    .catch((error) => console.log("Error fetching country data:", error));
});

function displayCountryData(data) {
  var countryDataContainer = document.getElementById("countryData");
  countryDataContainer.innerHTML = "";

  data.forEach((country) => {
    var countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
                 <img src="${country.flags[0]}" alt="${country.name.common}" style="width: 100px;">
                <p>Region: ${country.region}</p>
                <p>Subregion: ${country.subregion}</p>
                <button class="details-button"  data-country="${country.name.common}">More Details</button>
                   
                <!-- Add more country data here -->
                </div>
            `;
    countryDataContainer.appendChild(countryCard);
  });

  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", function () {
      var countryName = this.getAttribute("data-country");
      fetchWeatherData(countryName);
    });
  });
}

function fetchWeatherData(countryName) {
  var api_key = "bcf8b94ad06bb70ad4c2b26e61d11ab4";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${countryName}&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.main.temp && data.weather[0].description) {
        const temperature = data.main.temp;
        const condition = data.weather[0].description;
        Swal.fire({
          title: `Temperature: ${temperature}°C<br>Condition:${condition}`,
          showClass: {
            popup: `Temperature: ${temperature}°C<br>Condition: 
              ${condition}`,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Weather data not available!",
        });
      }
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Weather data not available!",
      });
    });
}
