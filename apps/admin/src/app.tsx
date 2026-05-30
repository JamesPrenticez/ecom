import styled from '@emotion/styled';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/auth';
import { LoginPage } from './pages/login';
import { ProductsPage } from './pages/products';

/* ── Layout ─────────────────────────────────────────────────────── */

const Shell = styled.div`
  display: flex;
  min-height: 100dvh;
  background: var(--admin-bg);
`;

const Sidebar = styled.aside`
  width: var(--admin-sidebar-width);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--admin-border);
  background: var(--admin-surface);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 2rem 2.4rem;
  border-bottom: 1px solid var(--admin-border);
`;

const LogoMark = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 0.8rem;
  background: var(--color-primary, #00b9e2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  flex-shrink: 0;
`;

const SidebarTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary, #f0f8ff);
  line-height: 1.2;
`;

const AppSub = styled.span`
  font-size: 1.1rem;
  color: var(--text-muted, #6a6e69);
`;

const Nav = styled.nav`
  flex: 1;
  padding: 1.6rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const NavSection = styled.div`
  margin-top: 1.6rem;
  margin-bottom: 0.4rem;
  padding: 0 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted, #6a6e69);

  &:first-of-type { margin-top: 0; }
`;

const SideLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-muted, #6a6e69);
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: var(--admin-hover);
    color: var(--text-primary, #f0f8ff);
  }

  &.active {
    background: rgba(0, 185, 226, 0.1);
    color: var(--color-primary, #00b9e2);
  }

  .icon { font-size: 1.6rem; width: 2rem; text-align: center; }
`;

const ComingSoon = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-muted, #6a6e69);
  opacity: 0.5;
  cursor: not-allowed;
  .icon { font-size: 1.6rem; width: 2rem; text-align: center; }
`;

const SidebarFooter = styled.div`
  padding: 1.6rem 2rem;
  border-top: 1px solid var(--admin-border);
  font-size: 1.2rem;
  color: var(--text-muted, #6a6e69);
`;

/* ── Main ────────────────────────────────────────────────────────── */

const Main = styled.main`
  margin-left: var(--admin-sidebar-width);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

/* ── Auth guard ──────────────────────────────────────────────────── */

const AdminShell = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;

  return (
    <Shell>
      <Sidebar>
        <SidebarHeader>
          <LogoMark>🌿</LogoMark>
          <SidebarTitle>
            <AppName>Wild Wash</AppName>
            <AppSub>Admin Panel</AppSub>
          </SidebarTitle>
        </SidebarHeader>

        <Nav>
          <NavSection>Catalogue</NavSection>
          <SideLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">📦</span> Products
          </SideLink>
          <ComingSoon><span className="icon">🏷️</span> Categories</ComingSoon>

          <NavSection>Commerce</NavSection>
          <ComingSoon><span className="icon">🛒</span> Orders</ComingSoon>
          <ComingSoon><span className="icon">👥</span> Customers</ComingSoon>

          <NavSection>Settings</NavSection>
          <ComingSoon><span className="icon">⚙️</span> Store Settings</ComingSoon>
        </Nav>

        <SidebarFooter>Wild Wash Admin · v0.1</SidebarFooter>
      </Sidebar>

      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Main>
    </Shell>
  );
};

/* ── App ─────────────────────────────────────────────────────────── */

export const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<AdminShell />} />
  </Routes>
);
