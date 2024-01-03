import { View, StyleSheet } from "react-native";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import InputField from "../InputField";
import { useState } from "react";
import DateTimePicker from "../DateTimePicker";
import { LearningUnitType } from "@/types/LearningUnitType";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LabelS } from "../StyledText";
import UnitPicker from "./UnitPicker";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";

type LearningUnitFormProps = {
  inputData: LearningUnitType;
  onDelete: (id: number) => void;
  onChange: (changedUnit: LearningUnitType) => void;
  onValidationError: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LearningUnitForm(props: LearningUnitFormProps) {
  const { inputData, onDelete, onChange, onValidationError } = props;

  const router = useRouter();

  const [learningUnitName, setLearningUnitName] = useState(inputData.name);
  const [selectedUnit, setSelectedUnit] = useState<
    LearningUnitEnum | undefined
  >();
  const [startDate, setStartDate] = useState(inputData.startDate);
  const [endDate, setEndDate] = useState(inputData.endDate);
  const [workloadPerWeek, setWorkloadPerWeek] = useState(
    inputData.workloadPerWeek
  );

  const [workLoadError, setStudyCourseError] = useState("");
  const [creditPointError, setEmailError] = useState("");

  const onNewInput = () => {
    onChange({
      id: inputData.id,
      name: selectedUnit,
      startDate: startDate,
      endDate: endDate,
      workloadPerWeek: workloadPerWeek,
      totalLearningTime: 0,
    } as LearningUnitType);
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}>
        {/* <InputField
          label="Name"
          onChangeText={(value) => {
            setLearningUnitName(value);
            onNewInput();
          }}
          value={learningUnitName}
          message={creditPointError}
          messageColor="red"
        /> */}
      </View>
      <View style={styles.row}>
        <UnitPicker
          label="Name der Lerneinheit"
          onValueChange={(value: LearningUnitEnum) => {
            setSelectedUnit(value);
            onNewInput();
          }}
        />
      </View>

      <View style={styles.row}>
        <DateTimePicker
          label="Startdatum"
          value={startDate}
          onChangeDate={(selectedDate) => {
            const currentDate = selectedDate;
            if (currentDate) {
              setStartDate(currentDate);
              onNewInput();
            }
          }}
        />
        <DateTimePicker
          label="Enddatum"
          value={endDate}
          onChangeDate={(selectedDate) => {
            const currentDate = selectedDate;
            if (currentDate) {
              setEndDate(currentDate);
              onNewInput();
            }
          }}
        />
      </View>
      <View style={styles.row}>
        <InputField
          label="Arbeitsaufwand pro Woche"
          onChangeText={(value) => {
            +value ? setWorkloadPerWeek(+value) : setWorkloadPerWeek(0);
            onNewInput();
          }}
          value={workloadPerWeek.toString()}
          message={workLoadError}
          messageColor="red"
          inputMode="numeric"
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onDelete(inputData.id)}>
          <LabelS
            style={[styles.errorMessage, { textDecorationLine: "underline" }]}
          >
            Entfernen
          </LabelS>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 5,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
  },
});
