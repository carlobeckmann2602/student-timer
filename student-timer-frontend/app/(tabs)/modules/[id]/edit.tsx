import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { H2 } from "@/components/StyledText";
import { View } from "@/components/Themed";
import LearningUnitRow from "@/components/modules/LearningUnitRow";
import ModuleForm from "@/components/modules/ModuleForm";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { computeRemainingSessionTime } from "@/libs/moduleTypeHelper";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Alert as ReactAlert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function EditModule() {
  const { id: moduleToEditId } = useLocalSearchParams<{
    id: string;
  }>();

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { modules, setModules, fetchModules, unitStatus, setUnitStatus } = useModules();
  const router = useRouter();

  const detailModule =
    modules?.find((module) => module.id.toString() === moduleToEditId) || ({} as ModuleType);

  const [openChanges, setOpenChanges] = useState(false);
  const [dateDiabled, setDateDisabled] = useState(detailModule.examDate ? false : true);
  const [saveDisabled, setSaveDisabled] = useState<Set<string>>(new Set<string>());

  const handleValidationError = (errorType: string, errorOccured: boolean) => {
    if (errorOccured) {
      setSaveDisabled((prevSet) => new Set([...prevSet, errorType]));
    } else {
      setSaveDisabled((prevSet) => {
        const updatedSet = new Set<string>(prevSet);
        updatedSet.delete(errorType);
        return updatedSet;
      });
    }
  };

  const handleUpdate = (module: ModuleType, disabledStatus?: boolean) => {
    setModules &&
      setModules((prevState) =>
        prevState?.map((currentModule) => {
          return currentModule.id === module.id ? module : currentModule;
        })
      );
    if (disabledStatus != undefined) setDateDisabled(disabledStatus);
    if (!openChanges) setOpenChanges(true);
  };

  const onSave = async () => {
    let toastId = toast.show("Änderungen speichern...");

    try {
      let moduleDTO;
      if (detailModule.examDate && !dateDiabled) {
        moduleDTO = {
          name: detailModule.name.trim(),
          examDate: detailModule.examDate,
          colorCode: detailModule.colorCode,
          creditpoints: +detailModule.creditPoints,
        };
      } else {
        moduleDTO = {
          name: detailModule.name.trim(),
          colorCode: detailModule.colorCode,
          creditpoints: +detailModule.creditPoints,
        };
      }

      await authAxios?.put(`/students/${authState?.user.id}/modules/${moduleToEditId}`, moduleDTO);

      if (unitStatus)
        for (let [key, value] of Object.entries(unitStatus)) {
          switch (value) {
            case "create":
              const unitToCreate = detailModule.learningUnits.find(
                (unit) => unit.id.toString() === key
              );
              if (unitToCreate)
                await authAxios?.post(
                  `/students/${authState?.user.id}/modules/${detailModule.id}/learningUnits`,
                  {
                    name: unitToCreate.name,
                    startDate: unitToCreate.startDate.toISOString().substring(0, 10),
                    endDate: unitToCreate.endDate.toISOString().substring(0, 10),
                    workloadPerWeek: unitToCreate.workloadPerWeek,
                  }
                );
              break;
            case "edit":
              const unitToEdit = detailModule.learningUnits.find(
                (unit) => unit.id.toString() === key
              );
              if (unitToEdit)
                await authAxios?.put(
                  `/students/${authState?.user.id}/modules/${detailModule.id}/learningUnits/${unitToEdit.id}`,
                  {
                    name: unitToEdit.name,
                    startDate: unitToEdit.startDate.toISOString().substring(0, 10),
                    endDate: unitToEdit.endDate.toISOString().substring(0, 10),
                    workloadPerWeek: unitToEdit.workloadPerWeek,
                  }
                );
              break;
            case "delete":
              await authAxios?.delete(
                `/students/${authState?.user.id}/modules/${detailModule.id}/learningUnits/${key}`
              );
              break;
            default:
              break;
          }
        }

      toast.update(toastId, "Änderungen erfolgreich gespeichert.", {
        type: "success",
      });
      fetchModules && (await fetchModules());
      router.push("/modules");
    } catch (e) {
      toast.update(toastId, `Fehler beim Ändern des Moduls: ${e}`, {
        type: "danger",
      });
    }
  };

  const onDelete = (learningUnitId: number) => {
    Alert({
      title: "Lerneinheit wirklich löschen?",
      message: `Alle zur Lerneinheit ${
        detailModule.learningUnits.find((unit) => unit.id === learningUnitId)?.name
      } gehörenden Angaben werden dabei gelöscht.`,
      onPressConfirm: () => {
        if (unitStatus && unitStatus[learningUnitId] === "create") {
          setUnitStatus &&
            setUnitStatus((prevState) => ({
              ...prevState,
              [learningUnitId]: null,
            }));
        } else {
          setUnitStatus &&
            setUnitStatus((prevState) => ({
              ...prevState,
              [learningUnitId]: "delete",
            }));
        }
        const updatedModule = {
          ...detailModule,
          learningUnits: detailModule.learningUnits.filter((unit) => unit.id !== learningUnitId),
        };
        handleUpdate(updatedModule);
      },
      confirmText: "Löschen",
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        <ModuleForm
          inputData={detailModule}
          onChange={handleUpdate}
          dateDiabled={dateDiabled}
          onValidationError={handleValidationError}
          onSaveHandler={openChanges}
        />
        <View style={styles.unitWrapper}>
          <View style={styles.unitHeaderRow}>
            <H2 style={{ textAlign: "left" }}>Einheiten</H2>
            <Pressable
              onPress={() => {
                const newUnitId = Math.random();
                setUnitStatus &&
                  setUnitStatus((prevState) => ({
                    ...prevState,
                    [newUnitId]: "create",
                  }));
                router.push({
                  pathname: `/modules/${detailModule.id}/learningUnits/new`,
                  params: {
                    id: detailModule.id,
                    learningUnitId: newUnitId,
                  },
                });
              }}
              style={styles.roundButton}
            >
              <Plus
                color={COLORTHEME.light.background}
                style={{ backgroundColor: "transparent" }}
              />
            </Pressable>
          </View>
          <View>
            {detailModule?.learningUnits.map((unit: LearningUnitType) => {
              if (unit.name != LearningUnitEnum.SELBSTSTUDIUM) {
                return (
                  <LearningUnitRow
                    key={unit.id}
                    learningUnit={unit}
                    selfLearningTime={computeRemainingSessionTime(
                      detailModule.totalModuleTime,
                      detailModule.totalLearningTime
                    )}
                    onDelete={() =>
                      detailModule.learningUnits.length > 2
                        ? onDelete(unit.id)
                        : ReactAlert.alert(
                            "Entfernen nicht möglich",
                            `Ein Modul muss mindestens eine Lerneinheit besitzen.`,
                            [
                              {
                                text: "Verstanden",
                                style: "default",
                              },
                            ]
                          )
                    }
                    onEdit={() => {
                      if (unitStatus && unitStatus[unit.id] != "create") {
                        setUnitStatus &&
                          setUnitStatus((prevState) => ({
                            ...prevState,
                            [unit.id]: "edit",
                          }));
                      }
                      router.push({
                        pathname: `modules/${detailModule.id}/learningUnits/${unit.id}/edit`,
                      } as never);
                    }}
                  />
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonRowWrapper}>
        <Button
          text="Abbrechen"
          borderColor={COLORTHEME.light.primary}
          backgroundColor={COLORTHEME.light.background}
          textColor={COLORTHEME.light.primary}
          style={{ flex: 1 }}
          onPress={() => {
            const changedUnits = Object.values(unitStatus!).find((status) => status != null)
              ? true
              : false;
            openChanges || changedUnits
              ? Alert({
                  title: "Änderungen verwerfen?",
                  message:
                    "Wenn du fortfährst, gehen alle Änderungen verloren. Bist du dir sicher?",
                  onPressConfirm: () => router.push("/modules"),
                })
              : router.push("/modules");
          }}
        />
        <Button
          text="Speichern"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          style={{ flex: 1 }}
          onPress={onSave}
          disabled={saveDisabled?.size != 0}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: COLORTHEME.light.background,
    paddingVertical: BASE_STYLES.horizontalPadding,
  },
  scrollViewContainer: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 24,
    backgroundColor: COLORTHEME.light.background,
    borderRadius: BASE_STYLES.borderRadius,
  },
  scrollViewContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 24,
  },
  unitWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 8,
  },
  unitHeaderRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 4,
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: COLORTHEME.light.primary,
  },
  buttonRowWrapper: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    marginBottom: BASE_STYLES.horizontalPadding,
  },
});
