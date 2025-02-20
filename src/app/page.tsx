"use client";

import React, { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ProductCard from "@/components/my/ProductCard"; // Ürün kartını içe aktarın
import CategoryCard from "@/components/my/CategoryCard";
import TagCard from "@/components/my/TagCard";
import { useStore } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";

import { Tag, Book } from "lucide-react";

const Home: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { getCategories, getTags, getProducts, searchText, setSearchText } =
    useStore();

  useEffect(() => {
    getCategories();
    getTags();
    getProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold ">
            <Image
              src="/image/logo/512.png" // Başında "public" yok, doğrudan erişiliyor
              width={48}
              height={48}
              alt="Site Logo"
            />
          </Link>

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
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 pt-8 lg:pt-6 h-full overflow-y-auto ">
          <Link href="/" className="text-xl font-semibold">
            <Image
              src="/image/logo/512.png" // Başında "public" yok, doğrudan erişiliyor
              width={72}
              height={72}
              alt="Site Logo"
              className="mb-2"
            />
          </Link>

          {/* Arama kısmı */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Yapay Zeka Ara"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Etiket Seçici */}
          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="tags">
              <AccordionTrigger className="w-full py-2 px-4 text-center border rounded-lg hover:bg-gray-50 hover:no-underline">
                <Tag></Tag>Etiketler
              </AccordionTrigger>
              <TagCard />
            </AccordionItem>
          </Accordion>

          <h2 className="text-sm font-medium flex gap-2  text-black-500 uppercase tracking-wider mb-4">
            <Book/> Kategoriler
          </h2>
          <CategoryCard />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-semibold">Tüm Araçlar</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ProductCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
