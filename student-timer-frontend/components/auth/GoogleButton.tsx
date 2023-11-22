import React from "react";
import Button from "@/components/Button";
import { GoogleIcon } from "@/components/Icons";

export default function GoogleButton(props: { onPress?: (val?: any) => void }) {
  const { onPress } = props;
  return (
    <Button
      text="Weiter mit Google"
      backgroundColor="#fff"
      textColor="#1F1F1F"
      borderColor="#747775"
      onPress={onPress}
      iconLeft={<GoogleIcon size={20} />}
    />
  );
}
