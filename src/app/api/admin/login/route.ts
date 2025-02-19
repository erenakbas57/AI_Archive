import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose"; // jose'den gerekli fonksiyonları import ettik
import { prisma } from "@/lib/database";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecretkey"); // Çevresel değişkene koymalısın
const TOKEN_EXPIRATION = "1h"; // Token süresi (1 saat)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // 🔹 Kullanıcıyı veritabanında ara
    const user = await prisma.user.findFirst({ where: { 
      OR: [{ email }, { name: email }]
     } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or username." },
        { status: 401 }
      );
    }

    // 🔹 Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Wrong password." },
        { status: 401 }
      );
    }

    // 🔹 JWT oluşturma
    const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" }) // Hangi algoritmanın kullanılacağını belirt
      .setExpirationTime(TOKEN_EXPIRATION) // Token süresi
      .sign(JWT_SECRET); // Token'ı imzala

    // 🔹 HttpOnly cookie'ye token'ı ekleyelim
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 gün
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
