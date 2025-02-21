"use client";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

function ProductPage({ params }: { params: { url: string } }) {
  const { tags, products, categories, getCategories, getProducts, getTags } =
    useStore();
  const url = params.url;
  const product = products.find((product) => product.url === url);
  const category = categories.find((c) => c.id === product?.categoryId);
  const productTags = tags.filter((tag) => product?.tagId?.includes(tag.id));

  useEffect(() => {
    if (!product) {
      getProducts();
      getCategories();
      getTags();
    }
  }, []);

  const similarProducts = products
    .filter((p) => p.categoryId === product?.categoryId && p.url !== url)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Sol Taraf - Ürün Bilgileri */}
      <div className="flex-1">
        <article className="prose lg:prose-xl">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">{product?.name}</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mt-6">
            <Image
              src={product?.image || "/image/chatgpt.png"}
              alt="Product Image"
              width={200}
              height={200}
              className="rounded-lg shadow-md border"
            />
            <div className="flex flex-col justify-center text-center md:text-left">
              <p>Kategori</p>
              <div className="text-black-500 text-lg font-semibold">
                {category?.icon || ""}
                {category?.name || ""}
              </div>
              <p>Etiketler</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {productTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    className="bg-yellow-500 hover:cursor-pointer hover:bg-yellow-700 text-white py-1 px-2 m-1 rounded-lg text-sm"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-700 mt-6">{product?.description}</p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Öne Çıkan Özellikler</h2>
            <ul className="list-disc list-inside mt-2">
              <li className="text-gray-600">{product?.features}</li>
            </ul>
          </div>
          <div className="mt-6 flex justify-center md:justify-between items-center border-t pt-4">
            <Link
              href={product ? product.url : "/"}
              target="_blank"
              className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
            >
              Siteye Git
            </Link>
          </div>
        </article>
      </div>

      {/* Sağ Taraf - Benzer Siteler Sekmesi */}
      <aside className="w-full lg:w-1/3">
        <h3 className="text-2xl font-semibold mb-4 text-center lg:text-left">Benzer Siteler</h3>
        <div className="space-y-4">
          {similarProducts.map((similarProduct) => (
            <Link
              href={similarProduct.url}
              key={similarProduct.id}
              className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
            >
              <Image
                src={similarProduct.image || "/image/chatgpt.png"}
                alt={similarProduct.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg border"
              />
              <div>
                <h4 className="text-lg font-semibold">{similarProduct.name}</h4>
                <p className="text-blue-500 text-sm">İncele</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default ProductPage;
