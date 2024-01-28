import React from "react";
import { Platform, StyleSheet } from "react-native";
import Picker, { Item } from "react-native-picker-select";
import { ObjectKey } from "@/context/ModuleContext";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import { View, Text } from "@/components/Themed";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";

export type UnitPickerProps = {
  label?: string;
  value: LearningUnitEnum;
  onValueChange: (value: LearningUnitEnum) => void;
};

export default function UnitPicker(props: UnitPickerProps) {
  const { label, value, onValueChange } = props;

  const unitValues = Object.values(LearningUnitEnum).filter(
    (item) => item !== LearningUnitEnum.SELBSTSTUDIUM
  );

  return (
    <View style={styles.inputLabelGroup}>
      {label && <Text style={styles.inputLabelText}>{label}</Text>}
      <View style={styles.inputUnitContainer}>
        <View
          style={[
            styles.unitIndicator,
            {
              backgroundColor: value
                ? COLORS[
                    Object.keys(LearningUnitEnum)[
                      Object.values(LearningUnitEnum).indexOf(value)
                    ] as ObjectKey
                  ]
                : "transparent",
            },
          ]}
        />
        <Picker
          style={{
            viewContainer: styles.picker,
            inputWeb: { ...styles.picker },
            inputAndroid: { ...styles.picker },
            inputIOS: { paddingHorizontal: 10 },
          }}
          placeholder={{}}
          value={value?.toString()}
          items={unitValues.map((item) => {
            return {
              key: item,
              label: item,
              value: item,
            } as Item;
          })}
          onValueChange={(unitEnumValue: LearningUnitEnum) => {
            onValueChange && onValueChange(unitEnumValue);
          }}
          //@ts-ignore
          InputAccessoryView={() => null}
          disabled={!unitValues?.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabelGroup: {
    gap: 5,
    flexGrow: 1,
    flexBasis: 50,
    flexDirection: "column",
    backgroundColor: "transparent",
    minWidth: 100,
  },
  inputUnitContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 10,
    gap: 8,
  },
  picker: {
    flex: 1,
    backgroundColor: "transparent",
    border: 0,
    justifyContent: "center",
    fontFamily: "OpenSans_Regular",
    color: COLORTHEME.light.grey3,
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  unitIndicator: {
    width: 16,
    height: 16,
    borderRadius: 1000,
  },
});
