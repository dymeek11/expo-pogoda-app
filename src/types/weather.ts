export type WeatherResponse = {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    precipitation: number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
  };
};