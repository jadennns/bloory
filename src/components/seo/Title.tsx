import { NextSeo } from "next-seo";

interface Props {
  title: string;
}

export default function Title({ title }: Props) {
  return <NextSeo title={title} />;
}
