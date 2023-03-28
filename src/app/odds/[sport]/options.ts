export const options: Option[] = [
  { key: "MoneyLine", path: "/" },
  { key: "Spread", path: "/spread" },
  { key: "Points", path: "/points" },
];

interface Option {
  key: string;
  path: string;
}
