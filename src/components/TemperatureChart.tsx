import { Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";

type Props = {
  temperatures: number[];
  times: string[];
};

export default function TemperatureChart({
  temperatures,
  times,
}: Props) {

  // co 2 godziny żeby wykres był czytelny
  const filteredTemps = temperatures
    .slice(0, 24)
    .filter((_, index) => index % 2 === 0);

  const filteredTimes = times
    .slice(0, 24)
    .filter((_, index) => index % 2 === 0)
    .map((time) => {
      const date = new Date(time);

      return `${date.getHours()}`;
    });

  return (
    <LineChart
      data={{
        labels: filteredTimes,
        datasets: [
          {
            data: filteredTemps,
          },
        ],
      }}
      width={Dimensions.get("window").width - 40}
      height={240}
      yAxisSuffix="°"

      chartConfig={{
        backgroundGradientFrom: "#1e293b",
        backgroundGradientTo: "#0f172a",

        decimalPlaces: 1,

        color: (opacity = 1) =>
          `rgba(255,255,255,${opacity})`,

        labelColor: (opacity = 1) =>
          `rgba(255,255,255,${opacity})`,

        propsForDots: {
          r: "5",
        },
      }}

      bezier

      style={{
        marginVertical: 12,
        borderRadius: 24,
      }}
    />
  );
}