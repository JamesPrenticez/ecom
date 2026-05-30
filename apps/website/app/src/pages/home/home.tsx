import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { device } from '@shared/hooks';
import { LogoSVG } from '@shared/assets/logos';
import { Path } from '../../models/paths';
import { useCartStore } from '@shared/stores';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: -1rem;
`;

/* ── Hero ───────────────────────────────────────────────────────── */

const HeroSection = styled.section`
  min-height: calc(100dvh - 6rem);
  display: flex;
  align-items: center;
  padding: 6rem 8rem;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 55% 75% at 80% 50%, rgba(0, 185, 226, 0.07) 0%, transparent 65%),
    radial-gradient(ellipse 35% 45% at 10% 85%, rgba(45, 140, 78, 0.06) 0%, transparent 60%);

  @media ${device.tablet} {
    min-height: calc(100dvh - 5rem);
    padding: 5rem 2.4rem 4rem;
    align-items: flex-start;
  }
`;

const HeroInner = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Eyebrow = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-primary);
`;

const Headline = styled.h1`
  font-size: 8.8rem;
  font-weight: 700;
  line-height: 1;
  color: var(--text-primary);
  margin: 0;

  .accent { color: var(--color-primary); }

  @media ${device.tablet} {
    font-size: 5.5rem;
  }
`;

const HeroSub = styled.p`
  font-size: 1.8rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
  max-width: 50rem;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
`;

const PrimaryLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.4rem 3.2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  background-color: var(--color-primary);
  color: #fff;
  border: 2px solid var(--color-primary);
  transition: background-color 0.18s, border-color 0.18s;
  letter-spacing: 0.02em;

  &:hover {
    background-color: var(--color-primary-accent);
    border-color: var(--color-primary-accent);
  }
`;

const SecondaryLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.4rem 3.2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  background-color: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-muted);
  transition: border-color 0.18s, color 0.18s;
  letter-spacing: 0.02em;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const HeroVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    display: none;
  }
`;

const GlowOrb = styled.div`
  width: 38rem;
  height: 38rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 185, 226, 0.1) 0%, transparent 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(0, 185, 226, 0.15);
  }
  &::after {
    content: '';
    position: absolute;
    inset: 3rem;
    border-radius: 50%;
    border: 1px solid rgba(0, 185, 226, 0.08);
  }

  svg {
    width: 18rem;
    height: 18rem;
    opacity: 0.8;
  }
`;

/* ── Stats ──────────────────────────────────────────────────────── */

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.6rem 2rem;
  gap: 0.4rem;
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child { border-right: none; }

  @media ${device.tablet} {
    &:nth-of-type(2) { border-right: none; }
    &:nth-of-type(3) { border-right: 1px solid rgba(255, 255, 255, 0.06); border-top: 1px solid rgba(255, 255, 255, 0.06); }
    &:nth-of-type(4) { border-top: 1px solid rgba(255, 255, 255, 0.06); }
  }
`;

const StatValue = styled.span`
  font-size: 3.6rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
`;

const StatLabel = styled.span`
  font-size: 1.3rem;
  color: var(--text-muted);
  font-weight: 500;
  letter-spacing: 0.05em;
