import { ScrollView, StyleSheet, Text, View } from "react-native";

type Props = {
  times: string[];
  temperatures: number[];
};

export default function HourlyForecast({
  times,
  temperatures,
}: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {times.slice(0, 24).map((time, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.hour}>
            {new Date(time).getHours()}:00
          </Text>

          <Text style={styles.temp}>
            {temperatures[index]}°C
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    alignItems: "center",
  },

  hour: {
    color: "white",
    fontSize: 16,
  },

  temp: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});