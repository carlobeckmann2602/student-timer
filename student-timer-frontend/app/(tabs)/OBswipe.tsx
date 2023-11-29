import React, {useState, Fragment, useRef} from "react";
import { Octicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
import { onboardingData } from "@/constants/onboardingItems";
import { ChevronLeftCircle, Circle, ChevronRightCircle } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);


  const navigateToAuthentication = () => {
    router.push("/(auth)/signup");
  };

  const onPrevPress = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
      scrollViewRef.current?.scrollTo({ x: width * (activeIndex - 1), animated: true });
    }
  };

  const onNextPress = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
      scrollViewRef.current?.scrollTo({ x: width * (activeIndex + 1), animated: true });
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
        {/* Onboarding-Beschreibungs-Daten */}
        <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setActiveIndex(newIndex);
            }}
        >
          {onboardingData.map((item, index) => (
              <View key={index} style={{width}}>
                {index === activeIndex && renderOnboardingItem(item)}
              </View>
          ))}
          </ScrollView>

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
              /* <Circle
                key={index}
                style={index === activeIndex ? styles.active : styles.inactive}
                size={50}
              />*/
          ))}

          <TouchableOpacity onPress={onNextPress}>
            <ChevronRightCircle color={COLORTHEME.light.primary} size={50} />
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
  },
  onboardingItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  navigation: {
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
    height: 49.84439468383789,
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
