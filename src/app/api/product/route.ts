import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";

// ✅ GET: Tüm kullanıcıları getir
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "kategoriler getirilemedi!" },
      { status: 500 }
    );
  }
}

// ✅ POST: Yeni kullanıcı ekle
export async function POST(req: Request) {
  try {
    console.log("API isteği alındı"); // Bu satırı ekleyin
    const {
      name,
      url,
      image,
      link,
      freeCredits,
      freeCreditRenewal,
      features,
      description,
      categoryId,
      tagId,
    } = await req.json();
    console.log("req.json(): ", name, url, image, link, freeCredits, 
      freeCreditRenewal, features, description, 
      categoryId); // Bu satırı ekleyin
      console.log("categoryId: ", categoryId); // Bu sat
    console.log("tagId: ", tagId); // Bu satırı ekleyin

    const product = await prisma.product.create({
      data: {
        name,
        url,
        image,
        link,
        freeCredits,
        freeCreditRenewal,
        features,
        description,
        categoryId,
        tag: { connect: tagId.map((id: string) => ({ id })) },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Hata:", error); // Konsola hata bilgisini yazdır
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
