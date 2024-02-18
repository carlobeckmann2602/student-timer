import { useEffect, useState } from "react";
import { Dimensions, ScaledSize, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ToastOptions,
  ToastProps,
} from "react-native-toast-notifications/lib/typescript/toast";
import { ToastType } from "react-native-toast-notifications";

import { View, Text } from "./Themed";
import Spinner from "./Spinner";
import { COLORTHEME, COLORS } from "@/constants/Theme";

const TOAST_DURATION = 1000 * 5;
const TOAST_LOADING_DURATION = 1000 * 60 * 5;

export default function Toast(props: ToastProps) {
  const { data, message, type } = props;
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const onChange = ({ window }: { window: ScaledSize }) => {
    setDimensions(window);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const getTypeColor = () => {
    switch (type) {
      case "success":
        return COLORS.success;
      case "warning":
        return COLORS.warning;
      case "danger":
        return COLORS.danger;
      default:
        return COLORTHEME.light.primary;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.toastContainer,
          {
            maxWidth: (dimensions.width / 10) * 9,
            borderLeftColor: getTypeColor(),
          },
        ]}
      >
        <View style={[styles.background, styles.textContainer]}>
          {data?.title && <Text style={styles.title}>{data.title}</Text>}
          <Text style={styles.message}>{message}</Text>
        </View>
        {type === "loading" && (
          <View style={styles.background}>
            <Spinner size="small" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export const toastShow = (
  toast: ToastType,
  message: string | JSX.Element,
  toastOptions?: ToastOptions | undefined
) => toast.show(message, getToastOptions(toastOptions));

export const toastUpdate = (
  toast: ToastType,
  toastId: string,
  message: string | JSX.Element,
  toastOptions?: ToastOptions | undefined
) => toast.update(toastId, message, getToastOptions(toastOptions));

const getToastOptions = (toastOptions?: ToastOptions | undefined) =>
  toastOptions
    ? {
        ...toastOptions,
        duration: toastOptions.duration
          ? toastOptions.duration
          : toastOptions.type === "loading"
          ? TOAST_LOADING_DURATION
          : TOAST_DURATION,
      }
    : toastOptions;

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
  },
  background: {
    backgroundColor: "transparent",
  },
  title: {
    fontFamily: "OpenSans_Bold",
    fontSize: 14,
    color: "#333",
  },
  message: {
    color: "#a3a3a3",
  },
});
