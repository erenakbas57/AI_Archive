"use client";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function ProductPage({ params }: { params: { url: string } }) {
  const { products, getProducts } = useStore();
  const url = params.url;
  const product = products.find((product) => product.url === url);

  useEffect(() => {
    console.log("ProductPage componenti yüklendi");
    getProducts();
  }, []);
  
  if (!product) {
    console.log("url değeri: ", url);
    console.log("product değeri: ", product);
    return <div>Ürün bulunamadı</div>;
  }

  return <>
    <h1>{product.name}</h1>
    <p>{product.description}</p>    
  </>;
}

export default ProductPage;
