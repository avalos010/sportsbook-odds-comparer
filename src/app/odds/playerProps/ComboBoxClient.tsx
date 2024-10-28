"use client";

import ComboBox from "@/components/ComboBox";
import updateSearchParams from "@/utils/updateSearchParams";
import React from "react";
import { PlayerPropsData } from "./page";

interface ComboBoxClientProps {
  props: PlayerPropsData;
  marketsList: {
    label: string;
    value: string;
  }[];
}

function ComboBoxClient({ marketsList, props }: ComboBoxClientProps) {
  const handlePropSelect = (key: string, label: string) => {
    updateSearchParams("markets", key);
    updateSearchParams("marketsLabel", label);
  };

  return <ComboBox list={marketsList} onSelect={handlePropSelect} />;
}

export default ComboBoxClient;
