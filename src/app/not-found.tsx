import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white text-center p-6">
            <div className="flex flex-col items-center">
            <Ghost className="w-24 h-24 text-black" />
            <h1 className="text-4xl text-black font-bold mt-4">404 - Sayfa Bulunamadı</h1>
            <p className="text-black font-bold mt-2 max-w-md">
              Aradığınız sayfa yapay zeka tarafından silinmiş olabilir veya hiç
              var olmamış olabilir.
            </p>
            <Link href="/">
              <Button className="mt-6 bg-blue-600 hover:bg-blue-500">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </div>
      );
}
