import { Pressable, StyleSheet, TextInput } from "react-native";
import Header from "@/components/Header";
import { Title } from "@/components/StyledText";
import { COLORTHEME } from "@/constants/Theme";
import { useState } from "react";
import { View, Text } from "@/components/Themed";
import Button from "@/components/Button";
import Separator from "@/components/Separator";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLogin = () => {
    router.push("/");
  };
  const onLoginGoogle = () => {};
  const onLoginApple = () => {};
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
            placeholder="Password"
            keyboardType="visible-password"
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
            Dont have an account?{" "}
            <Link href="/signup" style={{ textDecorationLine: "underline" }}>
              Create Account
            </Link>
          </Text>
          <Separator text="or" />
          <View style={styles.buttons}>
            <Button
              text="Log In with Google"
              backgroundColor={COLORTHEME.light.primary}
              textColor={COLORTHEME.light.grey2}
              onPress={onLoginGoogle}
            />
            <Button
              text="Log In with Apple"
              backgroundColor={COLORTHEME.light.primary}
              textColor={COLORTHEME.light.grey2}
              onPress={onLoginApple}
            />
          </View>
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
