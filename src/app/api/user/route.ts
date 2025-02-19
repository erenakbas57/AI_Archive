import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

// ✅ GET: Tüm kullanıcıları getir
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "kategoriler getirilemedi!" }, { status: 500 });
  }
}

// ✅ POST: Yeni kullanıcı ekle
export async function POST(req: Request) {
  try {
    const { name, email, password, role = "Admin", token = "" } = await req.json();

    const hashPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { name, email, password: hashPassword, role, token },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "kategori oluşturulamadı!" }, { status: 500 });
  }
}
