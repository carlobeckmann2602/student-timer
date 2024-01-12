import { Pencil, Trash2 } from "lucide-react-native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { ModuleChart } from "./ModuleChart";
import { H4, P, Subhead } from "../StyledText";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import {
  computeDeadline,
  computeRemainingSessionTime,
} from "@/libs/moduleTypeHelper";
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
  const { fetchModules } = useModules();

  const onEdit = () => {
    router.push({
      pathname: `modules/${moduleData.id}/edit`,
    } as never);
  };

  const onDelete = () => {
    Alert.alert(
      "Modul wirklich löschen?",
      `Möchtest du das Modul "${moduleData.name}" wirklich unwiederuflich löschen?\n Auch die zugehörigen Lerneinheiten und Trackings werden dabei gelöscht.`,
      [
        {
          text: "Abbrechen",
          onPress: () => console.log("Alert closed"),
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
      await authAxios?.delete(
        `/students/${authState?.user.id}/modules/${moduleData.id}`
      );
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
    >
      <View style={styles.outerWrapper}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerRowInnerWrapper}>
            <View
              style={[
                styles.moduleIndicatorM,
                { backgroundColor: moduleData.colorCode },
              ]}
            />
            <H4>{moduleData.name}</H4>
          </View>
          {/* <TouchableOpacity onPress={() => setContextMenuOpen(moduleData.id)}>
            <MoreVertical color="" size={28} fill="black" strokeWidth={1} />
          </TouchableOpacity> */}
          <View style={styles.headerRowInnerWrapper}>
            <Pressable onPress={onEdit} style={{ width: 28 }}>
              <Pencil size={20} color="black" />
            </Pressable>
            <Pressable onPress={onDelete} style={{ width: 28 }}>
              <Trash2 size={20} color="red" />
            </Pressable>
          </View>
        </View>
        {/* Statistics */}
        <View style={styles.statisticsContainer}>
          <ModuleChart
            inputData={moduleData.learningUnits}
            totalAmount={convertMinutesToHours(moduleData.totalModuleTime)}
            totalAmountDone={convertMinutesToHours(
              moduleData.totalLearningTime
            )}
            width={100}
            height={100}
          />
          <View style={styles.statisticsUnitContainer}>
            {moduleData.learningUnits.map((unit) => {
              return (
                <View key={unit.id} style={styles.headerRowInnerWrapper}>
                  <View
                    style={[
                      styles.moduleIndicatorS,
                      { backgroundColor: unit.colorCode },
                    ]}
                  />
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8%",
    gap: 16,
  },
  contextMenuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contextMenuIcon: {
    color: "red",
  },
  separatorV: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  separatorH: {
    width: "100%",
    height: 1,
    backgroundColor: "#909090",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
