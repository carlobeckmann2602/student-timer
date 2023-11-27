import React from "react";
import Button from "@/components/Button";
import { AppleIcon } from "@/components/Icons";

export default function AppleButton(props: { onPress?: (val?: any) => void }) {
  const { onPress } = props;
  return (
    <Button
      text="Weiter mit Apple"
      backgroundColor="#000"
      textColor="#fff"
      onPress={onPress}
      iconLeft={<AppleIcon size={30} />}
    />
  );
}
