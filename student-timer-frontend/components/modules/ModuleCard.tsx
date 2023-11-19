import { MoreVertical } from "lucide-react-native";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { ModuleChart } from "./ModuleChart";
import { H4, P, Subhead } from "../StyledText";
import { COLORS, COLORTHEME } from "@/constants/Theme";

export interface IModuleTest {
  x: number;
  y: number;
  id: number;
  name: string;
  time: number;
  color: string;
}

export interface IModule {
  module_id: string;
  name: string;
  color_code: string;
  creditpoints: number;
  exam_date: Date;
  learning_units: ILearning_Unit[];
}

export interface ILearning_Unit {
  unit_id: string;
  name: string;
  workload_per_week: number;
  start_date: Date;
  end_date: Date;
}

export function ModuleCard() {
  const mockData: IModule = {
    module_id: "123",
    name: "Datenbanksysteme 2",
    color_code: "#88A795",
    creditpoints: 5,
    exam_date: new Date(2023, 11, 2),
    learning_units: [
      {
        unit_id: "123",
        name: "Vorlesung",
        workload_per_week: 40,
        start_date: new Date(2023, 9, 1),
        end_date: new Date(2024, 2, 1),
      },
      {
        unit_id: "123",
        name: "Praktikum",
        workload_per_week: 10,
        start_date: new Date(2023, 9, 1),
        end_date: new Date(2024, 2, 1),
      },
      {
        unit_id: "123",
        name: "Nachhilfe",
        workload_per_week: 40,
        start_date: new Date(2023, 9, 1),
        end_date: new Date(2024, 2, 1),
      },
      {
        unit_id: "123",
        name: "Selbststudium",
        workload_per_week: 40,
        start_date: new Date(2023, 9, 1),
        end_date: new Date(2024, 2, 1),
      },
      // {
      //   x: 1,
      //   y: 1,
      //   id: 1,
      //   name: "Vorlesung",
      //   time: 40,
      //   color: "#F9D477",
      // },
      // {
      //   x: 2,
      //   y: 2,
      //   id: 2,
      //   name: "Praktikum",
      //   time: 10,
      //   color: "#6FB9E2",
      // },
      // {
      //   x: 3,
      //   y: 3,
      //   id: 3,
      //   name: "Nachhilfe",
      //   time: 10,
      //   color: "#D16E6E",
      // },
      // {
      //   x: 4,
      //   y: 4,
      //   id: 4,
      //   name: "Selbststudium",
      //   time: 60,
      //   color: "#88A795",
      // },
    ],
  };

  const compute_deadline = (exam_date: Date) => {
    let currentDate: Date = new Date();
    var diff: number = exam_date.getTime() - currentDate.getTime();
    var remaining_days: number = Math.ceil(diff / (1000 * 3600 * 24));

    if (remaining_days < 0) return "Abgeschlossen";

    return remaining_days > 6
      ? `${Math.floor(remaining_days / 7)} Woche(n)`
      : `${remaining_days} Tag(e)`;
  };

  type ObjectKey = keyof typeof COLORS;

  const compute_learning_unit_color = (unit: ILearning_Unit) => {
    let unit_color = COLORS[unit.name as ObjectKey];
    return unit_color !== undefined ? unit_color : mockData.color_code;
  };

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
          <View
            style={[
              styles.moduleIndicator,
              { backgroundColor: mockData.color_code },
            ]}
          />
          <H4>{mockData.name}</H4>
        </View>
        <TouchableOpacity>
          <MoreVertical size={28} fill="black" strokeWidth={1}></MoreVertical>
        </TouchableOpacity>
      </View>
      {/* Statistics */}
      <View style={styles.statisticsContainer}>
        <ModuleChart />
        <View style={styles.statisticsUnitContainer}>
          {mockData.learning_units.map((unit) => {
            return (
              <View style={styles.headerTextRow}>
                <View
                  style={[
                    styles.moduleIndicator,
                    { backgroundColor: compute_learning_unit_color(unit) },
                  ]}
                />
                <P>{unit.name}</P>
              </View>
            );
          })}
        </View>
      </View>
      {/* Results */}
      <View style={styles.headerRow}>
        <View style={styles.resultColumn}>
          <P style={{ textAlign: "center" }}>Zeit bis zur Prüfung</P>
          <Subhead>{compute_deadline(mockData.exam_date)}</Subhead>
          {/* {() => {
            return <Subhead>hallo</Subhead>;
            if (mockData.exam_date !== null) {
              return <Subhead>{compute_deadline(mockData.exam_date)}</Subhead>;
            } else {
              <Subhead>Nicht angegeben</Subhead>;
            }
          }} */}
        </View>
        <View style={styles.separator}></View>
        <View style={styles.resultColumn}>
          <P style={{ textAlign: "center" }}>Selbststudium</P>
          <Subhead>30,5 von 75 Std.</Subhead>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    // height: 210,
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8%",
    gap: 16,
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
    borderRadius: 1000,
  },
  headerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    justifyContent: "space-between",
    gap: 8,
  },
  statisticsUnitContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "flex-start",
    columnGap: 8,
  },
});
