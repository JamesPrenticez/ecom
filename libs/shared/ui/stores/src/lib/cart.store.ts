import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@shared/models';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (incoming) => {
        const { items } = get();
        const existing = items.find((i) => i.id === incoming.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === incoming.id
                ? { ...i, quantity: i.quantity + (incoming.quantity ?? 1) }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { ...incoming, quantity: incoming.quantity ?? 1 }],
            isOpen: true,
          });
        }
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, qty) => {
        if (qty < 1) {
          get().removeItem(id);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'wild-wash-cart',
      storage: createJSONStorage(() => localStorage),
      // only persist items, not UI state
      partialize: (s) => ({ items: s.items }),
    }
  )
);

// Selectors
export const selectTotalItems = (s: CartStore) =>
  s.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (s: CartStore) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
