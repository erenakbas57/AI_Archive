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
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Shadcn Dialog componentlerini import ettik
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { useStore } from "@/lib/store";

import { Category, Product, Tag } from "@/lib/models";
import { TagSelector } from "@/components/my/ui/selectDropdown";

export default function ProductPage() {
  const {
    categories,
    tags,
    products,
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
  } = useStore();

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    url: "",
    image: "",
    link: "",
    freeCredits: 0,
    freeCreditRenewal: "",
    features: "",
    description: "",
    categoryId: "",
    tag: [],
  }); // Yeni kategori bilgisini tutan state
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    id: "",
    name: "",
    url: "",
    image: "",
    link: "",
    freeCredits: 0,
    freeCreditRenewal: "",
    features: "",
    description: "",
    categoryId: "",
    tag: [],
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const openEditDialog = (product: any) => {
    setEditingProductId(product.id);
    setUpdatedProduct({
      id: product.id,
      name: product.name,
      url: product.url,
      image: product.image,
      link: product.link,
      freeCredits: product.freeCredits,
      freeCreditRenewal: product.freeCreditRenewal,
      features: product.features,
      description: product.description,
      categoryId: product.categoryId,
      tag: product.tag,
    });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingProductId(null);
    setNewProduct({
      id: "",
      name: "",
      url: "",
      image: "",
      link: "",
      freeCredits: 0,
      freeCreditRenewal: "",
      features: "",
      description: "",
      categoryId: "",
      tag: [],
    });
    setUpdatedProduct({
      id: "",
      name: "",
      url: "",
      image: "",
      link: "",
      freeCredits: 0,
      freeCreditRenewal: "",
      features: "",
      description: "",
      categoryId: "",
      tag: [],
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">YZ Araçları</h1>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          YZ Ekle
        </Button>
      </div>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input placeholder="YZ Ara..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Kredi</TableHead>
                <TableHead>Etiketler</TableHead>
                <TableHead className="text-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const category = categories.find(
                          (cat) => cat.id === product.categoryId
                        );
                        return category ? (
                          <div>
                            {category.icon}
                            {category.name}
                          </div>
                        ) : null;
                      })()}
                    </TableCell>
                    <TableCell>{product.freeCredits}</TableCell>
                    <TableCell>
                      {product.tag?.length ? (
                        product.tag.map((tagId) => {
                          const tag = tags.find((t) => t.id === tagId.id);
                          return tag ? (
                            <Badge key={tagId.id}>{tag.name}</Badge>
                          ) : null;
                        })
                      ) : (
                        <Badge>Etiket Yok</Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>YZ Bulunamadı</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) closeDialog();
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProductId ? "YZ Düzenle" : "YZ Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Ürün Adı */}
            <Input
              placeholder="YZ Adı"
              value={editingProductId ? updatedProduct.name : newProduct.name}
              onChange={(e) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  : setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            {/* Url Linki */}
            <Input
              placeholder="Path URL'si"
              value={editingProductId ? updatedProduct.url : newProduct.url}
              onChange={(e) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      url: e.target.value,
                    })
                  : setNewProduct({ ...newProduct, url: e.target.value })
              }
            />

            {/* Görsel Linki */}
            <Input
              placeholder="Resim URL'si"
              value={editingProductId ? updatedProduct.image : newProduct.image}
              onChange={(e) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  : setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            {/* Ürün Linki */}
            <Input
              placeholder="YZ Linki"
              value={editingProductId ? updatedProduct.link : newProduct.link}
              onChange={(e) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      link: e.target.value,
                    })
                  : setNewProduct({ ...newProduct, link: e.target.value })
              }
            />

            {/* Ücretsiz Kredi Miktarı */}
            <Input
              type="number"
              placeholder="Ücretsiz Kredi Miktarı"
              value={
                editingProductId
                  ? updatedProduct.freeCredits
                  : newProduct.freeCredits
              }
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0; // Sayıya dönüştür ve NaN için 0 değerini kullan
                if (editingProductId) {
                  setUpdatedProduct({
                    ...updatedProduct,
                    freeCredits: value,
                  });
                } else {
                  setNewProduct({
                    ...newProduct,
                    freeCredits: value,
                  });
                }
              }}
            />

            {/* Kredi Yenileme Süresi */}
            <Input
              placeholder="Kredi Yenileme Süresi"
              value={
                editingProductId
                  ? updatedProduct.freeCreditRenewal
                  : newProduct.freeCreditRenewal
              }
              onChange={(e) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      freeCreditRenewal: e.target.value,
                    })
                  : setNewProduct({
                      ...newProduct,
                      freeCreditRenewal: e.target.value,
                    })
              }
            />

            {/* Kategori Seçimi */}
            <Select
              value={
                editingProductId
                  ? updatedProduct.categoryId
                  : newProduct.categoryId
              }
              onValueChange={(value) =>
                editingProductId
                  ? setUpdatedProduct({ ...updatedProduct, categoryId: value })
                  : setNewProduct({ ...newProduct, categoryId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Kategori Seç" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Etiket Seçimi */}
            <TagSelector
              tags={tags}
              value={
                editingProductId
                  ? updatedProduct.tagId || []
                  : newProduct.tagId || []
              } // undefined yerine boş dizi
              onChange={(selectedTagIds) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      tagId: selectedTagIds,
                    })
                  : setNewProduct({ ...newProduct, tagId: selectedTagIds })
              }
              placeholder="Etiket Seç"
            />

            {/* Ürün Açıklaması */}
            <Textarea
              placeholder="YZ Açıklaması"
              value={
                editingProductId
                  ? updatedProduct.description
                  : newProduct.description
              }
              onChange={(e) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      description: e.target.value,
                    })
                  : setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
              }
            />

            {/* Ürün Özellikleri */}
            <Textarea
              placeholder="YZ Özellikleri"
              value={
                editingProductId ? updatedProduct.features : newProduct.features
              }
              onChange={(e) =>
                editingProductId
                  ? setUpdatedProduct({
                      ...updatedProduct,
                      features: e.target.value,
                    })
                  : setNewProduct({ ...newProduct, features: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button
              onClick={async () => {
                if (editingProductId) {
                  await updateProduct(updatedProduct); // Güncelleme işlemi
                } else {
                  await addProduct(newProduct); // Yeni kategori ekleme işlemi
                }
                closeDialog(); // Popup'ı kapat
              }}
            >
              {editingProductId ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
