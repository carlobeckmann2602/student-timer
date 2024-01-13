import { View, StyleSheet, Pressable } from "react-native";
import { COLORTHEME } from "@/constants/Theme";
import { useState } from "react";
import DateTimePicker from "../DateTimePicker";
import { LearningUnitType } from "@/types/LearningUnitType";
import { LabelS, P } from "../StyledText";
import UnitPicker from "./UnitPicker";
import { Trash2 } from "lucide-react-native";
import InputFieldNumeric from "../InputFieldNumeric";

type LearningUnitFormProps = {
  inputData: LearningUnitType;
  onDelete?: (id: number) => void | undefined;
  onChange: (vaules: LearningUnitType) => void;
  setValidationError: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LearningUnitForm(props: LearningUnitFormProps) {
  const { inputData, onDelete, onChange, setValidationError } = props;

  const [workLoadError, setWorkloadError] = useState("");
  const [dateError, setDateError] = useState("");

  const validateDates = () => {
    var datesValid = true;
    if (inputData.endDate.getTime() - inputData.startDate.getTime() < 0) {
      setDateError("Das Startdatum muss vor dem Enddatum liegen");
      datesValid = false;
    } else {
      setDateError("");
    }

    return datesValid;
  };

  const validateWorkload = () => {
    var workloadPerWeekValid = true;
    if (inputData.workloadPerWeek <= 0) {
      setWorkloadError("Der Aufwand muss größer als 0 min. sein");
      workloadPerWeekValid = false;
    } else {
      setWorkloadError("");
    }

    return workloadPerWeekValid;
  };

  const handleChange = (value: any) => {
    onChange({ ...inputData, ...value });
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}>
        <UnitPicker
          label="Typ der Lerneinheit"
          onValueChange={(value) => handleChange({ name: value })}
        />
      </View>
      <View style={styles.dateRowWrapper}>
        <View style={styles.row}>
          <DateTimePicker
            label="Startdatum"
            value={inputData.startDate}
            onChangeDate={(value) => {
              handleChange({ startDate: value });
            }}
            maximumDate={inputData.endDate}
          />
          <DateTimePicker
            label="Enddatum"
            value={inputData.endDate}
            onChangeDate={(value) => handleChange({ endDate: value })}
            minimumDate={inputData.startDate}
          />
        </View>
        {dateError !== "" && <P style={styles.errorMessage}>{dateError}</P>}
      </View>
      <View style={styles.workloadRowContainer}>
        <P style={{ color: COLORTHEME.light.primary }}>
          {"Arbeitsaufwand pro Woche"}
        </P>
        <View style={styles.row}>
          <InputFieldNumeric
            onChangeText={(value) =>
              handleChange({
                workloadPerWeek: +value * 60 + (inputData.workloadPerWeek % 60),
              })
            }
            value={Math.round(inputData.workloadPerWeek / 60).toString()}
            inputUnit="Std."
          />
          <InputFieldNumeric
            onChangeText={(value) =>
              handleChange({
                workloadPerWeek:
                  +value + Math.round(inputData.workloadPerWeek / 60),
              })
            }
            value={(inputData.workloadPerWeek % 60).toString()}
            inputUnit="min."
          />
        </View>
        {workLoadError !== "" && (
          <P style={styles.errorMessage}>{workLoadError}</P>
        )}
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
            <Trash2 size={14} color={COLORTHEME.light.danger} />
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
    flexGrow: 1,
    flexBasis: 65,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  workloadRowContainer: {
    gap: 5,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  errorMessage: {
    color: COLORTHEME.light.danger,
    fontSize: 12,
    textAlign: "left",
  },
});
