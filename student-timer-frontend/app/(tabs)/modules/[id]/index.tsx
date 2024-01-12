import { Alert, Pressable, ScrollView, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { H1, H2, P, Subhead } from "@/components/StyledText";
import { ModuleChart } from "@/components/modules/ModuleChart";
import { LearningUnitType } from "@/types/LearningUnitType";
import { COLORTHEME } from "@/constants/Theme";
import { useModules } from "@/context/ModuleContext";
import { useState } from "react";
import React from "react";
import { convertMinutesToHours } from "@/libs/timeHelper";
import { StarIcon, Pencil, Trash2 } from "lucide-react-native";
import { FlatList } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import LearningUnitRow from "@/components/modules/LearningUnitRow";

export default function ModulesDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const router = useRouter();
  const { modules } = useModules();
  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { fetchModules } = useModules();

  // TODO?
  const isLoading = false;
  const error = false;

  const fetchDetailModule = () => {
    if (modules && modules.length > 0) {
      var filteredModule: ModuleType | undefined = modules.find(
        (module) => module.id.toString() === id
      );
      if (filteredModule) {
        // setModuleError(false);
        return filteredModule;
      }
    }

    return {
      id: -1,
      name: "Fehler",
      colorCode: "",
      creditPoints: 0,
      examDate: new Date(),
      learningUnits: [],
      learningSessions: [],
      totalLearningSessionTime: 0,
      totalLearningUnitTime: 0,
      totalLearningTime: 0,
      totalModuleTime: 0,
    } as ModuleType;
  };

  const [moduleError, setModuleError] = useState(false);
  const [detailModule] = useState<ModuleType>(fetchDetailModule());

  const onDelete = (trackingSessionId: number) => {
    Alert.alert(
      "Tracking wirklich löschen?",
      "Möchtest du das Tracking wirklich unwiederuflich löschen?",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Löschen",
          onPress: () => {
            deleteLearningSession(trackingSessionId);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
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
      {moduleError ? (
        <View>
          <H2>Es ist ein Fehler aufgetreten</H2>
        </View>
      ) : (
        <View>
          <H1
            style={{
              color: detailModule?.colorCode,
              paddingTop: 12,
              paddingBottom: 12,
            }}
          >
            {detailModule?.name}
          </H1>
          <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
            <ModuleChart
              inputData={detailModule.learningUnits}
              totalAmount={convertMinutesToHours(detailModule.totalModuleTime)}
              totalAmountDone={convertMinutesToHours(
                detailModule.totalLearningTime
              )}
              width={200}
              height={200}
            />
            <View style={styles.unitWrapper}>
              <H2 style={{ textAlign: "left" }}>Einheiten</H2>
              <View>
                {detailModule?.learningUnits.map((unit: LearningUnitType) => {
                  return (
                    <LearningUnitRow
                      key={unit.id}
                      learningUnit={unit}
                      selfLearningTime={
                        detailModule.totalModuleTime -
                        detailModule.totalLearningTime
                      }
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
                          onPress={() =>
                            router.push({
                              pathname: `modules/${detailModule.id}/learningSessions/${item.id}/edit`,
                            } as never)
                          }
                        >
                          <Pencil name="pencil" size={18} color="black" />
                        </Pressable>
                        <Pressable onPress={() => onDelete(item.id)}>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: "space-around",
    backgroundColor: COLORTHEME.light.background,
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
  unitWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 16,
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
