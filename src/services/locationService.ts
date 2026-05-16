import * as Location from "expo-location";

export type UserLocation = {
  latitude: number;
  longitude: number;

  city?: string;
  region?: string;
  country?: string;
};

export async function getUserLocation(): Promise<UserLocation> {

  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Brak zgody na lokalizację");
  }

  const location =
    await Location.getCurrentPositionAsync({});

  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  // reverse geocoding
  const reverse =
    await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

  const place = reverse[0];

  return {
    latitude,
    longitude,

    city:
      place?.city ||
      place?.district ||
      "Nieznane miasto",

    region:
      place?.region ||
      place?.subregion ||
      "Nieznany region",

    country:
      place?.country ||
      "Nieznany kraj",
  };
}