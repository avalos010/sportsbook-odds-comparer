"use client";

import ComboBox from "@/components/ComboBox";
import updateSearchParams from "@/utils/updateSearchParams";
import React from "react";

interface ComboBoxClientProps {
  marketsList: {
    label: string;
    value: string;
  }[];
}

function ComboBoxClient({ marketsList }: ComboBoxClientProps) {
  const handlePropSelect = (key: string, label: string) => {
    updateSearchParams("markets", key);
    updateSearchParams("marketsLabel", label);
  };

  return <ComboBox list={marketsList} onSelect={handlePropSelect} />;
}

export default ComboBoxClient;
