import styled from '@emotion/styled';
import { useCartStore, selectTotalItems, selectSubtotal, useSessionStore } from '@shared/stores';
import { NavLink } from 'react-router-dom';
import { Path } from '../../models/paths';

/* ── Overlay ────────────────────────────────────────────────────── */

const Backdrop = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 300;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
`;

/* ── Drawer panel ───────────────────────────────────────────────── */

const Drawer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 42rem;
  max-width: 100vw;
  z-index: 301;
  display: flex;
  flex-direction: column;
  background: var(--background);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: -24px 0 64px rgba(0, 0, 0, 0.5);
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
`;

/* ── Header ─────────────────────────────────────────────────────── */

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

const HeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
`;

const ItemCount = styled.span`
  font-size: 1.3rem;
  color: var(--text-muted);
`;

const CloseBtn = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: none;
  color: var(--text-muted);
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
  }
`;

/* ── Session chip ───────────────────────────────────────────────── */

const SessionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  flex-shrink: 0;
`;

const SessionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const SessionDot = styled.span<{ guest: boolean }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${({ guest }) => (guest ? 'var(--text-muted)' : 'var(--color-secondary)')};
  flex-shrink: 0;
`;

const SessionLabel = styled.span`
  font-size: 1.2rem;
  color: var(--text-muted);
`;

const SessionAction = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: opacity 0.15s;

  &:hover { opacity: 0.75; }
`;

/* ── Items list ─────────────────────────────────────────────────── */

const ItemList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.6rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const CartItemRow = styled.div`
  display: flex;
  gap: 1.4rem;
  padding: 1.4rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.025);
  align-items: center;
`;

const ItemThumb = styled.div<{ bg: string }>`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 0.8rem;
  background: ${({ bg }) => bg};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`;

const ItemName = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemCategory = styled.span`
  font-size: 1.1rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const ItemPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary);
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
`;

const QtyBtn = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: none;
  color: var(--text-primary);
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  transition: background 0.12s, border-color 0.12s;
  line-height: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: var(--color-primary);
  }
`;

const QtyValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 2rem;
  text-align: center;
`;

const RemoveBtn = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.6rem;
  border: none;
  background: none;
  color: var(--text-muted);
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  transition: color 0.12s, background 0.12s;

  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.08);
  }
`;

/* ── Empty state ────────────────────────────────────────────────── */

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 4rem;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  opacity: 0.4;
`;

const EmptyText = styled.p`
  font-size: 1.6rem;
  color: var(--text-muted);
  margin: 0;
`;

const BrowseLink = styled(NavLink)`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  padding: 0.8rem 2rem;
  border: 1.5px solid var(--color-primary);
  border-radius: 0.8rem;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: var(--color-primary);
    color: #fff;
  }
`;

/* ── Footer ─────────────────────────────────────────────────────── */

const Footer = styled.div`
  padding: 2rem 2.4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex-shrink: 0;
`;

const SubtotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubtotalLabel = styled.span`
  font-size: 1.4rem;
  color: var(--text-secondary);
`;

const SubtotalValue = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 1.6rem;
  border-radius: 1rem;
  border: none;
  background: var(--color-primary);
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.03em;
  transition: background 0.15s;

  &:hover { background: var(--color-primary-accent); }
`;

const ClearBtn = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: none;
  color: var(--text-muted);
  font-size: 1.3rem;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: rgba(255, 107, 107, 0.4);
    color: #ff6b6b;
  }
`;

/* ── Component ──────────────────────────────────────────────────── */

export const CartDrawer = () => {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);

  const session = useSessionStore((s) => s.session);
  const loginAsMock = useSessionStore((s) => s.loginAsMock);
  const logout = useSessionStore((s) => s.logout);

  return (
    <>
      <Backdrop open={isOpen} onClick={closeCart} />

      <Drawer open={isOpen}>
        <Header>
          <HeaderLeft>
            <HeaderTitle>Your Cart</HeaderTitle>
            {totalItems > 0 && (
              <ItemCount>{totalItems} {totalItems === 1 ? 'item' : 'items'}</ItemCount>
            )}
          </HeaderLeft>
          <CloseBtn onClick={closeCart} aria-label="Close cart">✕</CloseBtn>
        </Header>

        <SessionBar>
          <SessionInfo>
            <SessionDot guest={session.isGuest} />
            <SessionLabel>
              {session.isGuest
                ? `Guest · ${session.id.slice(0, 8)}`
                : `${(session as { name: string }).name} · ${(session as { email: string }).email}`}
            </SessionLabel>
          </SessionInfo>
          <SessionAction onClick={session.isGuest ? loginAsMock : logout}>
            {session.isGuest ? 'Sign in' : 'Sign out'}
          </SessionAction>
        </SessionBar>

        {items.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🛒</EmptyIcon>
            <EmptyText>Your cart is empty.</EmptyText>
            <BrowseLink to={Path.BROWSE} onClick={closeCart}>
              Browse Products
            </BrowseLink>
          </EmptyState>
        ) : (
          <>
            <ItemList>
              {items.map((item) => (
                <CartItemRow key={item.id}>
                  <ItemThumb bg={item.bg ?? 'rgba(255,255,255,0.05)'}>
                    🧴
                  </ItemThumb>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemCategory>{item.category}</ItemCategory>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  </ItemInfo>
                  <QtyControls>
                    <QtyBtn onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</QtyBtn>
                    <QtyValue>{item.quantity}</QtyValue>
                    <QtyBtn onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QtyBtn>
                    <RemoveBtn onClick={() => removeItem(item.id)} aria-label="Remove item">✕</RemoveBtn>
                  </QtyControls>
                </CartItemRow>
              ))}
            </ItemList>

            <Footer>
              <SubtotalRow>
                <SubtotalLabel>Subtotal</SubtotalLabel>
                <SubtotalValue>${subtotal.toFixed(2)}</SubtotalValue>
              </SubtotalRow>
              <CheckoutBtn>Checkout →</CheckoutBtn>
              <ClearBtn onClick={clearCart}>Clear cart</ClearBtn>
            </Footer>
          </>
        )}
      </Drawer>
    </>
  );
};
