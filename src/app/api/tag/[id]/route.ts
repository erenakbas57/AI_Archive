import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";

// ✅ GET: Belirli bir kullanıcıyı getir
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tag = await prisma.tag.findUnique({
      where: { id: id },
    });

    if (!tag) return NextResponse.json({ error: "kategori bulunamadı!" }, { status: 404 });

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json({ error: "kategori getirilemedi!" }, { status: 500 });
  }
}

// ✅ PATCH: Kullanıcıyı güncelle
export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const { name } = await req.json();
    const {id} = await params;
    const updatedTag = await prisma.tag.update({
      where: { id: id },
      data: { name},
    });

    return NextResponse.json(updatedTag);
  } catch (error) {
    return NextResponse.json({ error: "kategori güncellenemedi!" }, { status: 500 });
  }
}

// ✅ DELETE: Kullanıcıyı sil
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params;
    await prisma.tag.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "kategori silindi!" });
  } catch (error) {
    return NextResponse.json({ error: "kategori silinemedi!" }, { status: 500 });
  }
}
