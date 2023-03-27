import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const Post = ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.split("_")[1];
  return <div>{league}</div>;
};

export default Post;
