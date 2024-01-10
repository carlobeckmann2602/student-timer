import Button from "@/components/Button";
import { H1 } from "@/components/StyledText";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { LearningUnitType } from "@/types/LearningUnitType";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function learningUnitEdit() {
  const { id, learningUnitId } = useLocalSearchParams<{
    id: string;
    learningUnitId: string;
  }>();

  const [validationError, setValidationError] = useState(false);
  const [validationIndicator, setValidationIndicator] = useState<boolean>();

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { modules, fetchModules } = useModules();

  const module = modules!.find((module) => module.id === +id);
  const learningUnit = module!.learningUnits.find(
    (unit) => unit.id === +learningUnitId
  );

  const router = useRouter();

  const onLearningUnitChange = (changedUnit: LearningUnitType) => {
    // let updated = learningUnits.map((current) => {
    //   return current.id === changedUnit.id ? changedUnit : current;
    // });
    // setLearningUnits(updated);
    // // console.log("Vorher");
    // // console.log(learningUnits);
    // // const newlearningUnits = learningUnits.map((current) => {
    // //   if (current.id == changedUnit.id) {
    // //     // console.log(current);
    // //     // console.log(changedUnit);
    // //   }
    // //   return current.id === changedUnit.id ? changedUnit : current;
    // // });
    // // // console.log(newlearningUnits);
    // // setLearningUnits(newlearningUnits);
    // console.log("Final");
    // console.log(learningUnits);
  };

  const onSave = async () => {
    setValidationError(false);
    setValidationIndicator((prevState) => (prevState ? !prevState : false));
    if (validationError) {
      toast.show(
        "Überprüfe alle Eingaben auf ihre Gültigkeit. Erst dann kann die Lerneinheit aktualisiert werden.",
        { type: "danger" }
      );
      return;
    }

    let id = toast.show("Aktualisieren...");
    try {
      await authAxios?.put(
        `/students/${authState?.user.id}/modules/${learningUnit?.id}/learningUnits`,
        {
          name: learningUnit?.name,
          startDate: learningUnit?.startDate.toISOString().substring(0, 10),
          endDate: learningUnit?.endDate.toISOString().substring(0, 10),
          workloadPerWeek: learningUnit?.workloadPerWeek,
        }
      );
      toast.update(id, "Lerneinheit erfolgreich aktualisiert.", {
        type: "success",
      });
      fetchModules && (await fetchModules());
      router.replace("/(tabs)/modules");
    } catch (e) {
      toast.update(id, `Fehler beim Aktualisieren der Lerneinheit: ${e}`, {
        type: "danger",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: COLORTHEME.light.background }}
    >
      <View style={styles.outerWrapper}>
        <H1 style={{ paddingVertical: 12 }}>Lerneinheit bearbeiten</H1>
        <LearningUnitForm
          key={learningUnit?.id}
          inputData={learningUnit!}
          onChange={onLearningUnitChange}
          setValidationErrorCallback={(value) => {
            // if one form sets the validationError to true (as it received invalid inputs),
            // the validationError-state should not be overwritten by other, possibly valid forms
            if (!validationError) setValidationError(value);
          }}
          validationIndicator={validationIndicator}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          text="Änderungen speichern"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={onSave}
          style={{ width: 200 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    flexGrow: 1,
    flexDirection: "column",
    // justifyContent: "flex-start",
    gap: 24,
    paddingHorizontal: 12,
    paddingVertical: 50,
    backgroundColor: COLORTHEME.light.primary,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    paddingVertical: 60,
    backgroundColor: "transparent",
  },
});
