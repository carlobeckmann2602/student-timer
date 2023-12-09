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
  onDelete: (unitId: number) => void;
};

export function LearningUnitForm(props: LearningUnitFormProps) {
  const { inputData, onDelete } = props;

  const router = useRouter();

  const [examDate, setExamDate] = useState("");
  const [startDate, setStartDate] = useState(new Date(1598051730000));
  const [creditPoints, setCreditPoints] = useState("");

  const [examDateError, setStudyCourseError] = useState("");
  const [creditPointError, setEmailError] = useState("");

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}>
        <InputField
          label="Vorlesung"
          onChangeText={setCreditPoints}
          value={creditPoints}
          message={creditPointError}
          messageColor="red"
        />
      </View>
      <View style={styles.row}>
        <InputField
          label="Startdatum"
          onChangeText={setCreditPoints}
          value={creditPoints}
          keyboardType="number-pad"
          message={creditPointError}
          messageColor="red"
        />
        <InputField
          label="Enddatum"
          onChangeText={setExamDate}
          value={examDate}
          message={examDateError}
          messageColor="red"
        />
      </View>
      <View style={styles.row}>
        <DateTimePicker
          label="Startdatum"
          value={startDate}
          onChangeDate={(event, selectedDate) => {
            const currentDate = selectedDate;
            console.log(selectedDate);
            if (currentDate) setStartDate(currentDate);
          }}
        ></DateTimePicker>
        <InputField
          label="Enddatum"
          onChangeText={setExamDate}
          value={examDate}
          message={examDateError}
          messageColor="red"
        />
      </View>
      <View style={styles.row}>
        <InputField
          label="Arbeitsaufwand pro Woche"
          onChangeText={setExamDate}
          value={examDate}
          message={examDateError}
          messageColor="red"
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onDelete(inputData.unitId)}>
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
