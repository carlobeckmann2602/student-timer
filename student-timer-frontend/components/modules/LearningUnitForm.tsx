import { View, StyleSheet, Pressable } from "react-native";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import DateTimePicker from "../DateTimePicker";
import { LearningUnitType } from "@/types/LearningUnitType";
import { LabelS, P } from "../StyledText";
import UnitPicker from "./UnitPicker";
import { Trash2 } from "lucide-react-native";
import InputFieldNumeric from "../InputFieldNumeric";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { ObjectKey } from "@/context/ModuleContext";
import { useState } from "react";

type LearningUnitFormProps = {
  inputData: LearningUnitType;
  onDelete?: (id: number) => void | undefined;
  onChange: (values: LearningUnitType) => void;
  onValidationError: (errorOccured: boolean) => void;
};

export function LearningUnitForm(props: LearningUnitFormProps) {
  const { inputData, onDelete, onChange, onValidationError } = props;

  const handleChange = (value: LearningUnitType) => {
    onChange({ ...inputData, ...value });
  };

  const [workloadError, setWorkloadError] = useState(false);

  const updateWorkloadHours = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    let formattedValue = Math.round(Math.abs(+value * 60));

    if (
      formattedValue <= 0 &&
      (inputData.workloadPerWeekMinutes === undefined ||
        inputData.workloadPerWeekMinutes <= 0)
    ) {
      handleChange({
        workloadPerWeekHours: 0,
      } as LearningUnitType);
      setWorkloadError(true);
      onValidationError(true);
      return;
    }

    let updatedTotalWorkloadPerWeek = formattedValue;

    if (inputData.workloadPerWeekMinutes)
      updatedTotalWorkloadPerWeek += inputData.workloadPerWeekMinutes;

    handleChange({
      workloadPerWeekHours: formattedValue,
      workloadPerWeek: updatedTotalWorkloadPerWeek,
    } as LearningUnitType);
    setWorkloadError(false);
    onValidationError(false);
  };

  const updateWorkloadMinutes = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    let formattedValue =
      Math.round(Math.abs(+value)) >= 60 ? 59 : Math.round(Math.abs(+value));

    if (
      formattedValue <= 0 &&
      (inputData.workloadPerWeekHours === undefined ||
        inputData.workloadPerWeekHours <= 0)
    ) {
      handleChange({
        workloadPerWeekMinutes: 0,
      } as LearningUnitType);
      setWorkloadError(true);
      onValidationError(true);
      return;
    }

    let updatedTotalWorkloadPerWeek = formattedValue;
    if (inputData.workloadPerWeekHours)
      updatedTotalWorkloadPerWeek += inputData.workloadPerWeekHours;

    handleChange({
      workloadPerWeekMinutes: formattedValue,
      workloadPerWeek: updatedTotalWorkloadPerWeek,
    } as LearningUnitType);
    setWorkloadError(false);
    onValidationError(false);
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}>
        <UnitPicker
          label="Typ der Lerneinheit"
          value={inputData.name}
          onValueChange={(value) =>
            handleChange({
              name: value,
              colorCode:
                COLORS[
                  Object.keys(LearningUnitEnum)[
                    Object.values(LearningUnitEnum).indexOf(value)
                  ] as ObjectKey
                ],
            } as LearningUnitType)
          }
        />
      </View>
      <View style={styles.dateRowWrapper}>
        <View style={styles.row}>
          <DateTimePicker
            label="Startdatum"
            value={inputData.startDate}
            onChangeDate={(value) => {
              handleChange({ startDate: value } as LearningUnitType);
            }}
            maximumDate={inputData.endDate}
          />
          <DateTimePicker
            label="Enddatum"
            value={inputData.endDate}
            onChangeDate={(value) =>
              handleChange({ endDate: value } as LearningUnitType)
            }
            minimumDate={inputData.startDate}
          />
        </View>
      </View>
      <View style={styles.workloadRowContainer}>
        <P style={{ color: COLORTHEME.light.primary }}>
          {"Arbeitsaufwand pro Woche"}
        </P>
        <View style={styles.row}>
          <InputFieldNumeric
            onChangeText={(value) => updateWorkloadHours(+value)}
            value={
              inputData.workloadPerWeekHours
                ? Math.floor(inputData.workloadPerWeekHours / 60).toString()
                : "0"
            }
            inputUnit="Std."
            showErrorBorder={workloadError}
          />
          <InputFieldNumeric
            onChangeText={(value) => updateWorkloadMinutes(+value)}
            value={
              inputData.workloadPerWeekMinutes
                ? inputData.workloadPerWeekMinutes.toString()
                : "0"
            }
            inputUnit="min."
            showErrorBorder={workloadError}
          />
        </View>
        {workloadError && (
          <P style={styles.errorMessage}>Bitte gebe den Arbeitsaufwand an</P>
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
            <Trash2
              size={14}
              color={COLORTHEME.light.danger}
              strokeWidth={BASE_STYLES.iconWidth}
              absoluteStrokeWidth
            />
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
    borderRadius: BASE_STYLES.borderRadius,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: BASE_STYLES.padding,
    gap: BASE_STYLES.wrapperGap,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: BASE_STYLES.wrapperGap,
  },
  options: {
    gap: BASE_STYLES.wrapperGap,
    paddingVertical: BASE_STYLES.wrapperGap,
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
    gap: BASE_STYLES.labelGap,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  errorMessage: {
    color: COLORTHEME.light.danger,
    fontSize: 12,
    textAlign: "left",
  },
});
