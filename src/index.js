import "./css/styles.css";
import getWeather from "./getWeather.js";

function init() {
  const searchBtn = document.querySelector(".search-btn");
  const searchBar = document.querySelector(".search-bar");
  const celsius = document.querySelector(".celsius");
  const fahrenheit = document.querySelector(".fahrenheit");

  celsius.dataset.unit = "metric";
  fahrenheit.dataset.unit = "us";

  celsius.addEventListener("click", () => {
    if (celsius.classList.contains("active")) return;
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    updateWeather();
  });

  fahrenheit.addEventListener("click", () => {
    if (fahrenheit.classList.contains("active")) return;
    fahrenheit.classList.add("active");
    celsius.classList.remove("active");
    updateWeather();
  });

  searchBtn.addEventListener("click", () => {
    updateWeather();
  });

  searchBar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      updateWeather();
    }
  });

  async function updateWeather() {
    const weatherReport = document.querySelector(".weather-report");
    try {
      const report = await getWeather();
      console.log(report);

      const icon = document.createElement("img");
      const iconModule = await import(`./assets/${report.icon}.svg`);
      icon.src = iconModule.default;

      const temp = document.createElement("p");
      temp.textContent = `${report.temp}°`;

      const description = document.createElement("p");
      description.textContent = report.conditions;

      const feelsLike = document.createElement("p");
      feelsLike.textContent = `Feels like: ${report.feelslike}°`;

      const humidity = document.createElement("p");
      humidity.textContent = `Humidity: ${report.humidity}%`;

      weatherReport.innerHTML = "";
      weatherReport.append(icon, temp, description, feelsLike, humidity);

      searchBar.value = "";
    } catch (error) {
      console.log(error);
    }
  }
}

init();
