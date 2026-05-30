import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Path } from '../../models/paths';

const Panel = styled.div<{ open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--background);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);

  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-6px)')};
  transition: opacity 0.2s ease, transform 0.2s ease;
`;

const Inner = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  padding: 3.2rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DropdownLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.6rem;
`;

const CategoryCard = styled(NavLink)`
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  text-decoration: none;
  transition: border-color 0.18s, transform 0.18s;

  &:hover {
    border-color: rgba(0, 185, 226, 0.35);
    transform: translateY(-2px);
  }

  &:hover .card-arrow {
    transform: translateX(3px);
  }
`;

const PhotoArea = styled.div<{ bg: string }>`
  height: 15rem;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.45) 100%);
  }
`;

const CardLabel = styled.div`
  padding: 1.4rem 1.6rem;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

const CardName = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.01em;
`;

const CardArrow = styled.span`
  font-size: 1.2rem;
  color: var(--color-primary);
  transition: transform 0.15s;
`;

const CATEGORIES = [
  {
    name: 'Bundles',
    emoji: '🎁',
    bg: 'linear-gradient(135deg, #0d2137 0%, #0a3d5c 100%)',
  },
  {
    name: 'Soap & Body Wash',
    emoji: '🫧',
    bg: 'linear-gradient(135deg, #003535 0%, #005c5c 100%)',
  },
  {
    name: 'Hair',
    emoji: '✨',
    bg: 'linear-gradient(135deg, #1e1040 0%, #3a1f7a 100%)',
  },
  {
    name: 'Skin',
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #2a0e1c 0%, #5c1a38 100%)',
  },
  {
    name: 'Shave',
    emoji: '🪒',
    bg: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a52 100%)',
  },
];

interface ShopDropdownProps {
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ShopDropdown = ({ open, onMouseEnter, onMouseLeave }: ShopDropdownProps) => {
  return (
    <Panel open={open} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Inner>
        <DropdownLabel>Shop by Category</DropdownLabel>
        <CategoryGrid>
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} to={Path.BROWSE}>
              <PhotoArea bg={cat.bg}>{cat.emoji}</PhotoArea>
              <CardLabel>
                <CardName>{cat.name}</CardName>
                <CardArrow className="card-arrow">→</CardArrow>
              </CardLabel>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Inner>
    </Panel>
  );
};
