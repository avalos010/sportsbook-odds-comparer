import ComboBox from "@/components/ComboBox";
import React from "react";

interface ComboBoxClientProps {
  marketsList: {
    label: string;
    value: string;
  }[];
  handlePropSelect: (value: string) => void;
}

function ComboBoxClient({
  marketsList,
  handlePropSelect,
}: ComboBoxClientProps) {
  return <ComboBox list={marketsList} onSelect={handlePropSelect} />;
}

export default ComboBoxClient;
