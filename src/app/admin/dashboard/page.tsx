"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Grid , Hash, Brain } from "lucide-react";
import React from "react";
import { useStore } from "@/lib/store";

export default function DashboardPage() {
  const { products, categories, tags } = useStore();

  // Dinamik istatistikleri oluştur
  const stats = [
    { title: "YZ", value: products.length.toString(), icon: Brain},
    { title: "Kategoriler", value: categories.length.toString(), icon: Grid },
    { title: "Etiketler", value: tags.length.toString(), icon: Hash},
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Analizler</h1>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon  strokeWidth={2.5} className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
