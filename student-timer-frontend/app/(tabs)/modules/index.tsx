import { RefreshControl, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useFocusEffect, useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import Button from "@/components/Button";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import React from "react";
import { useModules } from "@/context/ModuleContext";
import { H2 } from "@/components/StyledText";

export default function ModulesScreen() {
  const router = useRouter();
  const { modules, fetchModules } = useModules();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      (async () => {
        fetchModules && (await fetchModules());
      })();
      setRefreshing(false);
    }, 300);
  }, []);

  useFocusEffect(onRefresh);

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        style={styles.flatListContainer}
        renderItem={({ item }) => <ModuleCard moduleData={item} />}
        keyExtractor={(item: ModuleType) => item.id.toString()}
        contentContainerStyle={styles.flatListContainerContent}
        refreshControl={
          <RefreshControl
            colors={[COLORTHEME.light.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H2>Es sind noch keine Module vorhanden.</H2>
          </View>
        }
      />
      <Button
        text={"Neues Modul anlegen"}
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={() => router.push("/modules/new")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: BASE_STYLES.horizontalPadding,
  },
  flatListContainer: {
    borderRadius: BASE_STYLES.borderRadius,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  flatListContainerContent: {
    gap: 24,
    paddingBottom: 50 + BASE_STYLES.horizontalPadding,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: BASE_STYLES.horizontalPadding,
    width: "100%",
  },
});
