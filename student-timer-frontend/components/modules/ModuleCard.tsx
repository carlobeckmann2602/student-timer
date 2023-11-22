import { MoreVertical } from "lucide-react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ModuleChart } from "./ModuleChart";
import { H4, P, Subhead } from "../StyledText";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { LearningUnitType } from "@/types/LearningUnitType";

type ObjectKey = keyof typeof COLORS;

export function ModuleCard(data: ModuleType) {
  const router = useRouter();

  const compute_date_difference = (date1: Date, date2: Date) => {
    let diff: number = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  /**
   * Returns the remaining days from now to the exam date as a string
   * @param exam_date Given parameter value from the ModuleType
   * @returns A string describing the remaining time from today to the exam date
   * - "Abgeschlossen" when exam date is in the past
   * - "X Tage" when exam date takes place within the next 7 days
   * - "X Woche(n)" otherwise
   */
  const compute_deadline = (exam_date: Date) => {
    let remaining_days: number = compute_date_difference(exam_date, new Date());
    if (remaining_days < 0) return "Abgeschlossen";

    return remaining_days > 6
      ? `${Math.floor(remaining_days / 7)} Woche(n)`
      : `${remaining_days} Tag(e)`;
  };

  /**
   * Returns the dedicated HEX-Code for a given learning unit
   * @param unit Learning unit from module
   * @returns String with HEX-Code from Constants for the given learning unit
   */
  const compute_learning_unit_color = (unit: LearningUnitType) => {
    let unit_color = COLORS[unit.name as ObjectKey];
    return unit_color !== undefined ? unit_color : data.colorCode;
  };

  const precompute_learning_units = (inputData: ModuleType) => {
    for (var unit of inputData.learningUnits) {
      // Add HEX-Colorcode for each module based on corresponding constant
      unit.colorCode = compute_learning_unit_color(unit);

      // Compute invested hours for learning unit since start date
      let weeks_with_unit: number =
        compute_date_difference(unit.endDate, new Date()) / 7;
      unit.y = weeks_with_unit * unit.workloadPerWeek;
    }
    return inputData;
  };

  const transformedData: ModuleType = precompute_learning_units(data);

  return (
    <TouchableOpacity onPress={() => router.push(`/module/${data.moduleId}`)}>
      <View style={styles.outerWrapper}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextRow}>
            <View
              style={[
                styles.moduleIndicatorM,
                { backgroundColor: transformedData.colorCode },
              ]}
            />
            <H4>{transformedData.name}</H4>
          </View>
          <TouchableOpacity>
            <MoreVertical size={28} fill="black" strokeWidth={1}></MoreVertical>
          </TouchableOpacity>
        </View>
        {/* Statistics */}
        <View style={styles.statisticsContainer}>
          <ModuleChart {...transformedData} />
          <View style={styles.statisticsUnitContainer}>
            {transformedData.learningUnits.map((unit) => {
              return (
                <View key={unit.unitId} style={styles.headerTextRow}>
                  <View
                    style={[
                      styles.moduleIndicatorS,
                      { backgroundColor: unit.colorCode },
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
            <Subhead>{compute_deadline(transformedData.examDate)}</Subhead>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.resultColumn}>
            <P style={{ textAlign: "center" }}>Selbststudium</P>
            <Subhead>30,5 von {transformedData.creditpoints * 30} Std.</Subhead>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey2,
    // shadowColor: "black",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // borderRadius: 12,
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
  moduleIndicatorM: {
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
  moduleIndicatorS: {
    width: 16,
    height: 16,
    borderRadius: 1000,
  },
  headerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  resultColumn: {
    width: "45%",
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
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
});
