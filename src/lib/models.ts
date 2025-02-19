export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface JWT {
  token: string;
  refresh: string;
  expired_time: Date;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  icon: string;

  products?: Product[];
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;

  categoryId?: string;
  category?: Category;

  products?: Product[];
  productsId?: string[];
}

export interface Product {
  id: string;
  name: string;
  url: string;
  image: string;
  link: string;
  freeCredits: number;
  freeCreditRenewal: string;
  features: string;
  description: string;
  categoryId?: string;
  category?: Category;
  tagId?: string[]; // Ürün birden fazla etikete sahip olabilir
  tag?: Tag[];
}
