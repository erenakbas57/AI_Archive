import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyJwtToken(token: string) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Anahtar oluştur
    const secretKey = new TextEncoder().encode(JWT_SECRET);

    // JWT doğrula
    const { payload } = await jwtVerify(token, secretKey);

    return payload; // ✅ Token geçerliyse kullanıcı verisini döndür
  } catch (error) {
    console.error("Token verification error:", error);
    return null; // ❌ Token geçersizse null döndür
  }
}
