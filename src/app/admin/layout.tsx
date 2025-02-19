"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {  Grid , Hash, Brain } from "lucide-react";
import { User } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // usePathname import edildi

const pages = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Ana Sayfa",
    path: "/admin/dashboard",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    label: "YZ Araçları",
    path: "/admin/product",
  },
  {
    icon: <Hash className="h-5 w-5" />,
    label: "Etiketler",
    path: "/admin/tag",
  },
  {
    icon: <Grid className="h-5 w-5" />,
    label: "Kategoriler",
    path: "/admin/category",
  },
  {
    icon: <User className="h-5 w-5" />,
    label: "Kullanıcılar",
    path: "/admin/user",
  },
];

import { useStore } from "@/lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // usePathname kullanıldı
  const { categories, tags, getCategories, getTags, getUsers, getProducts } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getCategories();
    getTags();
    getUsers();
    getProducts();
  }, []);
  
  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    router.push("/admin/login");
  };

  // Mevcut yolun "/admin/login" olup olmadığını kontrol et
  const isLoginPage = pathname === "/admin/login"; // pathname kullanıldı

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Paneli</h1>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {!isLoginPage && (
        <aside
          className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full">
            <div className="p-6">
              <h1 className="text-xl font-bold">Admin Paneli</h1>
            </div>
            <nav className="flex-1 p-4">
              <div className="space-y-1">
                {pages.map((item, index) => (
                  <Link key={index} href={item.path}>
                    <button
                      className="flex items-center space-x-3 w-full px-4 py-2 text-black-600 hover:text-gray-600hover:bg-gray-100 rounded-lg"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </nav>
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="h-5 w-5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
