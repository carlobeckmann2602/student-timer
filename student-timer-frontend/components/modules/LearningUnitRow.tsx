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

    return `${convertMinutesToHours(
      unit.workloadPerWeek
    )} Std., ${weekAmount} Wochen`;
  };

  return (
    <View key={learningUnit.id} style={styles.unitRow}>
      <View
        style={[
          styles.moduleIndicatorM,
          { backgroundColor: learningUnit.colorCode },
        ]}
      />
      <View style={styles.unitRowTitle}>
        <Subhead>{learningUnit.name}</Subhead>
        <P>
          {learningUnit.name === LearningUnitEnum.SELBSTSTUDIUM
            ? `${selfLearningTime} Std. verbleibend`
            : computeModuleDetailUnitString(learningUnit)}
        </P>
      </View>
      <Subhead>
        {convertMinutesToHours(learningUnit.totalLearningTime)} Std.
      </Subhead>
      {onEdit && (
        <Pressable onPress={onEdit}>
          <Pencil name="pencil" size={18} color="black" />
        </Pressable>
      )}
      {onDelete && (
        <Pressable onPress={onDelete}>
          <Trash2 size={18} name="trash2" color="red" />
        </Pressable>
      )}
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
    gap: 12,
    paddingRight: 8,
  },
});
