import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, ProductCategory, ProductStatus } from '@shared/models';

const SEED: Product[] = [
  { id: 'starter-bundle',     name: 'Starter Bundle',            category: 'Bundles',          desc: 'The perfect intro — our best-selling soap, shampoo, and shave gel in one box.', price: 54.99, badge: 'Best Value', bg: 'linear-gradient(135deg, #1a0d30 0%, #3d1a6e 100%)', emoji: '🎁', status: 'active', stock: 42,  createdAt: '2025-01-01T00:00:00Z' },
  { id: 'full-set',           name: 'The Wild Set',              category: 'Bundles',          desc: 'Every category covered. One box, complete routine.',                            price: 89.99, badge: 'Save 20%', bg: 'linear-gradient(135deg, #0d1a30 0%, #1a3d6e 100%)', emoji: '📦', status: 'active', stock: 18,  createdAt: '2025-01-02T00:00:00Z' },
  { id: 'cedar-pine-soap',    name: 'Cedar & Pine Bar Soap',     category: 'Soap & Body Wash', desc: 'Cold-pressed with real cedarwood and pine essential oils. Long-lasting, rich lather.', price: 12.99, badge: 'Best Seller', bg: 'linear-gradient(135deg, #0a2e1a 0%, #145c30 100%)', emoji: '🌲', status: 'active', stock: 120, createdAt: '2025-01-03T00:00:00Z' },
  { id: 'charcoal-body-wash', name: 'Activated Charcoal Body Wash', category: 'Soap & Body Wash', desc: 'Deep-cleansing activated charcoal formula that draws out impurities without stripping skin.', price: 18.99, bg: 'linear-gradient(135deg, #111111 0%, #2d2d2d 100%)', emoji: '🖤', status: 'active', stock: 64,  createdAt: '2025-01-04T00:00:00Z' },
  { id: 'citrus-liquid-soap', name: 'Citrus Burst Liquid Soap',  category: 'Soap & Body Wash', desc: 'Uplifting blend of orange, grapefruit, and lemon. Light, foamy, and energising.', price: 15.99, badge: 'New', bg: 'linear-gradient(135deg, #2e1a00 0%, #5c3a00 100%)', emoji: '🍊', status: 'active', stock: 55,  createdAt: '2025-01-05T00:00:00Z' },
  { id: 'eucalyptus-wash',    name: 'Eucalyptus Body Wash',      category: 'Soap & Body Wash', desc: 'Cooling eucalyptus and mint — the wake-up call your shower routine needs.',     price: 16.99, bg: 'linear-gradient(135deg, #003030 0%, #006060 100%)', emoji: '🌿', status: 'active', stock: 38,  createdAt: '2025-01-06T00:00:00Z' },
  { id: 'wild-shampoo',       name: 'Wild Shampoo',              category: 'Hair',             desc: 'Sulphate-free formula with argan oil and biotin. For all hair types.',          price: 22.99, badge: 'Best Seller', bg: 'linear-gradient(135deg, #1e0a40 0%, #4a1e8c 100%)', emoji: '✨', status: 'active', stock: 88,  createdAt: '2025-01-07T00:00:00Z' },
  { id: 'deep-conditioner',   name: 'Deep Conditioner',          category: 'Hair',             desc: 'Intense moisture treatment with shea butter and keratin. Leave in for 5 minutes.', price: 24.99, bg: 'linear-gradient(135deg, #2a0e4a 0%, #5c1a99 100%)', emoji: '💜', status: 'active', stock: 72,  createdAt: '2025-01-08T00:00:00Z' },
  { id: 'hair-oil',           name: 'Wild Hair Oil',             category: 'Hair',             desc: 'Lightweight blend of jojoba, rosehip, and vitamin E. Frizz control without the grease.', price: 28.99, badge: 'New', bg: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a6e 100%)', emoji: '💧', status: 'active', stock: 45,  createdAt: '2025-01-09T00:00:00Z' },
  { id: 'daily-face-wash',    name: 'Daily Face Wash',           category: 'Skin',             desc: 'Gentle pH-balanced cleanser for all skin types. No parabens, no sulphates.',    price: 19.99, bg: 'linear-gradient(135deg, #2e0e1a 0%, #5c1a38 100%)', emoji: '🌸', status: 'active', stock: 95,  createdAt: '2025-01-10T00:00:00Z' },
  { id: 'hydrating-moisturiser', name: 'Hydrating Moisturiser',  category: 'Skin',             desc: 'Hyaluronic acid and ceramide complex. 24-hour hydration, non-comedogenic.',     price: 28.99, badge: 'Best Seller', bg: 'linear-gradient(135deg, #2e1a0a 0%, #5c3820 100%)', emoji: '🫧', status: 'active', stock: 60,  createdAt: '2025-01-11T00:00:00Z' },
  { id: 'vitamin-c-serum',    name: 'Vitamin C Serum',           category: 'Skin',             desc: '15% stable vitamin C with ferulic acid. Brightens, firms, and protects.',       price: 34.99, badge: 'New', bg: 'linear-gradient(135deg, #2e1a00 0%, #5c3a00 100%)', emoji: '⭐', status: 'active', stock: 33,  createdAt: '2025-01-12T00:00:00Z' },
  { id: 'wild-shave-gel',     name: 'Wild Shave Gel',            category: 'Shave',            desc: 'Cushioning shave gel with aloe vera. Transparent for precision, soothing on contact.', price: 14.99, bg: 'linear-gradient(135deg, #0a1a2e 0%, #1a3a5c 100%)', emoji: '🪒', status: 'active', stock: 80,  createdAt: '2025-01-13T00:00:00Z' },
  { id: 'post-shave-balm',    name: 'Post-Shave Balm',           category: 'Shave',            desc: 'Alcohol-free soothing balm with bisabolol and witch hazel. Zero sting.',        price: 18.99, bg: 'linear-gradient(135deg, #0d2030 0%, #1a3d52 100%)', emoji: '❄️', status: 'active', stock: 51,  createdAt: '2025-01-14T00:00:00Z' },
];

export type { ProductCategory, ProductStatus };

interface ProductStore {
  products: Product[];
  addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => void;
  deleteProduct: (id: string) => void;
  toggleStatus: (id: string) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: SEED,

      addProduct: (p) =>
        set((s) => ({
          products: [
            ...s.products,
            { ...p, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),

      updateProduct: (id, updates) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      toggleStatus: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id
              ? { ...p, status: p.status === 'active' ? 'draft' : 'active' }
              : p
          ),
        })),
    }),
    {
      name: 'wild-wash-products',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
