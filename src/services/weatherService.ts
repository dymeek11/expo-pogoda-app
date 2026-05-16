import { WeatherResponse } from "../types/weather";

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,wind_speed_10m,precipitation` +
    `&hourly=temperature_2m,precipitation_probability` +
    `&forecast_days=2`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Błąd API pogodowego");
  }

  return res.json();
}