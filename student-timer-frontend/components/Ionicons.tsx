import { Ionicons as DefaultIonicons } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";

export default function Ionicons(props: {
  name: React.ComponentProps<typeof DefaultIonicons>["name"];
  color: string;
  size?: number;
  styles?: StyleProp<TextStyle>;
}) {
  const { styles, ...otherProps } = props;
  return (
    <DefaultIonicons
      size={32}
      style={[{ marginBottom: -3 }, styles]}
      {...otherProps}
    />
  );
}
