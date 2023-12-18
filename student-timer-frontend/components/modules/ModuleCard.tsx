import { MoreVertical, Pencil, Trash2 } from "lucide-react-native";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ModuleChart } from "./ModuleChart";
import { H4, P, Subhead } from "../StyledText";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { computeDeadline } from "@/libs/moduleTypeHelper";
import { convertMinutesToHours } from "@/libs/timeHelper";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";

type ModuleCardProps = {
  moduleData: ModuleType;
  contextMenuOpen: number;
  setContextMenuOpen: (value: any) => void;
};

export function ModuleCard(props: ModuleCardProps) {
  const { moduleData, contextMenuOpen, setContextMenuOpen } = props;

  const router = useRouter();
  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { modules, setModules } = useModules();

  const onEdit = () => {};

  const onDelete = () => {
    Alert.alert(
      "Modul wirklich löschen?",
      `Möchtest du das Modul "${moduleData.name}" wirklich unwiederuflich löschen? Alle zum Modul gehörenden Lerneinheiten und Trackings werden dabei gelöscht.`,
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
    console.log("teststest");
    let id = toast.show("Löschen...");
    try {
      await authAxios?.delete(
        `/students/${authState?.user.id}/modules/${moduleData.id}`
      );
      toast.update(id, "Modul erfolgreich gelöscht", { type: "success" });
    } catch (e) {
      toast.update(id, `Fehler beim Löschen des Moduls: ${e}`, {
        type: "danger",
      });
    } finally {
      router.push({
        pathname: "/(tabs)/(tracking)/",
        params: {
          trackingSaved: 1,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (contextMenuOpen === moduleData.id) setContextMenuOpen(-1);
        else {
          router.push({
            pathname: `modules/${moduleData.id}`,
          } as never);
        }
      }}
    >
      <View style={styles.outerWrapper}>
        {contextMenuOpen === moduleData.id && (
          <View style={styles.contextMenuWrapper}>
            <TouchableOpacity onPress={onEdit} style={styles.contextMenuRow}>
              <P>Bearbeiten</P>
              <Pencil name="pencil" size={18} color="black" />
            </TouchableOpacity>
            <View style={styles.separatorH} />
            <TouchableOpacity onPress={onDelete} style={styles.contextMenuRow}>
              <P style={{ color: "red" }}>Löschen</P>
              <Trash2 size={18} name="trash2" color="red" />
            </TouchableOpacity>
          </View>
        )}
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextRow}>
            <View
              style={[
                styles.moduleIndicatorM,
                { backgroundColor: moduleData.colorCode },
              ]}
            />
            <H4>{moduleData.name}</H4>
          </View>
          <TouchableOpacity onPress={() => setContextMenuOpen(moduleData.id)}>
            <MoreVertical size={28} fill="black" strokeWidth={1}></MoreVertical>
          </TouchableOpacity>
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
                <View key={unit.id} style={styles.headerTextRow}>
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
              )} von ${convertMinutesToHours(
                moduleData.totalLearningUnitTime
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
  contextMenuWrapper: {
    position: "absolute",
    right: 60,
    top: 30,
    zIndex: 1,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8%",
    backgroundColor: COLORTHEME.light.grey2,
    shadowColor: "black",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 0.5,
    shadowRadius: 5,
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
    alignItems: "center",
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
  headerTextRow: {
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
