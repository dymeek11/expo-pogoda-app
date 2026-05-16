import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "WEATHER_CACHE";

export async function saveWeather(data: any) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function getWeatherCache() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}