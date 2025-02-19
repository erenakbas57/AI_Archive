import { Metadata } from "next";

type Props = {
  params: Promise<{ url: string }>; // Burada Promise olmamalı
};

// metadata, "use client" ile beraber kullanılmaz
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const url = ( await params).url; // await kullanmaya gerek yok
  return {
    title: `Sayfa: ${url}`,
    description: "Bu, dinamik olarak oluşturulan bir sayfanın açıklamasıdır.",
  };
};

import ProductPage from "@/components/my/ProductPage";

export default async function Page({ params }: Props) {
  const url = ( await params).url; // await kullanmaya gerek yok


  return <div>
    <ProductPage params={{ url }} />
  </div>;
}
