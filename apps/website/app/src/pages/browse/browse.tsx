import styled from '@emotion/styled';
import type { Product, ProductCategory } from '@shared/models';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { device } from '@shared/hooks';
import { useCartStore } from '@shared/stores';

type CategoryFilter = ProductCategory | 'All';
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

const ALL_CATEGORIES: CategoryFilter[] = [
  'All', 'Bundles', 'Soap & Body Wash', 'Hair', 'Skin', 'Shave',
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc',   label: 'Name: A–Z' },
];

/* ── Styles ─────────────────────────────────────────────────────── */

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: -1rem;
  min-height: calc(100dvh - 6rem);

  @media ${device.tablet} {
    min-height: calc(100dvh - 5rem);
  }
`;

const PageHeader = styled.div`
  padding: 5rem 8rem 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media ${device.tablet} {
    padding: 3rem 2.4rem 2.4rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.8rem;
  line-height: 1;

  @media ${device.tablet} {
    font-size: 3.6rem;
  }
`;

const PageSub = styled.p`
  font-size: 1.6rem;
  color: var(--text-secondary);
  margin: 0;
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  background: var(--background);
  z-index: 10;

  @media ${device.tablet} {
    padding: 1.2rem 2.4rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const CategoryPills = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const CategoryPill = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  padding: 0.7rem 1.6rem;
  border-radius: 10rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  background: ${({ active }) => active ? 'var(--color-primary)' : 'transparent'};
  color: ${({ active }) => active ? '#fff' : 'var(--text-muted)'};
  border: 1.5px solid ${({ active }) => active ? 'var(--color-primary)' : 'rgba(255,255,255,0.12)'};

  &:hover {
    border-color: var(--color-primary);
    color: ${({ active }) => active ? '#fff' : 'var(--color-primary)'};
  }
`;

const SortSelect = styled.select`
  flex-shrink: 0;
  padding: 0.7rem 1.2rem;
  border-radius: 0.8rem;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: var(--text-secondary);
  font-size: 1.3rem;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;

  option { background: #1a1a1a; color: #fff; }

  &:focus {
    border-color: var(--color-primary);
    color: var(--text-primary);
  }
`;

const GridSection = styled.div`
  padding: 3.2rem 8rem 6rem;

  @media ${device.tablet} {
    padding: 2rem 2.4rem 4rem;
  }
`;

const ResultInfo = styled.p`
  font-size: 1.3rem;
  color: var(--text-muted);
  margin: 0 0 2.4rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.4rem;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem;
  gap: 1.6rem;
  text-align: center;
`;

const EmptyIcon = styled.div`font-size: 5rem; opacity: 0.3;`;
const EmptyText = styled.p`font-size: 1.6rem; color: var(--text-muted); margin: 0;`;

/* ── Product card ────────────────────────────────────────────────── */

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.025);
  overflow: hidden;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(0, 185, 226, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const CardImage = styled.div<{ bg: string }>`
  height: 18rem;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.5rem;
  position: relative;
  flex-shrink: 0;

  @media ${device.tablet} {
    height: 14rem;
    font-size: 3.5rem;
  }
`;

const BadgeTag = styled.span`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--color-primary);
  color: #fff;
  padding: 0.3rem 0.9rem;
  border-radius: 10rem;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.6rem;
  flex: 1;
`;

const CardCategory = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const CardName = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.25;
`;

const CardDesc = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
  gap: 1rem;
`;

const CardPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const AddBtn = styled.button<{ added: boolean }>`
  flex-shrink: 0;
  padding: 0.8rem 1.6rem;
  border-radius: 0.8rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.02em;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;
  background: ${({ added }) => added ? 'var(--color-secondary)' : 'transparent'};
  color: ${({ added }) => added ? '#fff' : 'var(--color-primary)'};
  border: 1.5px solid ${({ added }) => added ? 'var(--color-secondary)' : 'var(--color-primary)'};

  &:hover {
    background: ${({ added }) => added ? 'var(--color-secondary-accent)' : 'var(--color-primary)'};
    color: #fff;
    border-color: ${({ added }) => added ? 'var(--color-secondary-accent)' : 'var(--color-primary)'};
  }
`;

/* ── ProductCard ─────────────────────────────────────────────────── */

const ProductCard = ({ product, onAdd, justAdded }: {
  product: Product;
  onAdd: (p: Product) => void;
  justAdded: boolean;
}) => (
  <Card>
    <CardImage bg={product.bg}>
      {product.emoji}
      {product.badge && <BadgeTag>{product.badge}</BadgeTag>}
    </CardImage>
    <CardBody>
      <CardCategory>{product.category}</CardCategory>
      <CardName>{product.name}</CardName>
      <CardDesc>{product.desc}</CardDesc>
      <CardFooter>
        <CardPrice>${product.price.toFixed(2)}</CardPrice>
        <AddBtn
          added={justAdded}
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
        >
          {justAdded ? '✓ Added' : 'Add to Cart'}
        </AddBtn>
      </CardFooter>
    </CardBody>
  </Card>
);

/* ── Browse ──────────────────────────────────────────────────────── */

export const Browse = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [sort, setSort] = useState<SortKey>('featured');
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['public-products'],
    queryFn: async () => {
      const res = await fetch('/api/store/products');
      const json = await res.json();
      return json.products;
    },
  });
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (product: Product) => {
    addItem({ id: product.id, name: product.name, category: product.category, price: product.price, bg: product.bg });
    setRecentlyAdded(product.id);
    setTimeout(() => setRecentlyAdded((prev) => (prev === product.id ? null : prev)), 1200);
  };

  const filtered = useMemo(() => {
    let list = allProducts.filter((p: Product) => p.status === 'active');
    if (activeCategory !== 'All') list = list.filter((p: Product) => p.category === activeCategory);
    switch (sort) {
      case 'price-asc':  return [...list].sort((a: Product, b: Product) => a.price - b.price);
      case 'price-desc': return [...list].sort((a: Product, b: Product) => b.price - a.price);
      case 'name-asc':   return [...list].sort((a: Product, b: Product) => a.name.localeCompare(b.name));
      default:           return list;
    }
  }, [allProducts, activeCategory, sort]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Shop</PageTitle>
        <PageSub>Premium formulas for every part of your routine.</PageSub>
      </PageHeader>

      <FiltersRow>
        <CategoryPills>
          {ALL_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </CategoryPill>
          ))}
        </CategoryPills>
        <SortSelect value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </SortSelect>
      </FiltersRow>

      <GridSection>
        <ResultInfo>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </ResultInfo>

        <Grid>
          {filtered.length === 0 ? (
            <EmptyState>
              <EmptyIcon>🔍</EmptyIcon>
              <EmptyText>No products found.</EmptyText>
            </EmptyState>
          ) : (
            filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={handleAdd}
                justAdded={recentlyAdded === p.id}
              />
            ))
          )}
        </Grid>
      </GridSection>
    </Page>
  );
};