`;

/* ── Features ───────────────────────────────────────────────────── */

const FeaturesSection = styled.section`
  padding: 10rem 8rem;

  @media ${device.tablet} {
    padding: 6rem 2.4rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 6rem;
  max-width: 52rem;
`;

const SectionEyebrow = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-secondary);
`;

const SectionTitle = styled.h2`
  font-size: 4.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.1;

  @media ${device.tablet} {
    font-size: 3.2rem;
  }
`;

const SectionSub = styled.p`
  font-size: 1.6rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 3.6rem;
  border-radius: 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.025);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: rgba(0, 185, 226, 0.25);
    background: rgba(0, 185, 226, 0.04);
  }
`;

const FeatureIcon = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 1.2rem;
  background: rgba(0, 185, 226, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
`;

const FeatureBody = styled.p`
  font-size: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
`;

/* ── Products ───────────────────────────────────────────────────── */

const ProductsSection = styled.section`
  padding: 10rem 8rem;
  background: rgba(255, 255, 255, 0.015);

  @media ${device.tablet} {
    padding: 6rem 2.4rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductCard = styled.div`
  border-radius: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(0, 185, 226, 0.3);
  }
`;

const ProductImage = styled.div<{ hue: string }>`
  height: 20rem;
  background: ${({ hue }) => hue};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  svg {
    width: 7rem;
    height: 7rem;
    opacity: 0.5;
  }

  @media ${device.tablet} {
    height: 16rem;
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--color-primary);
  color: #fff;
  padding: 0.3rem 0.9rem;
  border-radius: 10rem;
`;

const ProductBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
`;

const ProductCategory = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const ProductName = styled.h4`
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
`;

const ProductDesc = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
`;

const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1.4rem;
`;

const ProductPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const AddButton = styled.button`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  border: 1.5px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  font-family: inherit;
  letter-spacing: 0.02em;

  &:hover {
    background: var(--color-primary);
    color: #fff;
  }
`;

/* ── Steps ──────────────────────────────────────────────────────── */

const StepsSection = styled.section`
  padding: 10rem 8rem;

  @media ${device.tablet} {
    padding: 6rem 2.4rem;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  margin-top: 6rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 3.2rem;
    left: calc(16.67% + 2.8rem);
    right: calc(16.67% + 2.8rem);
    height: 1px;
    background: linear-gradient(90deg, var(--color-primary), transparent 50%, var(--color-primary));
    opacity: 0.2;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    &::before { display: none; }
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;

const StepNumber = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
  background: rgba(0, 185, 226, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
  z-index: 1;
`;

const StepTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
`;

const StepBody = styled.p`
  font-size: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
`;

/* ── CTA Banner ─────────────────────────────────────────────────── */

const CTASection = styled.section`
  margin: 4rem 8rem 8rem;
  border-radius: 2rem;
  padding: 7rem 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  background:
    radial-gradient(ellipse 60% 80% at 100% 50%, rgba(0, 185, 226, 0.15) 0%, transparent 65%),
    rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 185, 226, 0.15);

  @media ${device.tablet} {
    margin: 2rem 2.4rem 4rem;
    padding: 4rem 2.4rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CTAText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const CTATitle = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.1;

  @media ${device.tablet} {
    font-size: 2.8rem;
  }
`;

const CTASub = styled.p`
  font-size: 1.6rem;
  color: var(--text-secondary);
  margin: 0;
`;

/* ── Data ───────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: '⚗️',
    title: 'Pro-Grade Formula',
    body: 'Engineered with professional-grade surfactants that lift grime without stripping wax or sealants.',
  },
  {
    icon: '🌿',
    title: 'Biodegradable',
    body: 'Every formula is fully biodegradable and safe for rinse-off into storm drains — clean conscience included.',
  },
  {
    icon: '🚀',
    title: 'Ships Same Day',
    body: 'Orders placed before 2pm ship same day. Free shipping on orders over $50 across North America.',
  },
];

const PRODUCTS = [
  {
    id: 'wild-foam',
    name: 'Wild Foam',
    category: 'Car Wash',
    desc: 'High-suds pH-neutral soap, gentle on coatings.',
    price: 24.99,
    badge: 'Best Seller',
    hue: 'linear-gradient(135deg, rgba(0,185,226,0.18) 0%, rgba(0,185,226,0.04) 100%)',
  },
  {
    id: 'shine-guard',
    name: 'Shine Guard',
    category: 'Paint Sealant',
    desc: 'SiO2-infused sealant for up to 12 months of protection.',
    price: 39.99,
    badge: undefined,
    hue: 'linear-gradient(135deg, rgba(45,140,78,0.2) 0%, rgba(45,140,78,0.04) 100%)',
  },
  {
    id: 'deep-clean',
    name: 'Deep Clean',
    category: 'Interior',
    desc: 'All-surface interior cleaner that destroys odours.',
    price: 29.99,
    badge: 'New',
    hue: 'linear-gradient(135deg, rgba(168,200,74,0.18) 0%, rgba(168,200,74,0.04) 100%)',
  },
  {
    id: 'crystal-rinse',
    name: 'Crystal Rinse',
    category: 'Rinse Aid',
    desc: 'Spot-free drying agent — sheeting action on contact.',
    price: 19.99,
    badge: undefined,
    hue: 'linear-gradient(135deg, rgba(0,130,168,0.2) 0%, rgba(0,130,168,0.04) 100%)',
  },
];

/* ── Component ──────────────────────────────────────────────────── */

export const Home = () => {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Page>
      {/* Hero */}
      <HeroSection>
        <HeroInner>
          <HeroText>
            <Eyebrow>Premium Detailing Supplies</Eyebrow>
            <Headline>
              The cleaner<br />
              that <span className="accent">shines</span>.
            </Headline>
            <HeroSub>
              Professional-grade car care products formulated for enthusiasts
              who refuse to settle. From foam to finish — we've got you covered.
            </HeroSub>
            <HeroActions>
              <PrimaryLink to={Path.BROWSE}>Shop Now</PrimaryLink>
              <SecondaryLink to={Path.BROWSE}>View Products</SecondaryLink>
            </HeroActions>
          </HeroText>

          <HeroVisual>
            <GlowOrb>
              <LogoSVG />
            </GlowOrb>
          </HeroVisual>
        </HeroInner>
      </HeroSection>

      {/* Stats */}
      <StatsSection>
        <StatItem><StatValue>12K+</StatValue><StatLabel>Happy Customers</StatLabel></StatItem>
        <StatItem><StatValue>4.9★</StatValue><StatLabel>Average Rating</StatLabel></StatItem>
        <StatItem><StatValue>30+</StatValue><StatLabel>Products</StatLabel></StatItem>
        <StatItem><StatValue>Free</StatValue><StatLabel>Shipping over $50</StatLabel></StatItem>
      </StatsSection>

      {/* Features */}
      <FeaturesSection>
        <SectionHeader>
          <SectionEyebrow>Why Wild Wash</SectionEyebrow>
          <SectionTitle>Built for the obsessed.</SectionTitle>
          <SectionSub>
            Every product is tested by detailers, not just approved by chemists.
            No fluff, no filler — just results.
          </SectionSub>
        </SectionHeader>

        <FeatureGrid>
          {FEATURES.map((f) => (
            <FeatureCard key={f.title}>
              <FeatureIcon>{f.icon}</FeatureIcon>
              <FeatureTitle>{f.title}</FeatureTitle>
              <FeatureBody>{f.body}</FeatureBody>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      {/* Products */}
      <ProductsSection>
        <SectionHeader>
          <SectionEyebrow>Featured Products</SectionEyebrow>
          <SectionTitle>The full lineup.</SectionTitle>
        </SectionHeader>

        <ProductGrid>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name}>
              <ProductImage hue={p.hue}>
                <LogoSVG />
                {p.badge && <ProductBadge>{p.badge}</ProductBadge>}
              </ProductImage>
              <ProductBody>
                <ProductCategory>{p.category}</ProductCategory>
                <ProductName>{p.name}</ProductName>
                <ProductDesc>{p.desc}</ProductDesc>
                <ProductFooter>
                  <ProductPrice>{p.price}</ProductPrice>
                  <AddButton onClick={() => addItem({ id: p.id, name: p.name, category: p.category, price: p.price, bg: p.hue })}>Add to Cart</AddButton>
                </ProductFooter>
              </ProductBody>
            </ProductCard>
          ))}
        </ProductGrid>
      </ProductsSection>

      {/* How it works */}
      <StepsSection>
        <SectionHeader>
          <SectionEyebrow>How It Works</SectionEyebrow>
          <SectionTitle>Three steps to a showroom finish.</SectionTitle>
        </SectionHeader>

        <StepsGrid>
          <Step>
            <StepNumber>1</StepNumber>
            <StepTitle>Choose Your Products</StepTitle>
            <StepBody>Browse our curated lineup and pick the right formula for your vehicle and goals.</StepBody>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepTitle>We Ship Fast</StepTitle>
            <StepBody>Same-day dispatch on weekday orders. Arrives in 2–4 business days across Canada and the US.</StepBody>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepTitle>Detail with Confidence</StepTitle>
            <StepBody>Follow our pro tips or go your own way. Either way — the results speak for themselves.</StepBody>
          </Step>
        </StepsGrid>
      </StepsSection>

      {/* CTA Banner */}
      <CTASection>
        <CTAText>
          <CTATitle>Ready to detail like a pro?</CTATitle>
          <CTASub>Join thousands of car enthusiasts who've upgraded their wash routine.</CTASub>
        </CTAText>
        <PrimaryLink to={Path.BROWSE}>Shop the Collection</PrimaryLink>
      </CTASection>
    </Page>
  );
};
