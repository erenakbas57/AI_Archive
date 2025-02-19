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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tag, Category } from "@/lib/models";
import { useStore } from "@/lib/store";
import { Select } from "@/components/ui/select";

export default function TagsPage() {
  const { categories, tags, addTag, updateTag, deleteTag, getTags } =
    useStore();
  const [open, setOpen] = useState(false);
  const [newTag, setNewTag] = useState<Tag>({
    id: "",
    name: "",
  }); // Yeni kategori bilgisini tutan state
  const [updatedTag, setUpdatedTag] = useState<Tag>({
    id: "",
    name: "",
  });

  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  const openEditDialog = (tag?: any) => {
    setEditingTagId(tag.id);
    setUpdatedTag({ id: tag.id, name: tag.name });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingTagId(null);
    setNewTag({ id: "", name: "" });
    setUpdatedTag({ id: "", name: "" });
  };

  useEffect(() => {
    if (tags.length === 0) {
      getTags();
    }
    console.log("kategori sayfasında get çalıştı");
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">Etiketler</h1>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Etiket Ekle
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Etiket Ara..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                { tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(tag)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteTag(tag.id)}>
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
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) closeDialog(); // Dialog kapandığında tüm verileri sıfırla
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Etiket Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Etiket Adı"
              value={editingTagId ? updatedTag.name : newTag.name}
              onChange={(e) =>
                editingTagId
                  ? setUpdatedTag({
                      ...updatedTag,
                      name: e.target.value,
                    })
                  : setNewTag({ ...newTag, name: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button
              onClick={async () => {
                if (editingTagId) {
                  await updateTag(updatedTag); // Güncelleme işlemi
                } else {
                  await addTag(newTag); // Yeni kategori ekleme işlemi
                }
                closeDialog(); // Popup'ı kapat
              }}
            >
              {editingTagId ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
