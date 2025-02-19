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
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { name, icon } = await req.json();
    const { id } = await params;
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: { name, icon },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: "kategori güncellenemedi!" }, { status: 500 });
  }
}

// ✅ DELETE: Kullanıcıyı sil
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.category.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "kategori silindi!" });
  } catch (error) {
    return NextResponse.json({ error: "kategori silinemedi!" }, { status: 500 });
  }
}
