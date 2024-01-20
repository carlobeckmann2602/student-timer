import { Pressable, ScrollView, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { H1, H2, P, Subhead } from "@/components/StyledText";
import { ModuleChart } from "@/components/modules/ModuleChart";
import { LearningUnitType } from "@/types/LearningUnitType";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import { useModules } from "@/context/ModuleContext";
import React from "react";
import { convertMinutesToHours } from "@/libs/timeHelper";
import { StarIcon, Pencil, Trash2 } from "lucide-react-native";
import { FlatList } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import LearningUnitRow from "@/components/modules/LearningUnitRow";
import Button from "@/components/Button";
import { computeRemainingSessionTime } from "@/libs/moduleTypeHelper";
import Alert from "@/components/Alert";

export default function ModulesDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const router = useRouter();
  const { modules } = useModules();
  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { fetchModules, resetUnitStatus } = useModules();

  const detailModule =
    modules?.find((module) => module.id.toString() === id) ||
    ({} as ModuleType);

  const onDeleteModule = () => {
    Alert(
      "Modul wirklich löschen?",
      `Möchtest du das Modul "${detailModule.name}" wirklich unwiederuflich löschen?\n Auch die zugehörigen Lerneinheiten und Trackings werden dabei gelöscht.`,
      () => {
        deleteModule();
      },
      "Abbrechen",
      "Löschen"
    );
  };

  const deleteModule = async () => {
    let id = toast.show("Löschen...", { type: "loading" });
    try {
      await authAxios?.delete(
        `/students/${authState?.user.id}/modules/${detailModule.id}`
      );
      toast.update(id, "Modul erfolgreich gelöscht", { type: "success" });

      // Navigate back before fetching, as the modal is still open and would throw an error if displayed module doesn't exist anymore
      router.back();
      fetchModules && (await fetchModules());
    } catch (e) {
      toast.update(id, `Fehler beim Löschen des Moduls: ${e}`, {
        type: "danger",
      });
    }
  };

  const onDeleteTracking = (trackingSessionId: number) => {
    Alert(
      "Tracking wirklich löschen?",
      "Möchtest du das Tracking wirklich unwiederuflich löschen?",
      () => {
        deleteLearningSession(trackingSessionId);
      },
      "Abbrechen",
      "Löschen"
    );
  };

  const deleteLearningSession = async (trackingSessionId: number) => {
    let id = toast.show("Löschen...", { type: "loading" });
    try {
      await authAxios?.delete(
        `/students/${authState?.user.id}/modules/${detailModule.id}/learningSessions/${trackingSessionId}`
      );
      toast.update(id, "Tracking erfolgreich gelöscht", { type: "success" });
      fetchModules && (await fetchModules());
    } catch (e) {
      toast.update(id, `Fehler beim Löschen des Trackings: ${e}`, {
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.outerWrapper}>
      <H1
        style={{
          color: detailModule?.colorCode,
          padding: 12,
        }}
      >
        {detailModule?.name}
      </H1>
      <ScrollView
        style={{ paddingBottom: 50 }}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        <ModuleChart
          inputData={detailModule.learningUnits}
          totalAmount={convertMinutesToHours(detailModule.totalModuleTime)}
          totalAmountDone={convertMinutesToHours(
            detailModule.totalLearningTime
          )}
          width={200}
          height={200}
        />
        <View style={styles.buttonWrapper}>
          <Button
            text="Bearbeiten"
            borderColor={COLORTHEME.light.primary}
            backgroundColor={COLORTHEME.light.background}
            textColor={COLORTHEME.light.primary}
            iconRight={<Pencil color={COLORTHEME.light.primary} />}
            style={{ flex: 1 }}
            onPress={() => {
              resetUnitStatus && resetUnitStatus(detailModule);
              router.back();
              router.push(`/modules/${detailModule.id}/edit`);
            }}
          />
          <Button
            text="Löschen"
            borderColor={COLORS.danger}
            backgroundColor={COLORTHEME.light.background}
            textColor={COLORS.danger}
            iconRight={<Trash2 color={COLORS.danger} />}
            style={{ flex: 1 }}
            onPress={onDeleteModule}
          />
        </View>
        <View style={styles.unitWrapper}>
          <H2 style={{ textAlign: "left" }}>Einheiten</H2>
          <View>
            {detailModule?.learningUnits.map((unit: LearningUnitType) => {
              return (
                <LearningUnitRow
                  key={unit.id}
                  learningUnit={unit}
                  selfLearningTime={computeRemainingSessionTime(
                    detailModule.totalModuleTime,
                    detailModule.totalLearningTime
                  )}
                />
              );
            })}
          </View>
          <View style={styles.resultRow}>
            <View
              style={styles.separator}
              lightColor={COLORTHEME.light.text}
              darkColor={COLORTHEME.dark.text}
            />
            <Subhead>
              {`Gesamt: ${convertMinutesToHours(
                detailModule.totalLearningTime
              )} Std.`}
            </Subhead>
          </View>
        </View>
        <View style={styles.unitWrapper}>
          <H2 style={{ textAlign: "left" }}>Vergangene Trackings</H2>
          <FlatList
            data={detailModule?.learningSessions}
            scrollEnabled={false}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingVertical: 24,
                }}
              >
                <P>Keine Trackings vorhanden.</P>
              </View>
            }
            renderItem={({ item }) => {
              return (
                <View key={item.id}>
                  <View style={styles.unitRow}>
                    <View
                      style={[
                        styles.moduleIndicatorM,
                        { backgroundColor: detailModule.colorCode },
                      ]}
                    />
                    <View style={styles.unitRowTitle}>
                      <Subhead>
                        {item.createdAt.toLocaleDateString("de-DE", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </Subhead>
                      <P numberOfLines={2} style={{ textAlign: "left" }}>
                        {item.description}
                      </P>
                    </View>
                    <Subhead>
                      {convertMinutesToHours(item.totalDuration)} Std.
                    </Subhead>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Subhead>{item.rating}</Subhead>
                      <StarIcon
                        color=""
                        fill={COLORTHEME.light.text}
                        size={20}
                      />
                    </View>
                    <Pressable
                      onPress={() => {
                        router.push({
                          pathname: `/(tabs)/modules/${detailModule.id}/learningSessions/${item.id}/edit`,
                        } as never);
                      }}
                    >
                      <Pencil name="pencil" size={18} color="black" />
                    </Pressable>
                    <Pressable onPress={() => onDeleteTracking(item.id)}>
                      <Trash2 size={18} name="trash2" color="red" />
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: BASE_STYLES.horizontalPadding,
    backgroundColor: COLORTHEME.light.background,
    paddingBottom: 20,
  },
  scrollViewContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    gap: 30,
  },
  chartWrapper: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  unitWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 12,
  },
  unitRowTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    padding: 12,
  },
  unitRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  moduleIndicatorM: {
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
  resultRow: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  separator: {
    marginVertical: 12,
    height: 1,
    width: "20%",
  },
});
