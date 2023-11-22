import { StyleSheet } from "react-native";

import { H1, H3, P, Subhead } from "@/components/StyledText";
import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { ModuleChart } from "@/components/modules/ModuleChart";
import { ModuleType } from "@/types/ModuleType";

export default function ModuleDetail(moduleProp: ModuleType) {
  const { module_id } = useLocalSearchParams();
  const module = moduleProp;

  return (
    <View style={styles.outerWrapper}>
      <H1 style={{ backgroundColor: module.colorCode }}>Testste</H1>
      <ModuleChart {...module}></ModuleChart>
      <View>
        <H3>Einheiten</H3>
        <View>
          {module.learningUnits.map((unit) => {
            return (
              <View style={styles.unitRow}>
                <View
                  style={[
                    styles.moduleIndicatorM,
                    { backgroundColor: unit.colorCode },
                  ]}
                />
                <View style={styles.unitRowTitle}>
                  <Subhead>{unit.name}</Subhead>
                  <P></P>
                </View>
                <Subhead>39 Std.</Subhead>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  unitRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  moduleIndicatorM: {
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
  unitRowTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
