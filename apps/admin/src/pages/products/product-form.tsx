import styled from '@emotion/styled';
import type { Product, ProductCategory, ProductStatus } from '@shared/models';
import { useState } from 'react';
import { useAddProduct, useUpdateProduct } from '../../hooks/use-products';

const CATEGORIES: ProductCategory[] = [
  'Bundles', 'Soap & Body Wash', 'Hair', 'Skin', 'Shave',
];

const GRADIENT_PRESETS = [
  { label: 'Ocean',    value: 'linear-gradient(135deg, #0d2137 0%, #0a3d5c 100%)' },
  { label: 'Forest',  value: 'linear-gradient(135deg, #0a2e1a 0%, #145c30 100%)' },
  { label: 'Violet',  value: 'linear-gradient(135deg, #1e0a40 0%, #4a1e8c 100%)' },
  { label: 'Rose',    value: 'linear-gradient(135deg, #2e0e1a 0%, #5c1a38 100%)' },
  { label: 'Slate',   value: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a52 100%)' },
  { label: 'Charcoal',value: 'linear-gradient(135deg, #111111 0%, #2d2d2d 100%)' },
  { label: 'Amber',   value: 'linear-gradient(135deg, #2e1a00 0%, #5c3a00 100%)' },
  { label: 'Teal',    value: 'linear-gradient(135deg, #003030 0%, #006060 100%)' },
];

/* ── Styles ─────────────────────────────────────────────────────── */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 300;
`;

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50rem;
  max-width: 100vw;
  z-index: 301;
  background: var(--admin-surface);
  border-left: 1px solid var(--admin-border);
  box-shadow: -24px 0 48px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.4rem;
  border-bottom: 1px solid var(--admin-border);
  flex-shrink: 0;
`;

const PanelTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary, #f0f8ff);
  margin: 0;
