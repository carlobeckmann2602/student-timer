import { View, StyleSheet } from "react-native";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import InputField from "../InputField";
import { useState } from "react";
import DateTimePicker from "../DateTimePicker";
import { LearningUnitType } from "@/types/LearningUnitType";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LabelS } from "../StyledText";

type LearningUnitFormProps = {
  inputData: LearningUnitType;
  onDelete: (id: number) => void;
};

export function LearningUnitForm(props: LearningUnitFormProps) {
  const { inputData, onDelete } = props;

  const router = useRouter();

  const [learningUnitName, setLearningUnitName] = useState(inputData.name);
  const [startDate, setStartDate] = useState(inputData.startDate);
  const [endDate, setEndDate] = useState(inputData.endDate);
  const [workloadPerWeek, setWorkloadPerWeek] = useState(
    inputData.workloadPerWeek
  );

  const [examDateError, setStudyCourseError] = useState("");
  const [creditPointError, setEmailError] = useState("");

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}>
        <InputField
          label="Name"
          onChangeText={setLearningUnitName}
          value={learningUnitName}
          message={creditPointError}
          messageColor="red"
        />
      </View>
      <View style={styles.row}>
        <DateTimePicker
          label="Startdatum"
          value={startDate}
          onChangeDate={(selectedDate) => {
            const currentDate = selectedDate;
            if (currentDate) setStartDate(currentDate);
          }}
        />
        <DateTimePicker
          label="Enddatum"
          value={endDate}
          onChangeDate={(selectedDate) => {
            const currentDate = selectedDate;
            if (currentDate) setEndDate(currentDate);
          }}
        />
      </View>
      <View style={styles.row}>
        <InputField
          label="Arbeitsaufwand pro Woche"
          onChangeText={(value) => {
            +value ? setWorkloadPerWeek(+value) : setWorkloadPerWeek(0);
          }}
          value={workloadPerWeek.toString()}
          message={examDateError}
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
