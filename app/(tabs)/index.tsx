import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getUserLocation } from "../../src/services/locationService";
import { getWeather } from "../../src/services/weatherService";

import {
  getWeatherCache,
  saveWeather,
} from "../../src/storage/cache";

import { WeatherResponse } from "../../src/types/weather";

import HourlyForecast from "../../src/components/HourlyForecast";
import MapCard from "../../src/components/MapCard";
import TemperatureChart from "../../src/components/TemperatureChart";

export default function Index() {

  const [weather, setWeather] =
    useState<WeatherResponse | null>(null);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string | null>(null);

  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [locationName, setLocationName] =
    useState("");

  const loadWeather = async () => {

    try {

      setLoading(true);
      setError(null);

      // GPS + reverse geocoding
      const location =
        await getUserLocation();

      setCoords({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setLocationName(
        `${location.city}, ${location.region}, ${location.country}`
      );

      // WEATHER API
      const data = await getWeather(
        location.latitude,
        location.longitude
      );

      setWeather(data);

      // CACHE
      await saveWeather(data);

    } catch (e: any) {

      setError(e.message);

      // fallback cache
      const cached =
        await getWeatherCache();

      if (cached) {
        setWeather(cached);
      }

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  // LOADING SCREEN
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="white"
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>
        🌦️ Pogoda teraz
      </Text>

      {/* LOCATION */}
      <Text style={styles.locationText}>
        📍 {locationName}
      </Text>

      {/* ERROR */}
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {/* CURRENT WEATHER */}
      {weather?.current && (
        <>

          <View style={styles.card}>

            <Text style={styles.bigTemp}>
              {weather.current.temperature_2m}°C
            </Text>

            <Text style={styles.info}>
              💨 Wiatr:
              {" "}
              {weather.current.wind_speed_10m}
              {" "}
              km/h
            </Text>

            <Text style={styles.info}>
              🌧️ Opad:
              {" "}
              {weather.current.precipitation}
            </Text>

          </View>

          {/* MAP */}
          <Text style={styles.section}>
            📍 Lokalizacja GPS
          </Text>

          <MapCard
            latitude={coords.latitude}
            longitude={coords.longitude}
          />

          {/* CHART */}
          <Text style={styles.section}>
            📊 Temperatura 24h
          </Text>

          <TemperatureChart
            temperatures={
              weather.hourly.temperature_2m
            }

            times={
              weather.hourly.time
            }
          />

          {/* FORECAST */}
          <Text style={styles.section}>
            🕒 Prognoza godzinowa
          </Text>

          <HourlyForecast
            times={weather.hourly.time}

            temperatures={
              weather.hourly.temperature_2m
            }
          />

        </>
      )}

      {/* REFRESH */}
      <View style={styles.refreshButton}>
        <Button
          title="Odśwież pogodę"
          onPress={loadWeather}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 8,
  },

  locationText: {
    color: "#cbd5e1",
    fontSize: 18,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 28,
    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 8,
  },

  bigTemp: {
    color: "white",
    fontSize: 54,
    fontWeight: "bold",
  },

  info: {
    color: "#cbd5e1",
    fontSize: 18,
    marginTop: 12,
  },

  section: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 12,
  },

  error: {
    color: "#ef4444",
    fontSize: 16,
    marginBottom: 20,
  },

  refreshButton: {
    marginTop: 30,
    marginBottom: 50,
  },

});