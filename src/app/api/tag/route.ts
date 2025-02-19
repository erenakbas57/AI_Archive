import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";

// ✅ GET: Tüm kullanıcıları getir
export async function GET() {
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({ error: "kategoriler getirilemedi!" }, { status: 500 });
  }
}

// ✅ POST: Yeni kullanıcı ekle
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const tag = await prisma.tag.create({
      data: { name},
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "kategori oluşturulamadı!" }, { status: 500 });
  }
}
