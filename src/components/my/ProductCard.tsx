import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import Link from "next/link";

const ProductCard = () => {
  const { products, categories, tags, selectedTags, selectedCategories, searchText } = useStore();

  const isValidImageSrc = (src: string) => {
    return (
      src &&
      (src.startsWith("/") ||
        src.startsWith("http://") ||
        src.startsWith("https://"))
    );
  };

  const filteredProducts = products.filter((product) => {
    const productTags = product.tagId || [];
    const productCategories = product.categoryId || "";

    // Eğer arama metni varsa, isme veya açıklamaya göre filtrele
    const matchesSearch =
      searchText.length === 0 ||
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());

    // Eğer etiket seçili değilse tüm ürünleri getir
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => productTags.includes(tag.id));

    // Eğer kategori seçili değilse tüm ürünleri getir
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        productCategories.includes(category.id)
      );

    return matchesSearch && matchesTags && matchesCategories;
  });

  return (
    <>
      {filteredProducts.map((product) => {
        // Kategoriyi bul
        const category = categories.find((cat) => cat.id === product.categoryId);
        const categoryName = category ? category.name : "Bilinmiyor"; // Kategori adını al
        const categoryIcon = category ? category.icon : "Bilinmiyor"; // Kategori adını al
        const productTags = tags.filter((tag) => product.tagId?.includes(tag.id)); 

        return (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4 flex-grow">
                <div className="flex items-start gap-4">
                  <Image
                    src={
                      isValidImageSrc(product.image)
                        ? product.image
                        : "/image/chatgpt.png"
                    }
                    alt="product"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl border shadow-sm flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-md">{categoryIcon}{categoryName}</p> {/* Kategori adını burada göster */}
                  </div>
                </div>
                <div>
                  <Badge className="self-start hover:cursor-pointer">
                    {product.freeCredits} kredi - {product.freeCreditRenewal}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex flex-wrap gap-2">{product.features}</div>
                <div className="flex flex-wrap gap-2">
                  {productTags.map((tag) => (
                    <Badge className="bg-yellow-500 hover:cursor-pointer hover:bg-yellow-700" key={tag.id}>{tag.name}</Badge>
                  ))}
                  </div>
              </div>
              <div className="flex items-center mt-4 justify-between pt-4 border-t">
                <Link
                  href={product.url}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Detayları İncele
                </Link>
                <Link
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Siteye Git
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default ProductCard;
