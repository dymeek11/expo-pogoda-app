import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  latitude: number;
  longitude: number;
};

export default function MapCard({ latitude, longitude }: Props) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: 220,
  },
});