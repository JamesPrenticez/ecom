import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Product } from '@shared/models';
import { api } from '../lib/api';

type ProductInput = Omit<Product, 'id' | 'createdAt'>;

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get<{ products: Product[] }>('/admin/products');
      return res.data.products;
    },
  });
}

export function useAddProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInput) =>
      api.post<{ product: Product }>('/admin/products', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<ProductInput> & { id: string }) =>
      api.patch<{ product: Product }>(`/admin/products/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/admin/products/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useToggleProductStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Product['status'] }) =>
      api.patch<{ product: Product }>(`/admin/products/${id}`, {
        status: status === 'active' ? 'draft' : 'active',
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
