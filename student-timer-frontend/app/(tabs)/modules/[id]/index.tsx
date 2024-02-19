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
import { toastShow, toastUpdate } from "@/components/Toast";

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
    Alert({
      title: "Modul wirklich löschen?",
      message: `Möchtest du das Modul "${detailModule.name}" wirklich unwiderruflich löschen?\n Auch die zugehörigen Lerneinheiten und Trackings werden dabei gelöscht.`,
      onPressConfirm: () => {
        deleteModule();
      },
      cancelText: "Abbrechen",
      confirmText: "Löschen",
    });
  };

  const deleteModule = async () => {
    let id = toastShow(toast, "Löschen...", { type: "loading" });
    try {
      await authAxios?.delete(
        `/students/${authState?.user.id}/modules/${detailModule.id}`
      );
      toastUpdate(toast, id, "Modul erfolgreich gelöscht", { type: "success" });

      // Navigate back before fetching, as the modal is still open and would throw an error if displayed module doesn't exist anymore
      router.back();
      fetchModules && (await fetchModules());
    } catch (e) {
      toastUpdate(toast, id, `Fehler beim Löschen des Moduls: ${e}`, {
        type: "danger",
      });
    }
  };

  const onDeleteTracking = (trackingSessionId: number) => {
    Alert({
      title: "Tracking wirklich löschen?",
      message: "Möchtest du das Tracking wirklich unwiderruflich löschen?",
      onPressConfirm: () => {
        deleteLearningSession(trackingSessionId);
      },
      cancelText: "Abbrechen",
      confirmText: "Löschen",
    });
  };

  const deleteLearningSession = async (trackingSessionId: number) => {
    let id = toastShow(toast, "Löschen...", { type: "loading" });
    try {
      await authAxios?.delete(
        `/students/${authState?.user.id}/modules/${detailModule.id}/learningSessions/${trackingSessionId}`
      );
      fetchModules && (await fetchModules());
      toastUpdate(toast, id, "Tracking erfolgreich gelöscht", {
        type: "success",
      });
    } catch (e) {
      toastUpdate(toast, id, `Fehler beim Löschen des Trackings: ${e}`, {
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
            text="Löschen"
            borderColor={COLORS.danger}
            backgroundColor={COLORTHEME.light.background}
            textColor={COLORS.danger}
            iconRight={<Trash2 color={COLORS.danger} />}
            style={{ flex: 1 }}
            onPress={onDeleteModule}
          />
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
                    <View style={styles.optionWrapper}>
                      <Pressable
                        style={{ padding: 6 }}
                        onPress={() => {
                          router.push({
                            pathname: `/(tabs)/modules/${detailModule.id}/learningSessions/${item.id}/edit`,
                          } as never);
                        }}
                      >
                        <Pencil
                          name="pencil"
                          size={22}
                          color="black"
                          strokeWidth={BASE_STYLES.iconWidth}
                          absoluteStrokeWidth
                        />
                      </Pressable>
                      <Pressable
                        style={{ padding: 6 }}
                        onPress={() => onDeleteTracking(item.id)}
                      >
                        <Trash2
                          size={22}
                          name="trash2"
                          color="red"
                          strokeWidth={BASE_STYLES.iconWidth}
                          absoluteStrokeWidth
                        />
                      </Pressable>
                    </View>
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
    paddingVertical: BASE_STYLES.verticalPadding,
    backgroundColor: COLORTHEME.light.background,
    paddingBottom: BASE_STYLES.verticalPadding,
  },
  scrollViewContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: BASE_STYLES.padding,
    gap: BASE_STYLES.gap,
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
    gap: BASE_STYLES.wrapperGap,
  },
  unitWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: BASE_STYLES.wrapperGap,
  },
  unitRowTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    padding: BASE_STYLES.wrapperGap,
  },
  unitRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
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
    marginVertical: BASE_STYLES.verticalPadding,
    height: 1,
    width: "20%",
  },
  optionWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
