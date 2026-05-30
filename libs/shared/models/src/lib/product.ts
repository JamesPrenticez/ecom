export type ProductCategory = 'Bundles' | 'Soap & Body Wash' | 'Hair' | 'Skin' | 'Shave';
export type ProductStatus = 'active' | 'draft';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  desc: string;
  price: number;
  badge?: string;
  bg: string;
  emoji: string;
  status: ProductStatus;
  stock: number;
  createdAt: string;
}
