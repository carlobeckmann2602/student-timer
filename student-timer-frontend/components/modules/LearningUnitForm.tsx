import { View, StyleSheet, Pressable } from "react-native";
import { COLORTHEME } from "@/constants/Theme";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import DateTimePicker from "../DateTimePicker";
import { LearningUnitType } from "@/types/LearningUnitType";
import { LabelS, P } from "../StyledText";
import UnitPicker from "./UnitPicker";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { Trash2 } from "lucide-react-native";

type LearningUnitFormProps = {
  inputData: LearningUnitType;
  onDelete?: (id: number) => void | undefined;
  onChange: (changedUnit: LearningUnitType) => void;
  setValidationErrorCallback: React.Dispatch<React.SetStateAction<boolean>>;
  validationIndicator: boolean | undefined;
};

export function LearningUnitForm(props: LearningUnitFormProps) {
  const {
    inputData,
    onDelete,
    onChange,
    setValidationErrorCallback,
    validationIndicator,
  } = props;

  const [selectedUnit, setSelectedUnit] = useState<LearningUnitEnum>(
    inputData.name ? inputData.name : LearningUnitEnum.VORLESUNG
  );
  const [startDate, setStartDate] = useState(inputData.startDate);
  const [endDate, setEndDate] = useState(inputData.endDate);
  const [workloadPerWeek, setWorkloadPerWeek] = useState(
    inputData.workloadPerWeek
  );

  const [workLoadError, setWorkloadError] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (validateInputs())
      onChange({
        id: inputData.id,
        name: selectedUnit,
        startDate: startDate,
        endDate: endDate,
        workloadPerWeek: workloadPerWeek,
        totalLearningTime: 0,
      } as LearningUnitType);
  }, [validationIndicator]);

  const validateInputs = () => {
    if (validateDates() && validateWorkload()) {
      setValidationErrorCallback(false);
      return true;
    } else {
      setValidationErrorCallback(true);
      return false;
    }
  };

  const validateDates = () => {
    var datesValid = true;
    if (endDate.getTime() - startDate.getTime() < 0) {
      setDateError("Das Startdatum muss vor dem Enddatum liegen");
      datesValid = false;
    } else {
      setDateError("");
    }

    return datesValid;
  };

  const validateWorkload = () => {
    var workloadPerWeekValid = true;
    if (workloadPerWeek <= 0) {
      setWorkloadError("Der Aufwand muss größer als 0 Std. sein");
      workloadPerWeekValid = false;
    } else {
      setWorkloadError("");
    }

    return workloadPerWeekValid;
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}></View>
      <View style={styles.row}>
        <UnitPicker
          label="Typ der Lerneinheit"
          onValueChange={(value: LearningUnitEnum) => {
            setSelectedUnit(value);
          }}
        />
      </View>
      <View style={styles.dateRowWrapper}>
        <View style={styles.row}>
          <DateTimePicker
            label="Startdatum"
            value={startDate}
            onChangeDate={(selectedDate) => {
              if (selectedDate) {
                setStartDate(selectedDate);
                validateDates();
              }
            }}
          />
          <DateTimePicker
            label="Enddatum"
            value={endDate}
            onChangeDate={(selectedDate) => {
              if (selectedDate) {
                setEndDate(selectedDate);
                validateDates();
              }
            }}
            minimumDate={startDate}
          />
        </View>
        {dateError !== "" && <P style={styles.errorMessage}>{dateError}</P>}
      </View>
      <View style={styles.row}>
        <InputField
          label="Arbeitsaufwand pro Woche"
          onChangeText={(value) => {
            if (+value) setWorkloadPerWeek(+value);
          }}
          onEndEditing={validateWorkload}
          value={workloadPerWeek.toString()}
          message={workLoadError}
          messageColor="red"
          inputMode="numeric"
          inputUnit="Std."
        />
      </View>
      {onDelete && (
        <View
          style={[
            styles.row,
            { justifyContent: "flex-end", paddingTop: 4, paddingBottom: -8 },
          ]}
        >
          <View style={{ flex: 1 }} />
          <Pressable
            style={styles.options}
            onPress={() => onDelete(inputData.id)}
          >
            <LabelS
              style={[styles.errorMessage, { textDecorationLine: "underline" }]}
            >
              Lerneinheit entfernen
            </LabelS>
            <Trash2 size={14} color="red" />
          </Pressable>
        </View>
      )}
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
  options: {
    gap: 8,
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateRowWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    textAlign: "left",
  },
});
