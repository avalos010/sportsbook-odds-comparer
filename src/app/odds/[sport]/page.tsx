import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;

  return redirect(`odds/${sport}/moneyline`); //redirect to the moneyline page by default
};

export default Page;
