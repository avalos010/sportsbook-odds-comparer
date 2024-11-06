"use client";

import ComboBox from "@/components/ComboBox";
import { useSearchParams } from "next/navigation";

interface ComboBoxClientProps {
  marketsList: {
    label: string;
    value: string;
  }[];
}

function ComboBoxClient({ marketsList }: ComboBoxClientProps) {
  const searchParams = useSearchParams();

  const handlePropSelect = (key: string, label: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("markets", key);
    params.set("marketsLabel", label);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return <ComboBox list={marketsList} onSelect={handlePropSelect} />;
}

export default ComboBoxClient;
