import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";

// ✅ GET: Belirli bir kullanıcıyı getir
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const category = await prisma.category.findUnique({
//       where: { id: params.id },
//     });

//     if (!category) return NextResponse.json({ error: "kategori bulunamadı!" }, { status: 404 });

//     return NextResponse.json(category);
//   } catch (error) {
//     return NextResponse.json({ error: "kategori getirilemedi!" }, { status: 500 });
//   }
// }

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
        tag: { connect: tagId.map((id: string) => ({ id })) },
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "kategori güncellenemedi!" },
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
