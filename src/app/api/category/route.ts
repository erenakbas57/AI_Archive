import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";

// ✅ GET: Tüm kullanıcıları getir
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "kategoriler getirilemedi!" }, { status: 500 });
  }
}

// ✅ POST: Yeni kullanıcı ekle
export async function POST(req: Request) {
  try {
    const { name, icon } = await req.json();

    const category = await prisma.category.create({
      data: { name, icon },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "kategori oluşturulamadı!" }, { status: 500 });
  }
}
