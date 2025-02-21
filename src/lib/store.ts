import { create } from "zustand";
import { Category, Tag, User, Product } from "./models";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Store {
  categories: Category[];
  tags: Tag[];
  users: User[];
  products: Product[];
  isLoading: boolean;
  searchText: string;
  selectedCategories: Category[];
  selectedTags: Tag[];

  getCategories: () => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  getTags: () => Promise<void>;
  addTag: (tag: Tag) => Promise<void>;
  updateTag: (tag: Tag) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;

  getUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  getProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  selectCategory: (category: Category) => void;
  selectTag: (tag: Tag) => void;
  setSearchText: (searchText: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  categories: [],
  tags: [],
  users: [],
  products: [],
  isLoading: false,
  searchText: "",
  selectedCategories: [],
  selectedTags: [],



  getCategories: async () => {
    const response = await fetch(`${API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    const categories = await response.json();
    set({ categories });
  },

  addCategory: async (category) => {
    const response = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(category),
    });
    const newCategory = await response.json();
    set((state) => ({ categories: [...state.categories, newCategory] }));
  },

  updateCategory: async (category) => {
    const response = await fetch(`${API_URL}/category/${category.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(category),
    });
    const updatedCategory = await response.json();
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === category.id ? updatedCategory : c
      ),
    }));
  },

  deleteCategory: async (id) => {
    await fetch(`${API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
      selectedCategories: state.selectedCategories.filter((c) => c.id !== id), // Güncellendi
    }));
  },





  getTags: async () => {
    const response = await fetch(`${API_URL}/tag`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    const tags = await response.json();
    set({ tags });
  },

  addTag: async (tag) => {
    const response = await fetch(`${API_URL}/tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(tag),
    });
    const newTag = await response.json();
    set((state) => ({ tags: [...state.tags, newTag] }));
  },

  updateTag: async (tag) => {
    const response = await fetch(`${API_URL}/tag/${tag.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(tag),
    });
    const updatedTag = await response.json();
    set((state) => ({
      tags: state.tags.map((t) => (t.id === tag.id ? updatedTag : t)),
    }));
  },

  deleteTag: async (id) => {
    await fetch(`${API_URL}/tag/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    set((state) => ({
      tags: state.tags.filter((t) => t.id !== id),
      selectedTags: state.selectedTags.filter((t) => t.id !== id), // Güncellendi
    }));
  },

  getUsers: async () => {
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    const users = await response.json();
    set({ users });
  },

  addUser: async (user) => {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(user),
    });
    const newUser = await response.json();
    set((state) => ({ users: [...state.users, newUser] }));
  },

  updateUser: async (user) => {
    const response = await fetch(`${API_URL}/user/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(user),
    });
    const updatedUser = await response.json();
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? updatedUser : u)),
    }));
  },

  deleteUser: async (id) => {
    await fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },

  getProducts: async () => {
    const response = await fetch(`${API_URL}/product`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    const products = await response.json();
    set({ products });
  },

  addProduct: async (product) => {
    const response = await fetch(`${API_URL}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(product),
    });
    const newProduct = await response.json();
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  updateProduct: async (product) => {
    const response = await fetch(`${API_URL}/product/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(product),
    });
    const updatedProduct = await response.json();
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? updatedProduct : p
      ),
    }));
  },

  deleteProduct: async (id) => {
    await fetch(`${API_URL}/product/${id}`, { method: "DELETE" ,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
    });
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  // Kategoriyi seçme/silme fonksiyonu  
  selectCategory: (category) => {
    set((state) => {
      const isSelected = state.selectedCategories.some(c => c.id === category.id);
      if (isSelected) {
        return { selectedCategories: state.selectedCategories.filter(c => c.id !== category.id) };
      }
      return { selectedCategories: [...state.selectedCategories, category] };
    });
  },

  // Tag'i seçme/silme fonksiyonu
  selectTag: (tag) => {
    set((state) => {
      const isSelected = state.selectedTags.some(t => t.id === tag.id);
      if (isSelected) {
        return { selectedTags: state.selectedTags.filter(t => t.id !== tag.id) };
      }
      return { selectedTags: [...state.selectedTags, tag] };
    });
  },

  setSearchText: (searchText) => {
    set({ searchText });
  },
  
}));
