import { ActivityIndicator, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useRouter } from "expo-router";

export default function ModulesScreen() {
  const router = useRouter();
  const isLoading = false;
  const error = false;

  const data = [{ id: 1, title: "Iced Espresso", description: "" }];
  // const Item = ({title, description: String }) => (
  //   <View>
  //     <Text style={styles.title}>{title} </Text>
  //     <Text>{description} </Text>
  //   </View>
  // );

  // const DATA = [
  //   ModuleCard("aaaA"),
  //   ModuleCard("BBBB"),
  //   ModuleCard("CCCC"),
  // ];

  // const Item = (item : ModuleCard) => (
  //   <View>
  //     <Text>{item.testText}</Text>
  //   </View>
  // );

  return (
    // <View style={styles.container}>
    //   {isLoading ? (
    //     <ActivityIndicator size="large"></ActivityIndicator>
    //   ) : error ? (
    //     <Text>Something went wrong</Text>
    //   ) : (
    //     <FlatList
    //     data={[1, 2, 3, 4, 5, 6, 7, 8]}
    //     renderItem={({ item }) => (
    //       <Text item={item}></Text>
    //     )}
    //     keyExtractor={(item, index) => index.toString()}
    //     contentContainerStyle={{ columnGap: SIZES.medium }}
    //     horizontal
    //   ></FlatList>
    //   )}

    //   {/* <Text style={styles.title}>Tab Two</Text> */}
    //   <View
    //     style={styles.separator}
    //     lightColor="#eee"
    //     darkColor="rgba(255,255,255,0.1)"
    //   />
    // </View>

    <View style={styles.container}>
      <ModuleCard />
      <ModuleCard />
      <ModuleCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
