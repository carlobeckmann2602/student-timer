import { Pencil, Trash2 } from "lucide-react-native";
import { View, StyleSheet, TouchableOpacity, Alert, Pressable } from "react-native";
import { ModuleChart } from "./ModuleChart";
import { H4, P, Subhead } from "../StyledText";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { computeDeadline, computeRemainingSessionTime } from "@/libs/moduleTypeHelper";
import { convertMinutesToHours } from "@/libs/timeHelper";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";

type moduleCardProps = {
  moduleData: ModuleType;
};

export function ModuleCard(props: moduleCardProps) {
  const { moduleData } = props;

  const router = useRouter();
  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { fetchModules, resetUnitStatus } = useModules();

  const onEdit = () => {
    resetUnitStatus && resetUnitStatus(moduleData);
    router.push({
      pathname: `modules/${moduleData.id}/edit`,
    } as never);
  };

  const onDelete = () => {
    Alert.alert(
      "Modul wirklich löschen?",
      `Möchtest du das Modul "${moduleData.name}" wirklich unwiderruflich löschen?\n Auch die zugehörigen Lerneinheiten und Trackings werden dabei gelöscht.`,
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Löschen",
          onPress: () => {
            handleDelete();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async () => {
    let id = toast.show("Löschen...", { type: "loading" });
    try {
      await authAxios?.delete(`/students/${authState?.user.id}/modules/${moduleData.id}`);
      toast.update(id, "Modul erfolgreich gelöscht", { type: "success" });
      fetchModules && (await fetchModules());
    } catch (e) {
      toast.update(id, `Fehler beim Löschen des Moduls: ${e}`, {
        type: "danger",
      });
    } finally {
      router.push("/(tabs)/modules");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: `modules/${moduleData.id}`,
        } as never);
      }}
      style={styles.outerWrapper}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerRowInnerWrapper}>
          <View style={[styles.moduleIndicatorM, { backgroundColor: moduleData.colorCode }]} />
          <H4 style={{ textAlign: "left", flexWrap: "nowrap", flexShrink: 1 }} numberOfLines={2}>
            {moduleData.name}
          </H4>
          {/* </View> */}
        </View>
        <View style={styles.optionWrapper}>
          <Pressable onPress={onEdit} style={{ padding: 6 }}>
            <Pencil size={22} color="black" />
          </Pressable>
          <Pressable onPress={onDelete} style={{ padding: 6 }}>
            <Trash2 size={22} color="red" />
          </Pressable>
        </View>
      </View>
      {/* Statistics */}
      <View style={styles.statisticsContainer}>
        <ModuleChart
          inputData={moduleData.learningUnits}
          totalAmount={convertMinutesToHours(moduleData.totalModuleTime)}
          totalAmountDone={convertMinutesToHours(moduleData.totalLearningTime)}
          width={100}
          height={100}
        />
        <View style={styles.statisticsUnitContainer}>
          {moduleData.learningUnits.map((unit) => {
            return (
              <View key={unit.id} style={styles.headerRowInnerWrapper}>
                <View style={[styles.moduleIndicatorS, { backgroundColor: unit.colorCode }]} />
                <P>{unit.name}</P>
              </View>
            );
          })}
        </View>
      </View>
      {/* Results */}
      <View style={styles.headerRow}>
        <View style={styles.resultColumn}>
          <P style={{ textAlign: "center" }}>Zeit bis zur Prüfung</P>
          <Subhead>{computeDeadline(moduleData.examDate)}</Subhead>
        </View>
        <View style={styles.separatorV} />
        <View style={styles.resultColumn}>
          <P style={{ textAlign: "center" }}>Selbststudium</P>
          <Subhead>
            {`${convertMinutesToHours(
              moduleData.totalLearningSessionTime
            )} von ${computeRemainingSessionTime(
              moduleData.totalModuleTime,
              moduleData.totalLearningTime
            )} Std.`}
          </Subhead>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: BASE_STYLES.borderRadius,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "6%",
    gap: 16,
  },
  separatorV: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  headerRow: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  moduleIndicatorM: {
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
  moduleIndicatorS: {
    width: 16,
    height: 16,
    borderRadius: 1000,
  },
  headerRowInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  optionWrapper: {
    minWidth: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 4,
    flexBasis: 72,
  },
  resultColumn: {
    width: "45%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  statisticsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  statisticsUnitContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
});
