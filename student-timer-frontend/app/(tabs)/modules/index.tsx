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
import { H3, P } from "@/components/StyledText";

export default function ModulesScreen() {
  const router = useRouter();
  const { modules, fetchModules } = useModules();
  const [refreshing, setRefreshing] = React.useState(false);

  const getModules = async () => {
    fetchModules && (await fetchModules());
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      (async () => {
        await getModules();
      })();
      setRefreshing(false);
    }, 300);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getModules();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        style={styles.flatListContainer}
        renderItem={({ item }) => <ModuleCard moduleData={item} />}
        keyExtractor={(item: ModuleType) => item.id.toString()}
        contentContainerStyle={[
          { flex: modules && modules?.length > 0 ? 0 : 1 },
          styles.flatListContainerContent,
        ]}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H3>Es sind noch keine Module vorhanden.</H3>
            <P style={{ textAlign: "center" }}>
              Erstelle dein erstes Modul oder swipe nach oben, um deine Module
              zu laden.
            </P>
          </View>
        }
        refreshControl={
          <RefreshControl
            colors={[COLORTHEME.light.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
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
    paddingVertical: BASE_STYLES.verticalPadding,
  },
  flatListContainer: {
    borderRadius: BASE_STYLES.borderRadius,
    marginBottom: BASE_STYLES.buttonHeight + BASE_STYLES.verticalPadding,
  },
  flatListContainerContent: {
    gap: BASE_STYLES.gap,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: BASE_STYLES.headingGap,
  },
  button: {
    position: "absolute",
    bottom: BASE_STYLES.verticalPadding,
    width: "100%",
  },
});
