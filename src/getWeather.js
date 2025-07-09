export default async function getWeather() {
  const location = document.querySelector(".search-bar").value;
  const unit = document.querySelector(".active").dataset.unit;
  try {
    const params = new URLSearchParams({
      unitGroup: unit,
      key: "63MQLFZ66CC6BMWUYZK87BPEA",
      contentType: "json",
    });

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?${params}`;

    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    return data.currentConditions;
  } catch (error) {
    throw error;
  }
}
