import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  redirect(`odds/${sport}/moneyline`);
};

export default Page;
