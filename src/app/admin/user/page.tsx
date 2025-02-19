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

import { useStore } from "@/lib/store";
import { User } from "@/lib/models";


export default function UsersPage() {
  const { users, getUsers, deleteUser, updateUser, addUser } = useStore();

  const [open, setOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    token: "",
  });

  const [updatedUser, setUpdatedUser] = useState<User>({ ...newUser });

  useEffect(() => {

  }, []);

  const openEditDialog = (user: any) => {
    setEditingUserId(user.id);
    setUpdatedUser({ ...user });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setNewUser({
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
      token: "",
    });
    setUpdatedUser({
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
      token: "",
    });
    setEditingUserId(null);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">Kullanıcılar</h1>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Kullanıcı Ekle
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Kullanıcı Ara..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                { users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">{user.role}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteUser(user.id)}
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
              Kullanıcı Ekle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={editingUserId ? updatedUser.name : newUser.name}
              onChange={(e) =>
                editingUserId
                  ? setUpdatedUser({
                      ...updatedUser,
                      name: e.target.value,
                    })
                  : setNewUser({ ...newUser, name: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={editingUserId ? updatedUser.email : newUser.email}
              onChange={(e) =>
                editingUserId
                  ? setUpdatedUser({
                      ...updatedUser,
                      email: e.target.value,
                    })
                  : setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Input
              placeholder="Şifre"
              value={editingUserId ? updatedUser.password : newUser.password}
              onChange={(e) =>
                editingUserId
                  ? setUpdatedUser({
                      ...updatedUser,
                      password: e.target.value,
                    })
                  : setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button onClick={async () => {
                if (editingUserId) {
                  await updateUser(updatedUser); // Güncelleme işlemi
                } else {
                  await addUser(newUser); // Yeni kategori ekleme işlemi
                }
                closeDialog(); // Popup'ı kapat
              }}
            >
              {editingUserId ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
