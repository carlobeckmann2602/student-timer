import { Ionicons as DefaultIonicons } from "@expo/vector-icons";

export default function Ionicons(props: {
  name: React.ComponentProps<typeof DefaultIonicons>["name"];
  color: string;
  size?: number;
}) {
  return <DefaultIonicons size={32} style={{ marginBottom: -3 }} {...props} />;
}
