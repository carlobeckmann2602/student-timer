import LearningUnitScreen from "@/components/modules/LearningUnitScreen";
import { useLocalSearchParams } from "expo-router";

export default function LearningUnitCreateScreen() {
  const { id: moduleId } = useLocalSearchParams<{
    id: string;
  }>();

  return <LearningUnitScreen moduleId={moduleId} />;
}