`;

const CloseBtn = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  border: 1px solid var(--admin-border);
  background: none;
  color: var(--text-muted, #6a6e69);
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;

  &:hover { background: var(--admin-hover); color: var(--text-primary, #f0f8ff); }
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Preview = styled.div<{ bg: string }>`
  width: 100%;
  height: 14rem;
  border-radius: 1.2rem;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border: 1px solid var(--admin-border);
  flex-shrink: 0;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted, #6a6e69);
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--admin-border);
  background: rgba(255,255,255,0.03);
  color: var(--text-primary, #f0f8ff);
  font-size: 1.4rem;
  font-family: inherit;
  outline: none;
  width: 100%;
  transition: border-color 0.15s;

  &::placeholder { color: var(--text-muted, #6a6e69); }
  &:focus { border-color: var(--color-primary, #00b9e2); }
`;

const Textarea = styled.textarea`
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--admin-border);
  background: rgba(255,255,255,0.03);
  color: var(--text-primary, #f0f8ff);
  font-size: 1.4rem;
  font-family: inherit;
  outline: none;
  width: 100%;
  resize: vertical;
  min-height: 8rem;
  transition: border-color 0.15s;

  &::placeholder { color: var(--text-muted, #6a6e69); }
  &:focus { border-color: var(--color-primary, #00b9e2); }
`;

const Select = styled.select`
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--admin-border);
  background: rgba(255,255,255,0.03);
  color: var(--text-primary, #f0f8ff);
  font-size: 1.4rem;
  font-family: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
  transition: border-color 0.15s;

  option { background: #1a1a1a; }
  &:focus { border-color: var(--color-primary, #00b9e2); }
`;

const GradientPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
`;

const GradientSwatch = styled.button<{ bg: string; selected: boolean }>`
  height: 4rem;
  border-radius: 0.6rem;
  background: ${({ bg }) => bg};
  border: 2px solid ${({ selected }) =>
    selected ? 'var(--color-primary, #00b9e2)' : 'transparent'};
  cursor: pointer;
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  font-family: inherit;
  font-weight: 600;
  transition: border-color 0.15s;

  &:hover { border-color: rgba(255,255,255,0.3); }
`;

const StatusToggle = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatusOption = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.9rem;
  border-radius: 0.8rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  border: 1.5px solid ${({ active }) =>
    active ? 'var(--color-primary, #00b9e2)' : 'var(--admin-border)'};
  background: ${({ active }) =>
    active ? 'rgba(0,185,226,0.1)' : 'transparent'};
  color: ${({ active }) =>
    active ? 'var(--color-primary, #00b9e2)' : 'var(--text-muted, #6a6e69)'};
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  color: #e57373;
  margin: 0;
`;

const PanelFooter = styled.div`
  padding: 1.6rem 2.4rem;
  border-top: 1px solid var(--admin-border);
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const CancelBtn = styled.button`
  padding: 1rem 2.4rem;
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

const SaveBtn = styled.button`
  padding: 1rem 2.4rem;
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

/* ── Form state ──────────────────────────────────────────────────── */

interface FormState {
  name: string;
  category: ProductCategory;
  desc: string;
  price: string;
  stock: string;
  badge: string;
  emoji: string;
  bg: string;
  status: ProductStatus;
}

const defaults: FormState = {
  name: '',
  category: 'Soap & Body Wash',
  desc: '',
  price: '',
  stock: '',
  badge: '',
  emoji: '🧴',
  bg: GRADIENT_PRESETS[0].value,
  status: 'active',
};

const productToForm = (p: Product): FormState => ({
  name: p.name,
  category: p.category,
  desc: p.desc,
  price: String(p.price),
  stock: String(p.stock),
  badge: p.badge ?? '',
  emoji: p.emoji,
  bg: p.bg,
  status: p.status,
});

/* ── Component ───────────────────────────────────────────────────── */

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const [form, setForm] = useState<FormState>(
    product ? productToForm(product) : defaults
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!form.name.trim())             errs.name  = 'Name is required';
    if (!form.desc.trim())             errs.desc  = 'Description is required';
    if (!form.price || Number.isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = 'Enter a valid price';
    if (!form.stock || Number.isNaN(Number(form.stock)) || Number(form.stock) < 0)
      errs.stock = 'Enter a valid stock amount';
    if (!form.emoji.trim())            errs.emoji = 'Emoji is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      category: form.category,
      desc: form.desc.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      badge: form.badge.trim() || undefined,
      emoji: form.emoji.trim(),
      bg: form.bg,
      status: form.status,
    };
    if (product) {
      updateProduct.mutate({ id: product.id, ...payload }, { onSuccess: onClose });
    } else {
      addProduct.mutate(payload, { onSuccess: onClose });
    }
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <Panel>
        <PanelHeader>
          <PanelTitle>{product ? 'Edit Product' : 'Add Product'}</PanelTitle>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </PanelHeader>

        <PanelBody>
          <Preview bg={form.bg}>{form.emoji}</Preview>

          <FieldGroup>
            <Label>Product Name</Label>
            <Input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Cedar & Pine Bar Soap"
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FieldGroup>

          <FieldGroup>
            <Label>Description</Label>
            <Textarea
              value={form.desc}
              onChange={(e) => set('desc', e.target.value)}
              placeholder="Describe this product…"
            />
            {errors.desc && <ErrorText>{errors.desc}</ErrorText>}
          </FieldGroup>

          <FieldRow>
            <FieldGroup>
              <Label>Category</Label>
              <Select value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </FieldGroup>
            <FieldGroup>
              <Label>Status</Label>
              <StatusToggle>
                <StatusOption active={form.status === 'active'} onClick={() => set('status', 'active')}>Active</StatusOption>
                <StatusOption active={form.status === 'draft'} onClick={() => set('status', 'draft')}>Draft</StatusOption>
              </StatusToggle>
            </FieldGroup>
          </FieldRow>

          <FieldRow>
            <FieldGroup>
              <Label>Price ($)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="0.00"
              />
              {errors.price && <ErrorText>{errors.price}</ErrorText>}
            </FieldGroup>
            <FieldGroup>
              <Label>Stock</Label>
              <Input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
                placeholder="0"
              />
              {errors.stock && <ErrorText>{errors.stock}</ErrorText>}
            </FieldGroup>
          </FieldRow>

          <FieldRow>
            <FieldGroup>
              <Label>Emoji Icon</Label>
              <Input
                value={form.emoji}
                onChange={(e) => set('emoji', e.target.value)}
                placeholder="🧴"
                maxLength={4}
              />
              {errors.emoji && <ErrorText>{errors.emoji}</ErrorText>}
            </FieldGroup>
            <FieldGroup>
              <Label>Badge (optional)</Label>
              <Input
                value={form.badge}
                onChange={(e) => set('badge', e.target.value)}
                placeholder="e.g. Best Seller"
              />
            </FieldGroup>
          </FieldRow>

          <FieldGroup>
            <Label>Card Background</Label>
            <GradientPicker>
              {GRADIENT_PRESETS.map((g) => (
                <GradientSwatch
                  key={g.value}
                  bg={g.value}
                  selected={form.bg === g.value}
                  onClick={() => set('bg', g.value)}
                  title={g.label}
                >
                  {g.label}
                </GradientSwatch>
              ))}
            </GradientPicker>
          </FieldGroup>
        </PanelBody>

        <PanelFooter>
          <CancelBtn onClick={onClose}>Cancel</CancelBtn>
          <SaveBtn onClick={handleSave}>{product ? 'Save Changes' : 'Add Product'}</SaveBtn>
        </PanelFooter>
      </Panel>
    </>
  );
};
