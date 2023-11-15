import { MoreVertical } from "lucide-react-native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { ModuleChart } from "./ModuleChart";

export interface IModule {
  x: number;
  y: number;
  id: number;
  name: string;
  time: number;
  color: string;
}

export function ModuleCard() {
  const testdata = [
    {
      x: 1,
      y: 1,
      id: 1,
      name: "Vorlesung",
      time: 40,
      color: "#F9D477",
    },
    {
      x: 2,
      y: 2,
      id: 2,
      name: "Praktikum",
      time: 10,
      color: "#6FB9E2",
    },
    {
      x: 3,
      y: 3,
      id: 3,
      name: "Nachhilfe",
      time: 10,
      color: "#D16E6E",
    },
    {
      x: 4,
      y: 4,
      id: 4,
      name: "Selbststudium",
      time: 60,
      color: "#88A795",
    },
  ];

  return (
    <View style={styles.outerWrapper}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextRow}>
          <View style={styles.moduleIndicator} />
          <Text style={styles.highlightText}>Datenbanksysteme 2</Text>
        </View>
        <TouchableOpacity>
          <MoreVertical size={28} fill="black" strokeWidth={1}></MoreVertical>
        </TouchableOpacity>
      </View>
      {/* Statistics */}
      <View style={styles.statisticsContainer}>
        <ModuleChart />
        {/* <FlatList
          data={data}
          renderItem={({ item }: { item: IModule }) => (
            <View style={styles.headerTextRow}>
              <View style={styles.moduleIndicator} />
              <Text>{item.id}</Text>
            </View>
          )}
          keyExtractor={(item: IModule) => item.id}
          contentContainerStyle={{ columnGap: 8 }}
        ></FlatList> */}
      </View>
      {/* Results */}
      <View style={styles.headerRow}>
        <View style={styles.resultColumn}>
          <Text>Zeit bis zur Prüfung</Text>
          <Text style={styles.highlightText}>3 Wochen</Text>
        </View>
        <View style={styles.separator}></View>
        {/* <View
          style={{
            height: 100,
            width: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        /> */}
        <View style={styles.resultColumn}>
          <Text>Selbststudium</Text>
          <Text style={styles.highlightText}>30,5 von 75 Std.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    // height: 210,
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moduleIndicator: {
    width: 24,
    height: 24,
    backgroundColor: "#88A795",
    borderRadius: 1000,
  },
  headerTextRow: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  highlightText: {
    color: "black",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  resultColumn: {
    width: "40%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  statisticsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,
  },
});
