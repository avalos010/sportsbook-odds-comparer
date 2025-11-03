import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ sport: string }> }) => {
  const resolvedParams = await params;
  const { sport } = resolvedParams;

  return redirect(`odds/${sport}/moneyline`); //redirect to the moneyline page by default
};

export default Page;
