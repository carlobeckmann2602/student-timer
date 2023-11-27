//@ts-ignore
import SwitchSelector from "react-native-switch-selector";

import { COLORTHEME } from "@/constants/Theme";

export default function TrackingModeToggle(props: {
  onPress: React.Dispatch<React.SetStateAction<any>>;
  disabled: boolean;
}) {
  const { onPress, disabled } = props;

  return (
    <SwitchSelector
      options={[
        { label: "Stoppuhr", value: true },
        { label: "Timer", value: false },
      ]}
      initial={0}
      onPress={onPress}
      backgroundColor={COLORTHEME.light.primary}
      buttonColor={"#ffffff"}
      selectedColor={COLORTHEME.light.primary}
      textColor={"#ffffff"}
      hasPadding
      valuePadding={4}
      borderWidth={0}
      fontSize={16}
      textStyle={{ fontWeight: "600" }}
      selectedTextStyle={{ fontWeight: "600" }}
      disabled={disabled}
    />
  );
}
