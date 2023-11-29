import React, {useState, Fragment, useRef} from "react";
import { Octicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
import { onboardingData } from "@/constants/onboardingItems";
import {ChevronLeftCircle, ChevronRightCicle, ChevronRightCircle} from "lucide-react-native";
import { useRouter } from "expo-router";
import Header from "../../components/Header";

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const navigateToAuthentication = () => {
    router.push("/(auth)/signup");
  };

  const onPrevPress = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const onNextPress = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      navigateToAuthentication();
    }
  };

  const renderOnboardingItem = ({
    title,
    description,
    image,
  }: {
    title: string;
    description: string;
    image: ImageSourcePropType;
  }) => {
    console.log(image);
    return (
        <View style={styles.onboardingItem}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Image source={image} style={styles.image}/>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <View>
          <Header title="StudentTimer"></Header>
        </View>
        {/* Onboarding-Beschreibungs-Daten */}
        <View style={styles.onboardingItem}>
          {onboardingData.map((item, index) => (
              <View key={index} >
                {index === activeIndex && renderOnboardingItem(item)}
              </View>
          ))}
        </View>
        {/* Onboarding-Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity onPress={onPrevPress} disabled={activeIndex === 0}>
            <ChevronLeftCircle
                color={activeIndex === 0 ? COLORTHEME.light.grey1 : COLORTHEME.light.primary}
                size={50}
            />
          </TouchableOpacity>

          {/* Punkte für jeden Onboarding-Screen */}
          {onboardingData.map((_, index) => (
              <Octicons
                  key={index}
                  style={index === activeIndex ? styles.active : styles.inactive}
                  name="dot-fill"
                  size={50}
              />
          ))}

          <TouchableOpacity onPress={onNextPress}>
            <ChevronRightCircle
                color={COLORTHEME.light.primary}
                size={50}
            />
          </TouchableOpacity>
        </View>

      <Button
        text="Überspringen"
        backgroundColor={COLORTHEME.light.primary}
        textColor="#FFFFFF"
        onPress={navigateToAuthentication}
        style={{ width: 300, marginVertical: 20, height: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 15
  },
  onboardingItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  description: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  navigation: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: COLORTHEME.light.grey1,
    borderStyle: 'solid',
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  inactive: {
    fontSize: 24,
    color: COLORTHEME.light.grey1,
  },
  active: {
    fontSize: 24,
    color: COLORTHEME.light.primary,
  },
  button: {
    width: 175,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORTHEME.light.primary,
    padding: 10,
    margin: 5,
  },
  buttontext: {
    textAlign: "center",
    color: "#F6F6F6",
  },
});
