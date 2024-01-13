import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "../DateTimePicker";
import InputField from "../InputField";
import InputFieldNumeric from "../InputFieldNumeric";
import StyledCheckbox from "../StyledCheckbox";
import { P } from "../StyledText";
import { View } from "../Themed";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import { ModuleType } from "@/types/ModuleType";

type ModuleFormProps = {
  inputData: ModuleType;
  dateDiabled: boolean;
  moduleNameError: string;
  creditPointError: string;
  onChange: (values: ModuleType, newDateDisabledState?: boolean) => void;
};

export default function ModuleForm(props: ModuleFormProps) {
  const {
    inputData,
    dateDiabled,
    moduleNameError,
    creditPointError,
    onChange,
  } = props;

  const selectableColors: string[] = [
    COLORS.moduleColor1,
    COLORS.moduleColor2,
    COLORS.moduleColor3,
    COLORS.moduleColor4,
    COLORS.moduleColor5,
    COLORS.moduleColor6,
    COLORS.moduleColor7,
    COLORS.moduleColor8,
  ];

  const handleChange = (value?: any, newDateDisabledState?: boolean) => {
    onChange({ ...inputData, ...value }, newDateDisabledState);
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}>
        <InputField
          label="Name des Moduls"
          onChangeText={(value) => {
            handleChange({ name: value });
          }}
          value={inputData.name}
          message={moduleNameError}
          messageColor={COLORTHEME.light.danger}
        />
      </View>
      <View style={styles.dateRowContainer}>
        <P style={{ color: COLORTHEME.light.primary }}>
          {"Prüfungsdatum (optional)"}
        </P>
        <View style={styles.row}>
          <DateTimePicker
            onChangeDate={(value) => {
              handleChange({ examDate: value });
            }}
            value={inputData.examDate ? inputData.examDate : new Date()}
            disabled={dateDiabled}
            style={{ opacity: dateDiabled ? 0.5 : 1 }}
          />
          <StyledCheckbox
            value={dateDiabled}
            onValueChange={(value) => {
              handleChange(undefined, value);
            }}
            label="Keine Angabe"
          />
        </View>
      </View>
      <View style={styles.row}>
        <InputFieldNumeric
          label="Credit-Points"
          onChangeText={(value) => {
            handleChange({ creditPoints: value });
          }}
          value={inputData.creditPoints.toString()}
          message={creditPointError}
          messageColor={COLORTHEME.light.danger}
          inputUnit="CP"
        />
        <View style={{ width: "50%", backgroundColor: "transparent" }} />
      </View>
      <View style={styles.row}>
        <View style={styles.colorWrapper}>
          <P style={styles.inputLabelText}>Farbauswahl</P>
          <FlatList
            keyExtractor={(item) => item}
            style={{ width: "100%" }}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            contentContainerStyle={{ gap: 20 }}
            data={selectableColors}
            numColumns={4}
            scrollEnabled={false}
            renderItem={({ item: color }) => {
              return (
                <TouchableOpacity
                  style={styles.colorOptionWrapper}
                  onPress={() => {
                    handleChange({ colorCode: color });
                  }}
                  key={color}
                >
                  <View
                    style={[
                      styles.colorOptionIndicator,
                      {
                        borderColor:
                          inputData.colorCode === color
                            ? COLORTHEME.light.primary
                            : "transparent",
                      },
                    ]}
                  />
                  <View
                    style={[styles.colorOption, { backgroundColor: color }]}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 24,
    backgroundColor: COLORTHEME.light.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 24,
    backgroundColor: COLORTHEME.light.background,
  },
  scrollViewContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  section: {
    width: "100%",
    gap: 12,
    backgroundColor: "transparent",
  },
  flatListContainer: {
    gap: 12,
  },
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    gap: 16,
  },
  dateRowContainer: {
    gap: 5,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  colorWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    gap: 4,
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  colorOptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  colorOptionIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -26 }, { translateY: -26 }],
    width: 52,
    height: 52,
    backgroundColor: "transparent",
    borderRadius: 1000,
    borderWidth: 4,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 1000,
  },
  discardLink: {
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  unitWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 16,
  },
});
