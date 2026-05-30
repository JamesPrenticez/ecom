import styled from '@emotion/styled';
import type { Product, ProductCategory, ProductStatus } from '@shared/models';
import { useState } from 'react';
import { useDeleteProduct, useProducts, useToggleProductStatus } from '../../hooks/use-products';
import { ProductForm } from './product-form';

/* ── Styles ─────────────────────────────────────────────────────── */

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 3.2rem;
  border-bottom: 1px solid var(--admin-border);
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary, #f0f8ff);
  margin: 0;
`;

const PageSub = styled.p`
  font-size: 1.3rem;
  color: var(--text-muted, #6a6e69);
  margin: 0;
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  border: none;
  background: var(--color-primary, #00b9e2);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;

  &:hover { background: var(--color-primary-accent, #0082a8); }
`;

/* ── Stats ───────────────────────────────────────────────────────── */

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  padding: 2rem 3.2rem;
  border-bottom: 1px solid var(--admin-border);
  flex-shrink: 0;
`;

const StatCard = styled.div`
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 1rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StatLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted, #6a6e69);
`;

const StatValue = styled.span`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--text-primary, #f0f8ff);
  line-height: 1;
`;

/* ── Toolbar ─────────────────────────────────────────────────────── */

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.6rem 3.2rem;
  border-bottom: 1px solid var(--admin-border);
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 32rem;
  padding: 0.9rem 1.4rem;
  border-radius: 0.8rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface);
  color: var(--text-primary, #f0f8ff);
  font-size: 1.4rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;

  &::placeholder { color: var(--text-muted, #6a6e69); }
  &:focus { border-color: var(--color-primary, #00b9e2); }
`;

const FilterSelect = styled.select`
  padding: 0.9rem 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface);
  color: var(--text-secondary, #8aafc4);
  font-size: 1.4rem;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;

  option { background: #1a1a1a; }
  &:focus { border-color: var(--color-primary, #00b9e2); }
`;

const ResultCount = styled.span`
  font-size: 1.3rem;
  color: var(--text-muted, #6a6e69);
  margin-left: auto;
`;

/* ── Table ───────────────────────────────────────────────────────── */

const TableWrap = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 3.2rem 3.2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.6rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted, #6a6e69);
  border-bottom: 1px solid var(--admin-border);
  white-space: nowrap;
`;

const Tr = styled.tr`
  border-bottom: 1px solid var(--admin-border);
  transition: background 0.12s;

  &:hover { background: var(--admin-hover); }
  &:last-child { border-bottom: none; }
`;

const Td = styled.td`
  padding: 1.2rem 1.2rem;
  font-size: 1.4rem;
  color: var(--text-secondary, #8aafc4);
  vertical-align: middle;
`;

const ProductThumb = styled.div<{ bg: string }>`
  width: 4rem;
  height: 4rem;
  border-radius: 0.8rem;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
`;

const ProductNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ProductNameText = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary, #f0f8ff);
`;

const CategoryChip = styled.span`
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 10rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-secondary, #8aafc4);
`;

const StatusBadge = styled.span<{ status: ProductStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.9rem;
  border-radius: 10rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.05em;

  background: ${({ status }) =>
    status === 'active' ? 'rgba(45,140,78,0.15)' : 'rgba(106,110,105,0.15)'};
  color: ${({ status }) =>
    status === 'active' ? 'var(--color-secondary, #2d8c4e)' : 'var(--text-muted, #6a6e69)'};

  &::before {
    content: '';
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: currentColor;
  }
`;

const StockText = styled.span<{ low: boolean }>`
  color: ${({ low }) => low ? '#e57373' : 'inherit'};
  font-weight: ${({ low }) => low ? 700 : 400};
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const IconBtn = styled.button<{ danger?: boolean }>`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 0.6rem;
  border: 1px solid var(--admin-border);
  background: none;
  cursor: pointer;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
  color: var(--text-muted, #6a6e69);

  &:hover {
    background: ${({ danger }) => danger ? 'rgba(229,115,115,0.1)' : 'var(--admin-hover)'};
    border-color: ${({ danger }) => danger ? 'rgba(229,115,115,0.4)' : 'var(--color-primary, #00b9e2)'};
    color: ${({ danger }) => danger ? '#e57373' : 'var(--color-primary, #00b9e2)'};
  }
`;

const ToggleBtn = styled.button<{ active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: 10rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  border: 1px solid ${({ active }) => active ? 'rgba(229,115,115,0.4)' : 'rgba(45,140,78,0.4)'};
  color: ${({ active }) => active ? '#e57373' : 'var(--color-secondary, #2d8c4e)'};
  background: none;

  &:hover {
    background: ${({ active }) => active ? 'rgba(229,115,115,0.08)' : 'rgba(45,140,78,0.08)'};
  }
`;

/* ── Delete modal ────────────────────────────────────────────────── */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 1.4rem;
  padding: 3rem;
  max-width: 40rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary, #f0f8ff);
  margin: 0;
`;

const ModalBody = styled.p`
  font-size: 1.4rem;
  color: var(--text-secondary, #8aafc4);
  margin: 0;
  line-height: 1.6;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  padding: 0.9rem 2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--admin-border);
  background: none;
  color: var(--text-secondary, #8aafc4);
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;

  &:hover { background: var(--admin-hover); }
`;

const DeleteBtn = styled.button`
  padding: 0.9rem 2rem;
  border-radius: 0.8rem;
  border: none;
  background: #c0392b;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;

  &:hover { background: #e74c3c; }
`;

/* ── Empty ───────────────────────────────────────────────────────── */

const EmptyRow = styled.tr``;
const EmptyCell = styled.td`
  text-align: center;
  padding: 6rem;
  color: var(--text-muted, #6a6e69);
  font-size: 1.4rem;
`;

/* ── Page component ──────────────────────────────────────────────── */

export const ProductsPage = () => {
  const { data: products = [], isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const toggleStatus = useToggleProductStatus();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'All'>('All');
  const [editTarget, setEditTarget] = useState<Product | null | 'new'>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  if (isLoading) return null;

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    draft: products.filter((p) => p.status === 'draft').length,
    lowStock: products.filter((p) => p.stock <= 10).length,
  };

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <PageTitle>Products</PageTitle>
          <PageSub>{products.length} total products in your catalogue</PageSub>
        </HeaderLeft>
        <AddBtn onClick={() => setEditTarget('new')}>+ Add Product</AddBtn>
      </Header>

      <StatsRow>
        <StatCard><StatLabel>Total</StatLabel><StatValue>{stats.total}</StatValue></StatCard>
        <StatCard><StatLabel>Active</StatLabel><StatValue>{stats.active}</StatValue></StatCard>
        <StatCard><StatLabel>Draft</StatLabel><StatValue>{stats.draft}</StatValue></StatCard>
        <StatCard><StatLabel>Low Stock</StatLabel><StatValue>{stats.lowStock}</StatValue></StatCard>
      </StatsRow>

      <Toolbar>
        <SearchInput
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | 'All')}>
          <option value="All">All Categories</option>
          {(['Bundles','Soap & Body Wash','Hair','Skin','Shave'] as ProductCategory[]).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </FilterSelect>
        <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ProductStatus | 'All')}>
          <option value="All">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </FilterSelect>
        <ResultCount>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</ResultCount>
      </Toolbar>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <EmptyRow>
                <EmptyCell colSpan={6}>No products match your filters.</EmptyCell>
              </EmptyRow>
            ) : (
              filtered.map((p) => (
                <Tr key={p.id}>
                  <Td>
                    <ProductNameCell>
                      <ProductThumb bg={p.bg}>{p.emoji}</ProductThumb>
                      <div>
                        <ProductNameText>{p.name}</ProductNameText>
                        {p.badge && (
                          <div style={{ fontSize: '1.1rem', color: 'var(--color-primary, #00b9e2)', marginTop: '0.2rem' }}>
                            {p.badge}
                          </div>
                        )}
                      </div>
                    </ProductNameCell>
                  </Td>
                  <Td><CategoryChip>{p.category}</CategoryChip></Td>
                  <Td style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                    ${p.price.toFixed(2)}
                  </Td>
                  <Td>
                    <StockText low={p.stock <= 10}>{p.stock}</StockText>
                  </Td>
                  <Td><StatusBadge status={p.status}>{p.status}</StatusBadge></Td>
                  <Td>
                    <ActionRow>
                      <IconBtn onClick={() => setEditTarget(p)} title="Edit">✏️</IconBtn>
                      <ToggleBtn
                        active={p.status === 'active'}
                        onClick={() => toggleStatus.mutate({ id: p.id, status: p.status })}
                        title={p.status === 'active' ? 'Set to Draft' : 'Set to Active'}
                      >
                        {p.status === 'active' ? 'Unpublish' : 'Publish'}
                      </ToggleBtn>
                      <IconBtn danger onClick={() => setDeleteTarget(p)} title="Delete">🗑️</IconBtn>
                    </ActionRow>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrap>

      {/* Add / Edit panel */}
      {editTarget !== null && (
        <ProductForm
          product={editTarget === 'new' ? null : editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <Backdrop onClick={() => setDeleteTarget(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Delete "{deleteTarget.name}"?</ModalTitle>
            <ModalBody>
              This will permanently remove the product from your catalogue and the storefront.
              This action cannot be undone.
            </ModalBody>
            <ModalActions>
              <CancelBtn onClick={() => setDeleteTarget(null)}>Cancel</CancelBtn>
              <DeleteBtn
                onClick={() => {
                  deleteProduct.mutate(deleteTarget.id);
                  setDeleteTarget(null);
                }}
              >
                Delete
              </DeleteBtn>
            </ModalActions>
          </Modal>
        </Backdrop>
      )}
    </Page>
  );
};
