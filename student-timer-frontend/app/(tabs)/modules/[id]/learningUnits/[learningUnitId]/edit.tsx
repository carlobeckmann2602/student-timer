import LearningUnitScreen from "@/components/modules/LearningUnitScreen";
import { useLocalSearchParams } from "expo-router";

export default function LearningUnitEditScreen() {
  const { id: moduleId, learningUnitId } = useLocalSearchParams<{
    id: string;
    learningUnitId: string;
  }>();

  return (
    <LearningUnitScreen moduleId={moduleId} learningUnitId={learningUnitId} />
  );
}
