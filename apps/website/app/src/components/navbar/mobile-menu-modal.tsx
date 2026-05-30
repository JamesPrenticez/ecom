import styled from "@emotion/styled";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Title } from "@shared/components";
import { ThemeSwitcher } from "@shared/theme";
import { useAppLayoutStore } from "@shared/stores";
import clsx from "clsx";
import { Path } from "../../models/paths";

const Container = styled.div`
  position: fixed;
  inset: 5rem 0 0 0;

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;

  background-color: var(--background);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0ms ease-in-out, visibility 0ms ease-in-out;

  z-index: 100;
  overflow-y: auto;

  &.isOpen {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition-delay: 0s, 0s;
  }

  &:not(.isOpen) {
    transition-delay: 0s, 0ms;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &:last-child {
    border-bottom: none;
  }
`;

const SectionLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0.6rem 1.5rem;
`;

const NavItem = styled(NavLink)`
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 0.8rem 1.5rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;

  &.active {
    color: var(--color-primary);
    background-color: rgba(0, 185, 226, 0.08);
  }

  &:hover:not(.active) {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const ShopToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  padding: 0.8rem 1.5rem;
  border-radius: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

const ShopChevron = styled.span<{ open: boolean }>`
  font-size: 1.4rem;
  color: var(--color-primary);
  transition: transform 0.2s;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const CategoryList = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
  max-height: ${({ open }) => (open ? '40rem' : '0')};
  transition: max-height 0.25s ease;
`;

const CategoryItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  padding: 0.9rem 1.5rem 0.9rem 2.5rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

const CategoryEmoji = styled.span`
  font-size: 2rem;
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
`;

const CategoryName = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--text-secondary);
`;

const CATEGORIES = [
  { name: 'Bundles', emoji: '🎁' },
  { name: 'Soap & Body Wash', emoji: '🫧' },
  { name: 'Hair', emoji: '✨' },
  { name: 'Skin', emoji: '🌿' },
  { name: 'Shave', emoji: '🪒' },
];

export const MobileMenuModal = () => {
  const isOpenMobileMenu = useAppLayoutStore((s) => s.isOpenMobileMenu);
  const setIsOpenMobileMenu = useAppLayoutStore((s) => s.setIsOpenMobileMenu);
  const [shopOpen, setShopOpen] = useState(false);

  const close = () => setIsOpenMobileMenu(false);

  return (
    <Container className={clsx({ isOpen: isOpenMobileMenu })}>
      {/* Shop */}
      <Section>
        <ShopToggle onClick={() => setShopOpen((v) => !v)}>
          Shop
          <ShopChevron open={shopOpen}>▾</ShopChevron>
        </ShopToggle>
        <CategoryList open={shopOpen}>
          {CATEGORIES.map((cat) => (
            <CategoryItem key={cat.name} to={Path.BROWSE} onClick={close}>
              <CategoryEmoji>{cat.emoji}</CategoryEmoji>
              <CategoryName>{cat.name}</CategoryName>
            </CategoryItem>
          ))}
        </CategoryList>
      </Section>

      {/* Other nav */}
      <Section>
        <SectionLabel>Navigation</SectionLabel>
        <NavItem to={Path.HOME} onClick={close} className={({ isActive }) => clsx({ active: isActive })}>
          Home
        </NavItem>
        <NavItem to={Path.BROWSE} onClick={close} className={({ isActive }) => clsx({ active: isActive })}>
          Browse
        </NavItem>
      </Section>

      {/* Settings */}
      <Section>
        <SectionLabel>Settings</SectionLabel>
        <ThemeSwitcher />
      </Section>
    </Container>
  );
};
