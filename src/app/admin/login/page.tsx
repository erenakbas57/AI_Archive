"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
       },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    router.push("/admin/dashboard"); // Başarılı giriş sonrası yönlendirme
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Admin Giriş</h2>
        <input
          type="text"
          placeholder="Email ya da Kullanıcı Adı"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border rounded-md mb-2"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border rounded-md mb-2"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}  
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Giriş Yap
        </button>
        
      </form>
    </div>
  );
}
