import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";

// ✅ GET: Belirli bir kullanıcıyı getir
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    
    const { id } = await params;
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id }, 
          { url: id } // params.id burada hem id hem de url olabilir
        ],
      },
    });

    if (!product) return NextResponse.json({ error: "kategori bulunamadı!" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "kategori getirilemedi!" }, { status: 500 });
  }
}

// ✅ PATCH: Kullanıcıyı güncelle

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {
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
    const { id } = await params;
    const updatedProduct = await prisma.product.update({
      where: { id: id },
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
        tag: {
          set: [], // Önce tüm ilişkileri kaldır
          connect: tagId.map((id: string) => ({ id })), // Sonra yenilerini ekle
        }
        
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Beklenmedik bir hata oluştu.";
    return NextResponse.json(
      { error: `Kategori silinemedi! Hata: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Kullanıcıyı sil
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "kategori silindi!" });
  } catch (error) {
    return NextResponse.json(
      { error: "kategori silinemedi!" },
      { status: 500 }
    );
  }
}
