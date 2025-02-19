import { prisma } from "@/lib/database";
import bcrypt from "bcryptjs";
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
    const { name, email, password, role = "Admin", token = "" } = await req.json();
    const { id } = await params;

    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { name, email, password: hashPassword, role, token },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "kategori güncellenemedi!" }, { status: 500 });
  }
}

// ✅ DELETE: Kullanıcıyı sil
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "kategori silindi!" });
  } catch (error) {
    return NextResponse.json({ error: "kategori silinemedi!" }, { status: 500 });
  }
}
