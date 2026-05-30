import styled from "@emotion/styled";
import { useRef, useState } from "react";

import { NavLink } from "react-router-dom";
import { MobileMenu } from "./mobile-menu";
import { ShopDropdown } from "./shop-dropdown";
import { device } from "@shared/hooks";
import { NavLogo } from "./navbar-logo";
import { ThemeSwitcher } from "@shared/theme";
import { useCartStore, selectTotalItems } from "@shared/stores";
import { Path } from "../../models/paths";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0rem 2rem;
  height: 6rem;
  gap: 0.5rem;
  background-color: var(--overlay);
  z-index: 100;

  .switches {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;
    width: 19rem;
    height: 5rem;

    & button {
      height: 2rem;
    }
  }

  .mobile-only {
    display: none;
  }

  @media ${device.tablet} {
    padding: 0rem 1rem;
    height: 5rem;

    .mobile-only {
      display: block;
    }

    .switches {
      display: none;
    }
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: stretch;
  height: 100%;
  flex: 1;
  margin-left: 1.6rem;

  @media ${device.tablet} {
    display: none;
  }
`;

const NavItemWrap = styled.div`
  position: static;
  display: flex;
  align-items: center;
`;

const CartBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
    border-color: var(--color-primary);
  }

  svg {
    width: 1.9rem;
    height: 1.9rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  min-width: 1.8rem;
  height: 1.8rem;
  border-radius: 10rem;
  background: var(--color-primary);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.4rem;
  pointer-events: none;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;

  &:hover, &.active {
    color: var(--text-primary);
    border-bottom-color: var(--color-primary);
  }
`;

const NavBtn = styled.button<{ active?: boolean }>`
  height: 100%;
  padding: 0 1.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ active }) => (active ? 'var(--text-primary)' : 'var(--text-muted)')};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? 'var(--color-primary)' : 'transparent')};
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    color: var(--text-primary);
    border-bottom-color: var(--color-primary);
  }
`;

export const Navbar = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const totalItems = useCartStore(selectTotalItems);
  const openCart = useCartStore((s) => s.openCart);

  const openShop = () => {
    clearTimeout(closeTimer.current);
    setShopOpen(true);
  };

  const closeShop = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 120);
  };

  return (
    <Container>
      <NavLogo />

      <DesktopNav>
        <NavItemWrap onMouseEnter={openShop} onMouseLeave={closeShop}>
          <NavBtn active={shopOpen}>Shop</NavBtn>
        </NavItemWrap>
        <NavItem to={Path.BROWSE}>Products</NavItem>
      </DesktopNav>

      <div className="switches">
        <ThemeSwitcher />
      </div>

      <CartBtn onClick={openCart} aria-label="Open cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {totalItems > 0 && <CartBadge>{totalItems > 99 ? '99+' : totalItems}</CartBadge>}
      </CartBtn>

      <div className="mobile-only">
        <MobileMenu />
      </div>

      <ShopDropdown open={shopOpen} onMouseEnter={openShop} onMouseLeave={closeShop} />
    </Container>
  );
};
