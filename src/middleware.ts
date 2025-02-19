import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/auth";


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 API yollarını kontrol et
  if (pathname.startsWith("/api")) {
    const token = req.headers.get("Authorization");
    const validToken = `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`;
    if (!token || token !== validToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 🔹 Admin altındaki sayfalar için giriş kontrolü
  if (pathname.startsWith("/admin")) {
    const { cookies } = req;
    const token = cookies.get("token")?.value ?? null;
    const isValidToken = token ? await verifyJwtToken(token) : false;

    // 🔥 Eğer giriş yapılmadıysa, `/admin/login` sayfasına yönlendir
    if (!isValidToken && pathname !== "/admin/login") {

      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", pathname); // Girişten sonra yönlendirme için
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("token"); // Geçersiz token'ı temizle
      return response;
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

// Middleware'in hangi yolları koruyacağını belirle
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"], // Tüm /api ve /admin yollarını korur
};
