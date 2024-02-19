import React from "react";
import { View } from "@/components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { StarIcon } from "lucide-react-native";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";

type Props = {
  starAmount: number;
  color?: string;
  interactive?: boolean;
  setStarAmount?: (value: React.SetStateAction<number>) => void;
};

export default function StarRating({
  starAmount,
  color,
  interactive = false,
  setStarAmount,
}: Props) {
  if (interactive)
    return (
      <View style={styles.stars}>
        {setStarAmount &&
          [...Array(5)].map((_, index) => (
            <Pressable
              key={index}
              onPress={() => setStarAmount(index + 1)}
              style={styles.star}
            >
              <StarIcon
                name="star"
                color={color || COLORTHEME.light.primary}
                fill={color || COLORTHEME.light.primary}
                size={52}
                fillOpacity={index < starAmount ? 1 : 0.1}
                strokeWidth={BASE_STYLES.iconWidth}
                absoluteStrokeWidth
              />
            </Pressable>
          ))}
      </View>
    );
  else
    return (
      <View style={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            name="star"
            color={color || COLORTHEME.light.primary}
            fill={color || COLORTHEME.light.primary}
            size={52}
            fillOpacity={index < starAmount ? 1 : 0.1}
            strokeWidth={BASE_STYLES.iconWidth}
            absoluteStrokeWidth
          />
        ))}
      </View>
    );
}

const styles = StyleSheet.create({
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    gap: BASE_STYLES.wrapperGap,
  },
  star: {
    cursor: "pointer",
  },
});
