"use client";

import ComboBox from "@/components/ComboBox";
import React from "react";

interface ComboBoxClientProps {
  marketsList: {
    label: string;
    value: string;
  }[];
}

function ComboBoxClient({ marketsList }: ComboBoxClientProps) {
  const handlePropSelect = (key: string) => {
    console.log(key);
  };
  return <ComboBox list={marketsList} onSelect={handlePropSelect} />;
}

export default ComboBoxClient;
