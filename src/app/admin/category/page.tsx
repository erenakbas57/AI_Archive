"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Shadcn Dialog componentlerini import ettik

import { Category } from "@/lib/models";
import { useStore } from "@/lib/store";

export default function CategoryPage() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategories,
  } = useStore();
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>({
    id: "",
    name: "",
    icon: "",
  }); // Yeni kategori bilgisini tutan state
  const [updatedCategory, setUpdatedCategory] = useState<Category>({
    id: "",
    name: "",
    icon: "",
  });

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );

  
  const openEditDialog = (category?: any) => {
    setEditingCategoryId(category.id);
    setUpdatedCategory({id: category.id, name: category.name, icon: category.icon });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingCategoryId(null);
    setNewCategory({id:"", name: "", icon: "" });
    setUpdatedCategory({id:"", name: "", icon: "" });
  };

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    console.log("kategori sayfasında get çalıştı");
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">Kategoriler</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Kategori Ekle
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Kategori Ara..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Simge</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.icon}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Popup Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategoryId ? "Kategori Düzenle" : "Kategori Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Kategori Adı"
              value={
                editingCategoryId ? updatedCategory.name : newCategory.name
              }
              onChange={(e) =>
                editingCategoryId
                  ? setUpdatedCategory({
                      ...updatedCategory,
                      name: e.target.value,
                    })
                  : setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <Input
              placeholder="Kategori Simgesi"
              value={
                editingCategoryId ? updatedCategory.icon : newCategory.icon
              }
              onChange={(e) =>
                editingCategoryId
                  ? setUpdatedCategory({
                      ...updatedCategory,
                      icon: e.target.value,
                    })
                  : setNewCategory({ ...newCategory, icon: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button
              onClick={async () => {
                if (editingCategoryId) {
                  await updateCategory(updatedCategory); // Güncelleme işlemi
                } else {
                  await addCategory(newCategory); // Yeni kategori ekleme işlemi
                }
                closeDialog(); // Popup'ı kapat
              }}
            >
              {editingCategoryId ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
