import { StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

import { COLORTHEME } from "@/constants/Theme";

import Header from "@/components/Header";
import { Title } from "@/components/StyledText";
import { View, Text } from "@/components/Themed";
import Button from "@/components/Button";
import Separator from "@/components/Separator";
import OtherLogins from "@/components/auth/OtherLogins";

export default function ModuleDetail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onLogin = () => {
    router.push("/(tabs)/");
  };

  return (
    <>
      <Header title="Login"></Header>
      <View style={styles.container}>
        <Title>Student Time Tracker</Title>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Passwort"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
          <View style={styles.buttons}>
            <Button
              text="Log In"
              backgroundColor={COLORTHEME.light.primary}
              textColor={COLORTHEME.light.grey2}
              onPress={onLogin}
            />
          </View>
          <Text>
            Sie haben kein Konto?{" "}
            <Link href="/signup" style={{ textDecorationLine: "underline" }}>
              Account erstellen
            </Link>
          </Text>
          <Separator text="oder" />
          <OtherLogins />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  inputs: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  input: {
    backgroundColor: COLORTHEME.light.grey2,
    color: COLORTHEME.light.grey3,
    width: 350,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: "column",
    width: 200,
    gap: 15,
  },
});

// import { StyleSheet } from "react-native";

// import { H1, H3, P, Subhead } from "@/components/StyledText";
// import { View } from "@/components/Themed";
// import { Stack, useLocalSearchParams } from "expo-router";
// import { ModuleChart } from "@/components/modules/ModuleChart";
// import { ModuleType } from "@/types/ModuleType";

// export default function ModuleDetail() {
//   const { module_id } = useLocalSearchParams();
//   // const module = moduleProp;

//   return (
//     <View>
//       {/* <Stack.Screen options={{ headerTitle: `News #${module_id}` }} /> */}

//       <H1>My News:test</H1>
//     </View>

//     // <View style={styles.outerWrapper}>
//     //   <H1>asdfasdfasdfasdfasd{module_id}</H1>
//     //   <ModuleChart {...module}></ModuleChart>
//     //   <View>
//     //     <H3>Einheiten</H3>
//     //     <View>
//     //       {module.learningUnits.map((unit) => {
//     //         return (
//     //           <View style={styles.unitRow}>
//     //             <View
//     //               style={[
//     //                 styles.moduleIndicatorM,
//     //                 { backgroundColor: unit.colorCode },
//     //               ]}
//     //             />
//     //             <View style={styles.unitRowTitle}>
//     //               <Subhead>{unit.name}</Subhead>
//     //               <P></P>
//     //             </View>
//     //             <Subhead>39 Std.</Subhead>
//     //           </View>
//     //         );
//     //       })}
//     //     </View>
//     //   </View>
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   outerWrapper: {
//     flex: 1,
//     flexDirection: "column",
//     alignContent: "center",
//     justifyContent: "space-between",
//     padding: 16,
//   },
//   unitRow: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignContent: "center",
//   },
//   moduleIndicatorM: {
//     width: 24,
//     height: 24,
//     borderRadius: 1000,
//   },
//   unitRowTitle: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//   },
// });
