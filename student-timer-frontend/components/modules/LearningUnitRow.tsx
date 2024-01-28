import { Pressable, StyleSheet } from "react-native";
import { LearningUnitType } from "@/types/LearningUnitType";
import { View } from "../Themed";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { computeDateDifference } from "@/libs/moduleTypeHelper";
import { convertMinutesToHours } from "@/libs/timeHelper";
import { P, Subhead } from "../StyledText";
import { Pencil, Trash2 } from "lucide-react-native";

type learningUnitProps = {
  learningUnit: LearningUnitType;
  selfLearningTime: number;
  onDelete?: () => void;
  onEdit?: () => void;
};

export default function LearningUnitRow(props: learningUnitProps) {
  const { learningUnit, selfLearningTime, onDelete, onEdit } = props;

  const computeModuleDetailUnitString = (unit: LearningUnitType) => {
    let weekAmount = computeDateDifference(unit.endDate, unit.startDate, true);

    return `${convertMinutesToHours(unit.workloadPerWeek, false)} Std., ${weekAmount} Woche(n)`;
  };

  return (
    <View key={learningUnit.id} style={styles.unitRow}>
      <View style={[styles.moduleIndicatorM, { backgroundColor: learningUnit.colorCode }]} />
      <View style={styles.unitRowTitle}>
        <Subhead>{learningUnit.name}</Subhead>
        <P style={{ textAlign: "left" }}>
          {learningUnit.name === LearningUnitEnum.SELBSTSTUDIUM
            ? `${selfLearningTime} Std. verbleibend`
            : computeModuleDetailUnitString(learningUnit)}
        </P>
      </View>
      <Subhead>{convertMinutesToHours(learningUnit.totalLearningTime)} Std.</Subhead>
      <View style={styles.optionWrapper}>
        {onEdit && (
          <Pressable onPress={onEdit} style={{ padding: 6 }}>
            <Pencil name="pencil" size={22} color="black" />
          </Pressable>
        )}
        {onDelete && (
          <Pressable onPress={onDelete} style={{ padding: 6 }}>
            <Trash2 size={22} name="trash2" color="red" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moduleIndicatorM: {
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
  unitRowTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    padding: 12,
  },
  unitRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingRight: 8,
  },
  optionWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
