"use client";
import { useRouter } from "next/navigation";
import { options } from "@/app/odds/[sport]/options";

function Selector({ selectedValue }: SelectorProps) {
  const router = useRouter();

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const option = options.find(
      (val) => val.key.toLowerCase() === e.target.value.toLowerCase()
    );

    if (option) {
      const url = location.pathname;
      router.replace(`${url}${option.path}`);
    }
  }

  return (
    <select
      className="flex mx-auto p-3 my-3"
      onChange={handleSelect}
      value={selectedValue}
    >
      {options.map((option) => (
        <option key={option.key}>{option.key}</option>
      ))}
    </select>
  );
}

export default Selector;

interface SelectorProps {
  selectedValue: string;
}
